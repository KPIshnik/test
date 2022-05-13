const http= require('http')

let reqCounter = 0;

const server = http.createServer( (req,res)=> {
    reqCounter++
    res.write('Aloha Mother Fuker\n')
    res.write('Huita is happening \n')
    res.write(`${reqCounter}`)
    res.end()
})            

server.listen(5500)