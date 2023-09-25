const express = require('express');

const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');

const config = require('./env-config/index');
const errorHandler = require('./error-handler/index');
app.use(express.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors());
require('./server/sequelize/models');

const routers = require('./routes/index');

app.use('/api', routers);
app.use(errorHandler);

const walletPort = config.get('wallet_port');
app.listen(walletPort, () => {
    console.log(`wallet API is listening on port ${walletPort}`);
  });