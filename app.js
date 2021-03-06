require("dotenv").config();
const cors = require("cors");
const session = require('express-session');
const cookieParser = require("cookie-parser");

const router = require('./routes/route');
const express = require('express');
const app = express();

app.use(
    session({
        key: 'sid',
        secret: '@mtom',
        resave: false,
        saveUninitialized: true,
        cookie: {
            sameSite: "None",
            httpOnly: true,
            secure: true
        }
    })
)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin: ['http://localhost:3000', 'http://mtom-client.s3-website.ap-northeast-2.amazonaws.com'],
        credentials: true,
        methods: ["GET", "POST", "OPTIONS"],
    })
)
app.use(cookieParser());
app.use('/', router)

const HTTP_PORT = process.env.HTTP_PORT || 4000;

app.listen(HTTP_PORT, () => {
    console.log("server runnning ", HTTP_PORT)
});



module.exports = app;