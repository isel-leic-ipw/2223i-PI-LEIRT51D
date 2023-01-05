//curl -X PUT http://localhost:9200/tasks
//curl -X POST --data '{ "id" : 1 , "text" : "task 1 elastic" }' -H "Content-Type: application/json" http://localhost:9200/tasks/_doc
//curl -X POST --data '{ "id" : 2 , "text" : "task 2 elastic" }' -H "Content-Type: application/json" http://localhost:9200/tasks/_doc

import {get, post} from './fetch-wrapper.mjs'
import uriManager from './uri-manager.mjs'

export default function (indexName = 'tasks') {

    const URI_MANAGER = uriManager(INDEX_NAME)

    return {
        getTasks: getTasks,
        getTask: getTask,
        updateTask: updateTask,
        createTask: createTask,
        deleteTask: deleteTask
    }

    async function getTasks(userId, q, skip, limit) {
        const query = {
            query: {
              match: {
                "ownerUser": userId
              }
            }
          }
        return post(URI_MANAGER.getAll(), query)
            .then(body => body.hits.hits.map(createTaskFromElastic))

    }

    async function getTask(id) {
        return get(URI_MANAGER.get(id))
            .then(createTaskFromElastic)
    }

    async function createTask(task) {
        const newTask = Object.assign(task)
        return post(URI_MANAGER.create(), newTask)
            .then(body => { newTask.id = body._id; return newTask })
    }

    async function updateTask(userId, id, name, description) {
        console.log("updateTask")
    }

    async function deleteTask(id) {
        return del(URI_MANAGER.delete(id), )
            .then(body => body._id)
    }


    function createTaskFromElastic(taskElastic) {
        let task = taskElastic._source
        task.id = taskElastic._id
        return task
    }
}