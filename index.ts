import express from 'express'

const app=express()

app.get('/',(req,res)=>{
    res.send('Aloha Mather Fucker! \n')
})

app.get('/huita',(req,res)=>{
    res.send('Huita is hapening \n')
})

app.post('/huita',(req,res)=>{
    res.send('Huita is chenged')
})

app.listen(3000, ()=> {
    console.log('started server')
})

module.exports=app
