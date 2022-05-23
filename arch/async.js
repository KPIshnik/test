import http from 'http'
import fs from 'fs';

let delay = (ms) =>{
    return new Promise((res,rej)=>{
        setTimeout(()=>res(), ms)
    })    
}

let readFile = (path)=> {
    return new Promise((resolve, reject) =>{
        fs.readFile(path, (err, data)=>{
            if (err) reject(err)
            resolve(data)
        })
    })
}

http.createServer(async (req,res)=>{
    let html = await readFile('./async.html')
    res.write(html)
    res.end()
    
}).listen(3000)

// let time = Date.now()
// (async () => {
//     await delay(3000)
//     console.log(Date.now()-time)
// })()
