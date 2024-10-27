const { requestLimit, blockThreshold } = require('../../config/config');
const { blockIp } = require('./botFilter');

const rateLimit = {};
const blockedCount = {};

const rateLimitMiddleware = (req, res, next) => {
    const clientIp = req.ip || req.connection.remoteAddress;

    if (!rateLimit[clientIp]) {
        rateLimit[clientIp] = { count: 0, lastRequest: Date.now() };
        blockedCount[clientIp] = 0; 
    }

    const now = Date.now();
    const timeDiff = now - rateLimit[clientIp].lastRequest;


    if (timeDiff > 60000) {
        rateLimit[clientIp].count = 0;
    }

    rateLimit[clientIp].lastRequest = now;
    rateLimit[clientIp].count += 1;

    if (rateLimit[clientIp].count > requestLimit) { 
        blockedCount[clientIp] += 1; 

        if (blockedCount[clientIp] >= blockThreshold) {
            blockIp(clientIp);
            return res.status(403).send('Access denied for suspicious activity.');
        }

        return res.status(429).send('Too many requests. Please try again later.');
    }

    next();
};

module.exports = rateLimitMiddleware;
