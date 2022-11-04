// Module that contains the functions that handle all HTTP APi requests§


import * as tasksServices from './tasks-http-services.mjs'

export async function getTasks(req, rsp) {
    rsp.json(await tasksServices.getTasks())
}

export async function searchTasks(req, rsp) {
    const searchStr = req.query.q
    rsp.json(await tasksServices.searchTasks(searchStr))
}

// export async function getTasks(req, rsp) {
//     tasksServices.getTasks().then(tasks => rsp.json(tasks))
// }

export async function getTask(req, rsp) {
    const taskId = req.params.id
    const task = await tasksServices.getTask(taskId)
    if(task != undefined) {
        rsp.json(task)
    } else {
        buildNotFoundMessage(rsp, taskId)
    }
}

export async function deleteTask(req, rsp) {
    const taskId = req.params.id
    const task = await tasksServices.deleteTask(taskId)
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

export async function createTask(req, rsp) {
    try {
        let newTask = await tasksServices.createTask(req.body)
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

export async function updateTask(req, rsp) {
    const taskId = req.params.id
    const task = await tasksServices.updateTask(taskId, req.body)
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