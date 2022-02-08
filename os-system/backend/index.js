const app = require('express')()
const consign = require('consign')
const db = require('./config/db.js')

app.db = db;

consign()
    .then('./api')
    .then('./config/middlewares.js')
    .then('./config/routes.js')
    .into(app)

app.listen(3000, () =>{
    console.log('✔ Server working.')
})

app.get('/', (req, res) =>{
    res.send('Hello')
}
)