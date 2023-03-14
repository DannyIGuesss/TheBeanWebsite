const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors')



app.use(cors())

require('./config/mongoose.config')
require('dotenv').config();

app.use(express.json(), express.urlencoded({ extended: true }));

const customerRoutes = require('./routes/customer.routes')
customerRoutes(app)
app.listen(port, () => console.log(`Listening on port: ${port}`) );