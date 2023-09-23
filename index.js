const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const fs = require('fs');
const path = require('path');

const { CORS_ORIGIN } = process.env;


require('dotenv')
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(cors( { origin: CORS_ORIGIN}));
let videos = require('./videos.json'); // Import your videos data from a JSON file







// GET /videos
app.get('/videos', (req, res) => {
    res.json(videos.map(video => ({ // Return a subset of video properties
        id: video.id,
        title: video.title,
        image: video.image,
    })));
});

// GET /videos/:id
app.get('/videos/:id', (req, res) => {
    const video = videos.find(v => v.id === req.params.id);
    if (video) {
        res.json(video); // Return all properties of the video
    } else {
        res.status(404).send('Video not found');
    }
});

// POST /videos
app.post('/videos', (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).send('Title and Description are required');
    }
    
    const newVideo = {
        id: uuid.v4(), // Generate a unique ID
        title,
        description,
        image: '/images/default-image.jpg', // Hardcoded image path
        // Add other video properties with placeholder values as necessary
    };
    videos.push(newVideo);
    
    // Save the updated videos array back to the JSON file
    fs.writeFileSync('./videos.json', JSON.stringify(videos, null, 4));
    
    res.status(201).json(newVideo);
});

// start Express on port 8080
app.listen(8080, () => {
    console.log('Server Started on http://localhost:8080');
    console.log('Press CTRL + C to stop server');
});

