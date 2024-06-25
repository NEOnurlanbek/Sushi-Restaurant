import express from "express";
import path from "path";


/** 1- ENTRANCE **/
const app = express();
console.log("_dirname", __dirname);
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("./uploads"));
app.use(express.urlencoded({extended: true})); // html formatdan kelgan malumotlarga qabul qiladi
app.use(express.json()); 

/** 2- SESSIONS **/

/** 3- VIEWS  **/
app.set('views', path.join(__dirname, "views"));
app.set("view engine", "ejs");
/** 4- ROUTERS **/
