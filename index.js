const http= require('http')

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
            res.write('favicon')
            break
        default:
            res.write('404 not found \n') 
            break
    }
    
    res.write(`Zaebal ${reqCounter} raz`)
    res.end()
})            

server.listen(5500)