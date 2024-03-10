const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db.confg.js');
const userRouter = require('./routes/userRoute.js');
const PORT = process.env.PORT || 600;

const app = express();

app.use(express.json());
app.use(cors({origin: true, credentials: true}))
app.use(cookieParser());
app.use('/api', userRouter);

connectDB();

app.listen(PORT, () => { console.log(`started server at ${PORT}`) });
