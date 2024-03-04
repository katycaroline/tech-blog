const express = require('express');
const sequelize = require('./config/connection');
const path = require('path');
const routes = require('./controllers')
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: process.env.SESS_SECRET,
  cookie: {},
  resave: false,
  saveUnitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session(sess));
app.use(routes);
sequelize.sync({ force: false}).then(() => {
  app.listen(PORT, () => console.log(`Now Listening on ${PORT}`));
});