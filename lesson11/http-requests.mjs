import fetch from 'node-fetch'


const URL = 'http://localhost:9200/movies'

const req = {
    method: 'PUT',
    headers: {
        Host: 'www.isel.pt',
        'User-Agent': "SLB" 
    },
    redirect: 'manual'

}
let rsp = await fetch(URL, req)
console.log(rsp)

