// const express = require('express');
// const app = express();
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const uuid = require('uuid');
// const fs = require('fs');
// const path = require('path');

// const { CORS_ORIGIN } = process.env;
// const videosRoute = require('./routes/videos');

// app.use('/route/videos', videosRoute);
// require('dotenv')
// app.use(express.json());
// app.use(bodyParser.json());
// app.use('/images', express.static('./public/images'));
// app.use(cors({
//     origin: 'http://localhost:3000'
//   }));

// // start Express on port 5000
// app.listen(5000, () => {
//     console.log('Server Started on http://localhost:5000');
//     console.log('Press CTRL + C to stop server');
// });

const express = require('express');
const cors = require('cors');
const path = require('path');
const videosRoute = require('./routes/videos');

const app = express();

// Setup middlewares
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// Setup route
app.use('/videos', videosRoute);

// start Express on port 5000
app.listen(5000, () => {
    console.log('Server Started on http://localhost:5000');
    console.log('Press CTRL + C to stop server');
});
