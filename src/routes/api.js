const express = require('express');
const router = express.Router();
const { blockIp } = require('../middlewares/botFilter');

router.get('/', (req, res) => {
    res.send('Welcome to the API! You are not a bot.');
});


router.post('/block-ip', (req, res) => {
    const ipToBlock = req.body.ip; 
    if (!ipToBlock) {
        return res.status(400).send('IP address is required.');
    }
    blockIp(ipToBlock);
    res.send(`IP ${ipToBlock} has been blocked.`);
});

module.exports = router;
