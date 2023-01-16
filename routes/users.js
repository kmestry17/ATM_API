const express = require('express')
const router = express.Router()
const User = require('../models/user')

//Register ATM user
router.post('/', async(req,res) => {
    const user = new User({
        custId: req.body.custId,
        custName: req.body.custName,
        accountPin: req.body.accountPin,
        accountBalance: req.body.accountBalance
    })

    try{
        const u1 = await user.save()
        res.json(u1)
    }catch(err){
        res.send('Registration error')
    }
})

//Fetch all ATM users
router.get('/', async(req,res) => {
    
    try{
        const users = await User.find()
        res.json(users)
    }catch(err){
        res.send('Error ' + err)
    }
})

//Fetch ATM user details
router.get('/:id/:pin/:key', async(req,res) => {
    
    try{
        const userData = await User.findById(req.params.id)
        if(userData != null){
            if(userData.accountPin == req.params.pin){
                if('CB' == req.params.key) 
                    res.send('Account balance is: ' + userData.accountBalance)
                else if('VD' == req.params.key)
                    res.json(userData)
            }
            else
                res.send('Invalid Pin')
        }
        else{
            res.send('User not found!')
        }
    }catch(err){
        res.send('Error ' + err)
    }
})

//Check balance and View details functionality
router.get('/:id/:pin/:key', async(req,res) => {
    
    try{
        const userData = await User.findById(req.params.id)
        if(userData != null){
            if(userData.accountPin == req.params.pin){
                if('CB' == req.params.key) 
                    res.send('Account balance is: ' + userData.accountBalance)
                else if('VD' == req.params.key)
                    res.json(userData)
            }
            else
                res.send('Invalid Pin')
        }
        else{
            res.send('User not found!')
        }
    }catch(err){
        res.send('Error ' + err)
    }
})

//Deposit and Withdraw functionality
router.patch('/:id/:pin/:key', async(req,res) => {
    
    try{
        const userData = await User.findById(req.params.id)
        if(userData != null){
            if(userData.accountPin == req.params.pin){
                const currBal = parseInt(userData.accountBalance)
                const newBal = null

                if('W' == req.params.key)
                    newBal = currBal - parseInt(req.body.amt)
                else if('D' == req.params.key)
                    newBal = currBal + parseInt(req.body.amt)
                    
                if(newBal<0)
                    res.send('Insufficient funds')
                else{
                    await userData.save()
                    if('W' == req.params.key)
                        res.send('Amount withdrawn: ' + parseInt(req.body.amt) + '\nNew Balance: ' + userData.body.accountBalance)
                    else if('D' == req.params.key)
                        res.send('Amount deposited: ' + parseInt(req.body.amt) + '\nNew Balance: ' + userData.body.accountBalance)
                }  
            }
            else
                res.send('Invalid Pin')
        }
        else{
            res.send('User not found!')
        }
    }catch(err){
        res.send('Error ' + err)
    }
})

/*router.patch('/:id', async(req,res) => {
    
    try{
        const alien = await Alien.findById(req.params.id)
        alien.sub = req.body.sub
        const a1 = await alien.save()
        res.json(a1)
    }catch(err){
        res.send('Error ' + err)
    }
})

router.delete('/:id', async(req,res) => {
    
    try{
        const alien = await Alien.findById(req.params.id)
        await alien.remove()
        res.send('User deleted')
    }catch(err){
        res.send('Error ' + err)
    }
})

router.post('/', async(req,res) => {
    const alien = new Alien({
        name: req.body.name,
        tech: req.body.tech,
        sub: req.body.sub
    })

    try{
        const a1 = await alien.save()
        res.json(a1)
    }catch(err){
        res.send('Post error')
    }
})*/

module.exports = router