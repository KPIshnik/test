const http= require('http')
const fs = require('fs')

let reqCounter = 0;
let ans=''
const server = http.createServer( (req,res)=> {
        
    reqCounter++
    switch (req.url){
        case '/':
            res.write('Aloha Mather Fucker! \n')
            break
        case '/huita':
            res.write('Huita is hapening \n')
            break
        case '/mozg':
            res.write('mozg is good :) \n')
            break
        case '/favicon.ico':
            reqCounter--    
            img=fs.readFileSync('./favicon.ico')
            res.writeHead(200,{'content-type': 'image/ico'})
            res.write(img, 'binary')
            break
        default:
            res.write('404 not found \n') 
            break
    }
    
    res.write(`Zaebal ${reqCounter} raz`)
    res.end()
})            

server.listen(5500)