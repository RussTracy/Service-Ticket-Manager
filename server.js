const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');

// Setup PORT
const app = express();
const PORT = process.env.PORT || 3001;

// Setup sequelize with the database connection
const sequelize = require("./config/connection");

// Create web session
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: process.env.SESSION_SECRET,
    // cookie: { expires: 10 * 60 * 1000 },
    cookie: { },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({ db: sequelize })
};
app.use(session(sess));

// Setup handlebars with helpers
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

sequelize.sync({ force: false })
    .then(() => {
        app.listen(PORT, () => console.log('Now listening'));
});