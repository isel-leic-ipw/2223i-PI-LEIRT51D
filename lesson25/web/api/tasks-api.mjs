// Module that contains the functions that handle all HTTP APi requests.
// Handle HTTP request means:
//  - Obtain data from requests. Request data can be obtained from: URI(path, query, fragment), headers, body
//  - Invoke the corresponding operation on services
//  - Generate the response in Json format

import toHttpResponse from '../response-errors.mjs'

export default function (tasksServices) {
    // Validate argument
    return {
        getTasks: handleRequest(getTasksInternal),
        getTask: handleRequest(getTaskInternal),
        deleteTask: handleRequest(deleteTaskInternal),
        createTask: handleRequest(createTaskInternal),
        updateTask: handleRequest(updateTaskInternal)
    }


    async function getTasksInternal(req, rsp) {
        return tasksServices.getTasks(req.token, req.query.q, req.query.skip, req.query.limit)
    }

    async function getTaskInternal(req, rsp) {
        const taskId = req.params.id
        return tasksServices.getTask(req.token, taskId)
    }

    async function deleteTaskInternal(req, rsp) {
        const taskId = req.params.id
        const task = await tasksServices.deleteTask(req.token, taskId)
        return {
            status: `Task with id ${taskId} deleted with success`,
            task: task
        }
    }

    async function createTaskInternal(req, rsp) {
        let newTask = await tasksServices.createTask(req.token, req.body)
        rsp.status(201)
        return {
            status: `Task with id ${newTask.id} created with success`,
            task: newTask
        }
    }

    async function updateTaskInternal(req, rsp) {
        const taskId = req.params.id
        const task = await tasksServices.updateTask(req.token, taskId, req.body)
        return {
            status: `Task with id ${taskId} updated with success`,
            task: task
        }
    }



    // Auxiliary functions


    function handleRequest(handler) {
        return async function (req, rsp) {
            // Obtain the token and make it available in req.token
            req.token = getToken(req)
            try {
                let obj = await handler(req, rsp)
                sendResponse(obj, rsp)
            } catch (e) {
                const response = toHttpResponse(e)
                rsp.status(response.status)
                sendError(response.error, rsp)
            }
        }
    }

    function getToken(req) {
        // Obtain the token and make it available in req.token
        const BEARER_STR = "Bearer "
        const tokenHeader = req.get("Authorization")
        if (!(tokenHeader && tokenHeader.startsWith(BEARER_STR) && tokenHeader.length > BEARER_STR.length)) {
            rsp
                .status(401)
                .json({ error: `Invalid authentication token` })
            return
        }
        return tokenHeader.split(" ")[1]
    }

    function sendResponse(obj, rsp) {
        rsp.json(obj)
    }

    function sendError(error, rsp) {
        rsp.json(error)
    }
}
