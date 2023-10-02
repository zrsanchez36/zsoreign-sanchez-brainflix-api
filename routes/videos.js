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
        comments: [{
            "id": uuid.v4(),
            "name": "Micheal Lyons",
            "comment": "They BLEW the ROOF off at their last event, once everyone started figuring out they were going. This is still simply the greatest opening of an event I have EVER witnessed.",
            "likes": 0,
            "timestamp": 1628522461000
          },
          {
            "id": uuid.v4(),
            "name": "Gary Wong",
            "comment": "Every time I see him shred I feel so motivated to get off my couch and hop on my board. He’s so talented! I wish I can ride like him one day so I can really enjoy myself!",
            "likes": 0,
            "timestamp": 1626359541000
          },
          {
            "id": uuid.v4(),
            "name": "Theodore Duncan",
            "comment": "How can someone be so good!!! You can tell he lives for this and loves to do it every day. Every time I see him I feel instantly happy! He’s definitely my favorite ever!",
            "likes": 0,
            "timestamp": 1626011132000
          }],
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
