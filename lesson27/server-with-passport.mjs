'use strict'

import express from 'express'
import morgan from 'morgan'
import passport from 'passport'
import expressSession from 'express-session'
//import fileStore from 'session-file-store'

const app = express()

app.use(morgan('dev'))

//const FileStore = fileStore(expressSession)
app.use(expressSession(
  {
    secret: "Benfica campeão 2022/2023?",
    resave: false,
    saveUninitialized: false
    //store: new FileStore()
  }
  ))

app.use(express.urlencoded())

// Passport initialization
app.use(passport.session())
app.use(passport.initialize())

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))


app.use(showSession)
app.use('/auth', verifyAuthenticated)
app.get('/home', homeNotAuthenticated)
app.get('/auth/home', homeAuthenticated)

app.get('/login', loginForm)
app.post('/login', validateLogin)
app.post('/logout', logout)

const PORT = 1904
app.listen(PORT, () => console.log(`Server listening on port http://localhost:${PORT}/`))

function homeNotAuthenticated(req, rsp) {
  let user = req.user ? req.user.username : "unknown"
  rsp.send(`
  <html>
  <head></head>
  <body>
    <h1>Everybody can see this page. Hello ${user}</h1>
    <a href="/login">Login</a>
    <form method="POST" action="/logout">
        <input type="submit" value="Logout">
    </form>
  </body>
</html>`)
}

function homeAuthenticated(req, rsp) {
  console.log("homeAuthenticated - ", req.user)
  const user = req.user.username
  rsp.send(`
  <html>
  <head></head>
  <body>
    <h1>You can only reach here if you are authenticated. Hello ${user}</h1>
    <form method="POST" action="/logout">
        <input type="submit" value="Logout">
    </form>

  </body>
</html>`)
}



function serializeUser(user, done) {
  console.log("serializeUserCalled")
  console.log(user)
  //done(null, user.username)
  done(null, user)
}

function deserializeUser(user, done) {
  console.log("deserializeUserCalled")
  console.log(user)
  done(null, user)
  // done(null, {
  //   username: user,
  //   dummy: "dummy property on user"
  // })
}


function loginForm(req, rsp) {
  rsp.send(`
  <h1>Sign in</h1>
  <form action="/login" method="post">
      <section>
          <label for="username">Username</label>
          <input id="username" name="username" type="text" autocomplete="username" required autofocus>
      </section>
      <section>
          <label for="current-password">Password</label>
          <input id="current-password" name="password" type="password" autocomplete="current-password" required>
      </section>
      <button type="submit">Sign in</button>
  </form>
  `)

}


function validateLogin(req, rsp) {
  console.log("validateLogin")
  if(validateUser(req.body.username, req.body.password)) {
    const user = {
      username: req.body.username,
      dummy: "dummy property on user"
    }
    console.log(user)
    
    req.login(user, () => rsp.redirect('/auth/home'))
  }



  function validateUser(username, password) { return true }
}


function verifyAuthenticated(req, rsp, next) {
  console.log("verifyAuthenticated", req.user)
  if(req.user) {
    return next()
  }
  rsp.redirect('/login')
}

function logout(req, rsp) {
  req.logout((err) => { 
    rsp.redirect('/home')
  })
  
}


function showSession(req, rsp, next) {
  console.log("Session:", req.session)
  next()
}



