const express = require('express');
const sequelize = require('./config/connection');
const path = require('path');
const routes = require('./controllers')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);
sequelize.sync({ force: false}).then(() => {
  app.listen(PORT, () => console.log(`Now Listening on ${PORT}`));
});