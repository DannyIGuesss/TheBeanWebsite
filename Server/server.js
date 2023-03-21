const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors')
const cookieParser = require('cookie-parser')

require('./config/mongoose.config')
require('dotenv').config();


app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json(), express.urlencoded({ extended: true }));

const customerRoutes = require('./routes/customer.routes')

const newItemRoutes = require('./routes/foodItem.routes')

const orders =  require('./routes/order.routes')

orders(app)

customerRoutes(app)

newItemRoutes(app)


app.listen(port, () => console.log(`Listening on port: ${port}`) );