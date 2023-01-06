// Module that contains the functions that handle all HTTP APi requests.
// Handle HTTP request means:
//  - Obtain data from requests. Request data can be obtained from: URI(path, query, fragment), headers, body
//  - Invoke the corresponding operation on services
//  - Generate the response in HTML format

import url from 'url'
import express from 'express'

import toHttpResponse from '../response-errors.mjs'


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));


function View(name, data) {
    this.name = name
    this.data = data

}

export default function (tasksServices) {
    // Validate argument
    const router = express.Router()

    router.get('/', handleRequest(getTasksInternal))
    router.get('/new', getNewTaskForm)
    router.get('/:id', handleRequest(getTaskInternal))
    router.post('/', handleRequest(createTaskInternal))
    router.post('/:id/delete', handleRequest(deleteTaskInternal))
    router.post('/:id/edit', handleRequest(updateTaskInternal))

    return router



    async function getTasksInternal(req, rsp) {
        const tasks = await tasksServices.getTasks(req.user.token, req.query.q, req.query.skip, req.query.limit)
        
        return new View('tasks', { title: 'All tasks', tasks: tasks.map(t => { 
            return { id: t.id, title: t.title, description: t.description, important: t.title.includes('2') } 
        }) })
    }

    async function getTaskInternal(req, rsp) {
        const taskId = req.params.id
        const task = await tasksServices.getTask(req.user.token, taskId)
        return new View ('task', {token: req.user.token, task: task })
    }

    async function getNewTaskForm(req, rsp) {
        rsp.render('newtask')
    }

    async function createTaskInternal(req, rsp) {
        let newTask = await tasksServices.createTask(req.user.token, req.body)
        rsp.redirect('/tasks')
    }

    async function deleteTaskInternal(req, rsp) {
        const taskId = req.params.id
        const task = await tasksServices.deleteTask(req.user.token, taskId)
        rsp.redirect('/tasks')
    }

    async function updateTaskInternal(req, rsp) {
        
    }
}

function handleRequest(handler) {    
    return async function (req, rsp) {
        // Obtain the user with the token token and make it available in req.user
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

function sendResponse(view, rsp) {
    rsp.render(view.name, view.data)
}

function sendError(error, rsp) {
    rsp.render('error', error)
}
