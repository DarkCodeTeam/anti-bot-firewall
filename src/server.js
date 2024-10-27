const express = require('express');
const { botFilter } = require('./middlewares/botFilter');
const rateLimitMiddleware = require('./middlewares/rateLimit');
const apiRoutes = require('./routes/api');
const config = require('../config/config');

const app = express();

app.use(rateLimitMiddleware);
app.use(botFilter);
app.use('/api', apiRoutes);

app.listen(config.PORT, () => {
    console.log(`Server running on http://localhost:${config.PORT}`);
});
