const express = require('express');
const router = express.Router();
const fs = require ('fs');
const {v4: uuidv4} = require ('uuid');

function videoList() {
    const videoInfoList = fs.readFileSync('./data/videos.json');
    const parsedData = JSON.parse(videoInfoList);
    return parsedData;
}

router.get('/', (req, res) => {
    videos = videoList();
    res.json(videos);
});

router.get('/:id', (req, res) => {
    const videoId = req.params.id;
    let videos = videoList();
    const video = videos.find((i) => i.id === videoId);

    if(video) {
        res.json(video);
    } else {
        res.status(404).send('Video was not found');
    }
})

router.post('/', (req, res) => {
    const postedVideo = {
        id: uuidv4(),
        title: req.body.title,
        description: req.body.description,
        image: 'Upload-video-preview.jpg',
        comments: [
            {
            "id": "35bba08b-1b51-4153-ba7e-6da76b5ec1b9",
            "name": "Gerrica",
            "comment": "Wassup Dude.",
            "likes": 0,
            "timestamp": 1628522461000
            },
            {
            "id": "091de676-61af-4ee6-90de-3a7a53af7521",
            "name": "fran ",
            "comment": "nice but hows your software journey going? ",
            "likes": 0,
            "timestamp": 1626359541000
            },
            {
            "id": "66b7d3c7-4023-47f1-a02c-520c9ca187a6",
            "name": "Moss Man",
            "comment": "SMOOTH",
            "likes": 0,
            "timestamp": 1626011132000
            }
        ],
        channel: 'Donald Mack',
        likes: '50,000',
        views: '80,000',
        timestamp: 1632496261000,
    };

    let videos = videoList();
    videos.push(postedVideo);
    fs.writeFileSync('./data/videos.json',JSON.stringify(videos));

    res.status(201).json(newVideos);
})

module.exports = router;
