const mongoose = require("mongoose");
const {NOTES_APP_MONGO_USER, NOTES_APP_MONGO_PASSWORD,NOTES_APP_MONGO_NAME} = process.env;

const User = NOTES_APP_MONGO_USER;
const password = NOTES_APP_MONGO_PASSWORD;
const name = NOTES_APP_MONGO_NAME;
const MONGO_URL = `mongodb+srv://${User}:${password}@cluster0.hkmygve.mongodb.net/${name}?retryWrites=true&w=majority`;

mongoose.connect(MONGO_URL, {
    UseNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(db => console.log('LA BASE DE DATOS SE CONECTO'))
.catch(err => console.error(err));
