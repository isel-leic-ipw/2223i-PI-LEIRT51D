// Module that implements all tasks management logic

import * as tasksData from './tasks-data.mjs'

export async function getTasks() {
    return tasksData.getTasks()
}

export async function getTask(taskId) {
    // Validate taskId
    return tasksData.getTask(taskId)
}

export async function searchTasks(search) {
    console.log(search)
    return (await tasksData.getTasks())
        .filter(task => task.title.includes(search))
        .map(task => { return { id: task.id, title: task.title }})
}

export async function deleteTask(taskId) {
    // Validate taskId

    return tasksData.deleteTask(taskId)
}

export async function createTask(taskRepresentation) {
    // Validate all task properties
    if(!isValidString(taskRepresentation.title)) {
         throw `Task must have a title`
    }

    return tasksData.createTask(taskRepresentation)
}

export async function updateTask(taskId, taskRepresentation) {
    // Validate all task properties
    if(!isValidString(taskRepresentation.title)) {
        throw `Task must have a title`
   }
   return tasksData.updateTask(taskRepresentation)
}

// Auxiliary functions


function isValidString(value) {
    return typeof value == 'string' && value != ""

}