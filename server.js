const express = require("express")
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt-nodejs")
const app = express();
const cors = require("cors")
app.use(bodyParser.json())
app.use(cors());

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const knex = require("knex")

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'maradona',
    database : 'smart-brain'
  }
});

db.select('*').from('users').then(data => {
  console.log(data)
});


/*
PLANNING YOUR API

/ --> res this is working
/signin --> POST = success/fail > return new user
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> updated count

*/


app.get("/", (req,res) => {
  res.send(database.users)
})

// app.post("/signin", (req, res) => signin.handleSignin(req, res, db, bcrypt))
app.post("/signin", signin.handleSignin(db, bcrypt))
// DEPENDENCY INJECTION
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get("/profile/:id", (req, res) => { profile.handleProfile(req, res, db) })

app.put("/image", (req, res) => { image.handleImage(req, res, db )})
app.post("/imageurl", (req, res) => { image.handleApiCall(req, res)})










app.listen(3000, () => console.log("started"))
