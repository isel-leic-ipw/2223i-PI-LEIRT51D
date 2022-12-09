// Module that contains the functions that handle all HTTP APi requests.
// Handle HTTP request means:
//  - Obtain data from requests. Request data can be obtained from: URI(path, query, fragment), headers, body
//  - Invoke the corresponding operation on services
//  - Generate the response in HTML format

import { nextTick } from 'process';
import url from 'url'

import toHttpResponse from '../response-errors.mjs'


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));


function View(name, data) {
    this.name = name
    this.data = data

}

export default function (tasksServices) {
    // Validate argument
    return {
        getHome: getHome,
        getRoot: getRoot,
        getCss: getCss,
        getTasks: handleRequest(getTasksInternal),
        getTask: handleRequest(getTaskInternal),
        getNewTaskForm: getNewTaskForm,
        createTask: handleRequest(createTaskInternal),
        deleteTask: handleRequest(deleteTaskInternal),
        updateTask: handleRequest(updateTaskInternal)
    }


    async function getRoot(req, rsp) {
        rsp.redirect('/tasks')
    }

    async function getHome(req, rsp) {
        return rsp.sendFile(__dirname + 'resources/home.html')
    }

    async function getCss(req, rsp) {
        return rsp.sendFile(__dirname + 'resources/site.css')
    }


    async function getTasksInternal(req, rsp) {
        console.log("###")
        const tasks = await tasksServices.getTasks(req.token, req.query.q, req.query.skip, req.query.limit)
        
        return new View('tasks', { title: 'All tasks', tasks: tasks.map(t => { 
            return { id: t.id, title: t.title, description: t.description, important: t.title.includes('2') } 
        }) })
    }

    async function getTaskInternal(req, rsp) {
        const taskId = req.params.id
        const task = await tasksServices.getTask(req.token, taskId)
        return new View ('task', task)
    }

    async function getNewTaskForm(req, rsp) {
        rsp.render('newtask')
    }

    async function createTaskInternal(req, rsp) {
        let newTask = await tasksServices.createTask(req.token, req.body)
        rsp.redirect('/tasks')
    }

    async function deleteTaskInternal(req, rsp) {
        const taskId = req.params.id
        const task = await tasksServices.deleteTask(req.token, taskId)
        rsp.redirect('/tasks')
    }

    async function updateTaskInternal(req, rsp) {
        
    }
}

function handleRequest(handler) {    
    return async function (req, rsp) {
        // Obtain the token and make it available in req.token
        req.token = getToken()
        try {
            const obj = await handler(req, rsp)
            if(obj)
                sendResponse(obj, rsp)
        } catch (e) {
            const response = toHttpResponse(e)
            rsp.status(response.status)
            sendError(response.error, rsp)
            console.log(e)
        }
    }
}

function getToken(req) {
    // HAMMER TIME: Token for on user ie being defined here hardcoded, 
    // until authentication support is implemented in web site interface

    return 'ef604e80-a351-4d13-b78f-c888f3e63b60'
}

function sendResponse(view, rsp) {
    rsp.render(view.name, view.data)
}

function sendError(error, rsp) {
    rsp.render('error', error)
}
