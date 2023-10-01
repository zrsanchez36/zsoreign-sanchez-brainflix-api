
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const videosRoute = require('./routes/videos');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';

app.use(cors({
    origin: CORS_ORIGIN,
}));

app.use(express.json());
app.use(bodyParser.json());
app.use('/images', express.static('./public/images'));

app.use('/videos', videosRoute); 

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server Started on http://localhost:${PORT}`);
    console.log('Press CTRL + C to stop server');
});
