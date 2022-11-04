// Module that contains the functions that handle all HTTP APi requests§

const NUM_TASKS = 12    

let tasks = new Array(NUM_TASKS).fill(0, 0, NUM_TASKS)
    .map((_, idx) => { 
        return {
            id: idx,
            title: `Task ${idx}`,
            description: `Task ${idx} description`
        } 
    })

let nextId = NUM_TASKS


export async function getTasks() {
    return tasks
}

export async function getTask(taskId) {
    return findTaskAndDoSomething(taskId, task => task)
}

export async function deleteTask(taskId) {
    return findTaskAndDoSomething(
        taskId, 
        (task, taskIdx) => { 
            tasks.splice(taskIdx, 1)
            return task
        })
}

export async function createTask(taskRepresentation) {
    let newTask = {
        id: getNewId(), 
        title: taskRepresentation.title,
        description: taskRepresentation.description,
    }

    tasks.push(newTask)
    return newTask

}

export async function updateTask(taskId, taskRepresentation) {
    return findTaskAndDoSomething(taskId, task => {
        task.title = taskRepresentation.title
        task.description = taskRepresentation.description
        return task
    })
}



// Auxiliary functions
function findTaskAndDoSomething(taskId, action) {
    const taskIdx = tasks.findIndex(task => task.id == taskId)
    const task = tasks[taskIdx]
    if(taskIdx != -1) {
        return action(task, taskIdx)
    } 
}


function getNewId() {
    return nextId++
}
