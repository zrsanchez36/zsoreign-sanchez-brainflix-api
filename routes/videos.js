const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const router = express.Router();

const videos = require('../data/videos.json');
const videosPath = path.join(__dirname, '..', 'data', 'videos.json');

router.use(cors({
    origin: 'http://localhost:3000',
}));
router.use(bodyParser.json());
router.use('/public/images', express.static(path.join(__dirname, '..', 'public', 'images')));

router.get('/', (req, res) => {
    res.json(videos.map(video => ({
        id: video.id,
        title: video.title,
        channel: video.channel,
        image: video.image,
    })));
});

router.get('/:id', (req, res) => {
    const video = videos.find(v => v.id === req.params.id);
    if (video) {
        res.json(video);
    } else {
        res.status(404).send({ message: 'Video not found' });
    }
});

router.post('/', (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) return res.status(400).send('Title and Description are required');
    
    const newVideo = {
        id: uuid.v4(),
        title,
        description,
        image: '/images/default-image.jpg',
        comments: [],
    };
    videos.push(newVideo);
    fs.writeFileSync(videosPath, JSON.stringify(videos, null, 4));
    res.status(201).json(newVideo);
});

router.post('/:id/comments', (req, res) => {
    const { id } = req.params;
    const { name, comment } = req.body;
    
    const video = videos.find(v => v.id === id);
    if (!video) return res.status(404).send({ message: 'Video not found' });
    
    const newComment = { name, comment, id: uuid.v4(), timestamp: Date.now() };
    video.comments.push(newComment);
    
    fs.writeFileSync(videosPath, JSON.stringify(videos, null, 4));
    res.status(201).json(newComment);
});

module.exports = router;
