const app = require('express')();
const consign = require('consign');
const db = require('./config/db.js');

app.db = db;

consign()
    .then('./api/validation.js')
    .then('./api')
    .then('./config/middlewares.js')
    .then('./config/routes.js')
    .into(app)

app.listen(4000, () =>{
    console.log('Backend Is Running')
})

app.get('/', (req, res) => {
    res.send('Hello')
})
