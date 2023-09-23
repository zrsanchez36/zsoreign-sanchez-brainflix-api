const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');


// start Express on port 8080
app.listen(8080, () => {
    console.log('Server Started on http://localhost:8080');
    console.log('Press CTRL + C to stop server');
});

