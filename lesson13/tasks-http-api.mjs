// Module that contains the functions that handle all HTTP APi requests§


const NUM_TASKS = 3

let tasks = new Array(NUM_TASKS).fill(0, 0, NUM_TASKS)
    .map((_, idx) => { 
        return {
            id: idx,
            title: `Task ${idx}`,
            description: `Task ${idx} description`
        } 
    })



export function getTasks(req, rsp) {
    rsp.json(tasks)
}

export function getTask(req, rsp) {
    const taskId = req.params.id
    const task = tasks.find(task => task.id == taskId)
    if(task != undefined) {
        rsp.json(task)
    } else {
        rsp.status(404).json({error: `Task with id ${taskId} not found`})
    }
}

export function deleteTask(req, rsp) {
    const taskId = req.params.id
    const taskIdx = tasks.findIndex(task => task.id == taskId)
    if(taskIdx != -1) {
        tasks.splice(taskIdx, 1)
        rsp.json({status: `Task with id ${taskId} deleted with success`})
    } else {
        rsp.status(404).json({error: `Task with id ${taskId} not found`})
    }
}

export function createTask(req, rsp) {
    let newTask = {
        id = 
        title: req.body.title,
        description: req.body.description,
    }
}

export function editTask(req, rsp) {
    rsp.end(`PUT task with id ${req.params.id}`)
}