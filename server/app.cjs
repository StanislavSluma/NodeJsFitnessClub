const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const swaggerUi = require('swagger-ui-express');
const passport = require("passport");
const seeder = require("./models/DBInitialize.js");
require('dotenv').config({ path: './.env'});
require('./config/passport');
const swaggerDocument = require('./swagger-output.json');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {}
};

const corsOpt = {
    origin: 'http://localhost:5173',
    credentials: true,
};

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session(sess));
app.use(express.json());
app.use(cookieParser());
app.use('/swagger/index', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(async () => {
    console.log('Connected to MongoDB');
    await seeder.seedDatabase();
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

app.use('/auth', require('./routes/Auth'));
app.use('/client', require('./routes/Client'));
app.use('/instructor', require('./routes/Instructor'));
app.use('/group', require('./routes/Group'));
app.use('/workout', require('./routes/Workout'));
app.use('/coupon', require('./routes/Coupon'));

app.use('/club_card', require('./routes/ClubCard'));
app.use('/hall', require('./routes/Hall'));
app.use('/review', require('./routes/Review'));

app.listen(5000);