// Module that contains the functions that handle all HTTP APi requests.
// Handle HTTP request means:
//  - Obtain data from requests. Request data can be obtained from: URI(path, query, fragment), headers, body
//  - Invoke the corresponding operation on services
//  - Generate the response in HTML format

import url from 'url'

import toHttpResponse from '../api/response-errors.mjs'


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));


export default function (tasksServices) {
    // Validate argument
    return {
        getHome: getHome,
        getCss: getCss,
        getTask: handleRequest(getTaskInternal)
    }



    async function getHome(req, rsp) {
        return rsp.sendFile(__dirname + 'resources/home.html')
    }

    async function getCss(req, rsp) {
        return rsp.sendFile(__dirname + 'resources/site.css')
    }

    async function getTaskInternal(req, rsp) {
        const taskId = req.params.id
        const task = await tasksServices.getTask(req.token, taskId)
        const html = `
        <!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="site.css">
    <meta charset="utf-8" />
    <title>${task.title}</title>
</head>
<body>
    <h2>${task.title}</h2>
    <p>${task.description}<p/>
</body>
</html>`

        return rsp.send(html)
    }
}

function handleRequest(handler) {
    const userToken = 'ef604e80-a351-4d13-b78f-c888f3e63b60'

    return async function (req, rsp) {
        req.token = userToken
        try {
            let body = await handler(req, rsp)
            rsp.json(body)
        } catch (e) {
            const response = toHttpResponse(e)
            rsp.status(response.status).json({ error: response.body })
            console.log(e)
        }
    }
}