// Module that contains the functions that handle all HTTP APi requests.
// Handle HTTP request means:
//  - Obtain data from requests. Request data can be obtained from: URI(path, query, fragment), headers, body
//  - Invoke the corresponding operation on services
//  - Generate the response



import * as tasksServices from '../services/tasks-http-services.mjs'
import * as responseErrors from './response-errors.mjs'

export let getTasks = validateToken(getTasksInternal)
export let searchTasks = validateToken(searchTasksInternal)
export let getTask = validateToken(getTaskInternal)
export let deleteTask = validateToken(deleteTaskInternal)
export let createTask = validateToken(createTaskInternal)
export let updateTask = validateToken(updateTaskInternal)


async function getTasksInternal(req, rsp) {
    rsp.json(await tasksServices.getTasks(req.token))
}

async function searchTasksInternal(req, rsp) {
    const searchStr = req.query.q
    rsp.json(await tasksServices.searchTasks(req.token, searchStr))
}

async function getTaskInternal(req, rsp) {
    const taskId = req.params.id
    const task = await tasksServices.getTask(req.token, taskId)
    if(task != undefined) {
        rsp.json(task)
    } else {
        buildNotFoundMessage(rsp, taskId)
    }
}

export async function deleteTaskInternal(req, rsp) {
    const taskId = req.params.id
    const task = await tasksServices.deleteTask(req.token, taskId)
    if(task != undefined) {
        rsp.json(
            {
                status: `Task with id ${taskId} deleted with success`,
                task: task
            })
    } else {
        buildNotFoundMessage(rsp, taskId)
    }   
}

export async function createTaskInternal(req, rsp) {
    try {
        let newTask = await tasksServices.createTask(req.token, req.body)
    rsp.json(
        {
            status: `Task with id ${newTask.id} created with success`,
            task: newTask
        }
    )
    } catch(e) {
        rsp.status(400).json({error: e})
    }

}

export async function updateTaskInternal(req, rsp) {
    const taskId = req.params.id
    const task = await tasksServices.updateTask(req.token, taskId, req.body)
    if(task != undefined) {
        rsp.json(
            {
                status: `Task with id ${taskId} updated with success`,
                task: task
            })
    } else {
        buildNotFoundMessage(rsp, taskId)
    }
}



// Auxiliary functions
function buildNotFoundMessage(rsp, taskId) {
    rsp
        .status(404)
        .json({error: `Task with id ${taskId} not found`})
}


function validateToken(handler) {
    return async function(req, rsp) {
        const BEARER_STR = "Bearer "
        const tokenHeader = req.get("Authorization")
        if(!(tokenHeader && tokenHeader.startsWith(BEARER_STR) && tokenHeader.length > BEARER_STR.length)) {
            rsp
                .status(401)
                .json({error: `Invalid authentication token`})
                return
        }
        req.token = tokenHeader.split(" ")[1]
        try {
            await handler(req, rsp)
        } catch(e) {
            const rspError = responseErrors(e)
            rsp.status(rspError.status).json(rspError.body)
        }
    }
}

