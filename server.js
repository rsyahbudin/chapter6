require('dotenv').config();

const express = require('express');
const session = require('express-session');

const gameRouter = require('./domains/games/routes');
const dashboardRouter = require('./domains/dashboard/routes');
const userRouter = require('./domains/users/routes');
const roomRouter = require('./domains/rooms/routes');
const playerRouter = require('./domains/players/routes');
const passport = require('./utils/passport');

const PORT = process.env.PORT;

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('public/static'));

app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 60000,
    },
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(dashboardRouter);
app.use(gameRouter);
app.use(userRouter);
app.use(roomRouter);
app.use(playerRouter);

app.listen(PORT, function() {
    console.log(`server listening on port: ${PORT}`);
});