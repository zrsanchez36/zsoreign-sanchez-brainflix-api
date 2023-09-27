const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const videosPath = path.join(__dirname, '..', 'data', 'videos.json'); // Adjusted the path

router.use(bodyParser.json());
router.use('/images', express.static('./public/images')); // Adjust this path if needed

// GET /videos
router.get('/', (req, res) => {
    let videos = JSON.parse(fs.readFileSync(videosPath, 'utf-8'));
    res.json(videos.map(video => ({
        id: video.id,
        title: video.title,
        image: video.image,
    })));
});

// GET /videos/:id
router.get('/:id', (req, res) => {
    let videos = JSON.parse(fs.readFileSync(videosPath, 'utf-8'));
    const video = videos.find(v => v.id === req.params.id);
    if (video) {
        res.json(video);
    } else {
        res.status(404).send('Video not found');
    }
});

// POST /videos
router.post('/', (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).send('Title and Description are required');
    }

    let videos = JSON.parse(fs.readFileSync(videosPath, 'utf-8'));
    const newVideo = {
        id: uuid.v4(),
        title,
        description,
        image: '/images/default-image.jpg',
    };
    videos.push(newVideo);
    fs.writeFileSync(videosPath, JSON.stringify(videos, null, 4));

    res.status(201).json(newVideo);
});

module.exports = router;
