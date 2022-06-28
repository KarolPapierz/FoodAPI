const express = require('express')
const app = express();
const mongo = require('mongoose')
require('dotenv/config')
const bodyParser = require('body-parser');
const path = require('path');


//api page
const postsRoute = require('./routes/api');
app.use('/api', postsRoute);



//main page
app.set("view engine","jade")
const main = require('./routes/index');
app.get('/', main);
app.use(express.static(path.join(__dirname, 'public')));



//api management
mongo.connect(process.env.DATABASE_CONNECTION,  { useNewUrlParser: true })
const db = mongo.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))



//listen on port
app.listen(process.env.PORT || 3000, () => console.log('Server Started'))
