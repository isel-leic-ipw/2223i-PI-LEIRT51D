// Application Entry Point. 
// Register all HTTP API routes and starts the server
import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import yaml from 'yamljs'
import url from 'url'
import hbs from 'hbs'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'

import  * as tasksData from './data/memory/tasks-data-m.mjs'
import  * as usersData from './data/memory/users-data-m.mjs'
import  tasksServicesInit from './services/tasks-services.mjs'
import  tasksApiInit from './web/api/tasks-api.mjs'
import  tasksSiteInit from './web/site/tasks-site.mjs'
import usersWebSiteInit from './web/site/users-site.mjs'

const tasksServices = tasksServicesInit(tasksData, usersData)
const api = tasksApiInit(tasksServices)
const tasksSite = tasksSiteInit(tasksServices)
const usersSite = usersWebSiteInit(tasksServices)


const PORT = 1904

console.log("Start setting up server")
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
let app = express()

app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(__dirname +  'web/site/resources/public'))

app.use(cors())
const swaggerDocument = yaml.load('./docs/tasks-api.yaml')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// View engine setup
const viewsPath = `${__dirname}/web/site/resources/views`
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(`${viewsPath}/partials`)


function getHome(req, rsp) {
    rsp.redirect('/tasks')
}

// Web Site routes
app.get('/', getHome)
app.use(usersSite)
app.use('/tasks/', tasksSite)

// Web API routes
app.get('/api/tasks', api.getTasks)
app.get('/api/tasks/:id', api.getTask)
app.delete('/api/tasks/:id', api.deleteTask)
app.post('/api/tasks', api.createTask)
app.put('/api/tasks/:id', api.updateTask)

app.listen(PORT, () => console.log(`Server listening in http://localhost:${PORT}`))

console.log("End setting up server")

