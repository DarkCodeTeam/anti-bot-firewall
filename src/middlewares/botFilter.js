const fs = require('fs');
const path = require('path');
const { botUserAgents } = require('../../config/config');

const BLOCKED_IPS_FILE = path.join(__dirname, '../../blockedIps.json');

let blockedIps = new Set();

if (fs.existsSync(BLOCKED_IPS_FILE)) {
    const data = fs.readFileSync(BLOCKED_IPS_FILE, 'utf-8');
    try {
        blockedIps = new Set(JSON.parse(data));
    } catch (error) {
        console.error("Error parsing blocked IPs JSON:", error);
    }
}

const botFilter = (req, res, next) => {
    const clientIp = req.headers['x-forwarded-for'] || req.ip || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];

    console.log(`User-Agent: ${userAgent}`);
    console.log(`Client IP: ${clientIp}`);

    const isBot = botUserAgents.some(pattern => pattern.test(userAgent));
    
    console.log(`Is bot: ${isBot}`);

    if (isBot) {
        blockIp(clientIp);
        console.log(`Access denied: ${clientIp} is a bot.`);
        return res.status(403).send('Access denied for bots.');
    }

    if (blockedIps.has(clientIp)) {
        console.log(`Access denied: ${clientIp} is a blocked IP.`);
        return res.status(403).send('Access denied for blocked IPs.');
    }
    
    next();
};

function blockIp(ip) {
    if (!blockedIps.has(ip)) {  
        blockedIps.add(ip);
        fs.writeFileSync(BLOCKED_IPS_FILE, JSON.stringify(Array.from(blockedIps)));
        console.log(`IP blocked: ${ip}`);
    }
}

module.exports = { botFilter, blockIp };
