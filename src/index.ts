import express from 'express';
import {router} from './router/router'
import bodyParser from 'body-parser';
import fileUpload from "express-fileupload";
import mongoose from 'mongoose';
// import session from "express-session";

const app = express();
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/quanly_banhang').then(()=>{
    console.log('connect database Success')
})
app.set('views','./src/views');

app.set('view engine', 'ejs');
app.use(fileUpload({
    createParentPath: true
}));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('./public'));
// app.use(session({
//     resave: true,
//     saveUninitialized: true,
//     secret: 'Ning',
//     cookie: { maxAge: 60000 }}));
app.use('',router)
app.listen(8080, () => {
    console.log('sever is running')
})