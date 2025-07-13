const express = require("express");
const dotenv = require('dotenv');
const objectRoutes = require('./routes');
const cors = require('cors');
const path = require('path');
const { initMongo } = require('./config');

dotenv.config({ path: './.env' });

const app = express();
const port = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send("DockStore API Working"));
app.use("/objects", objectRoutes);

initMongo(MONGO_URI).then(() => {
  app.listen(port, () => console.log(`Object Store running at ${port}`));
});

module.exports = app;