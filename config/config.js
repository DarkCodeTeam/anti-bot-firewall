const config = {
    PORT: process.env.PORT || 3001,
    botUserAgents: [
        /bot/i,
        /crawler/i,
        /spider/i,
        /curl/i,
        /wget/i,
        /java/i,
        /bingbot/i,
        /slackbot/i,
        /baidu/i,
        /duckduckgo/i,
        /facebookexternalhit/i,
        /twitterbot/i,
        /linkedinbot/i,
        /youtube/i,
        /amazon/i,
        /yahoo/i,
        /searchmetrics/i,
    ],
    requestLimit: 100, 
    blockThreshold: 5 
};

module.exports = config;
