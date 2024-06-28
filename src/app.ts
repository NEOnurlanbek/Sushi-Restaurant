import cors from "cors";
import express from 'express';
import path from 'path';
import router from "./router";
import routerAdmin from "./router-admin";
import morgan from "morgan";
import cookieParser from 'cookie-parser';
import { MORGAN_FORMAT } from './libs/config';

import session from 'express-session';
import ConnectMongoDB from 'connect-mongodb-session';
import { T } from './libs/types/common';
const MongoDBStore = ConnectMongoDB(session);
const store = new MongoDBStore({
    uri: String(process.env.MONGO_URL),
    collection: "sessions",
  });
/** 1- ENTRANCE **/
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("./uploads"));
app.use(express.urlencoded({extended: true})); // html formatdan kelgan malumotlarga qabul qiladi
app.use(express.json()); //
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser()); // hosil qilgan tokkenimizni brauzerni cookisiga saxranit qilishga
app.use(morgan(MORGAN_FORMAT));

/** 2- SESSIONS **/
app.use(
    session({
        secret:String(process.env.SESSION_SECRET), // => secretni .env filedan olyapmiz
  cookie: {
    maxAge: 1000 * 3600* 6, // 6 soat => cookini qancha vaqt saqlanishini belgilaymiz
  },
  store: store, //=> store ga biz yuqorida yasagan mongoDB dagi sessions collectionini beryapmiz.
  resave: true,    // => cookimiz 6 soat mobaynida saqlanar edi agar "resave : true " bolsa shu oraliqda user kirgan bolsa kirgan vaqtidan yana 6 soat hisob lanadi. folse bolsa ozgarmasdan birinchi kirgan vaqtidan hisoblanadi
  saveUninitialized: true
    })
);
app.use(function(req, res, next){
  const sessionInstance = req.session as T;
  res.locals.member = sessionInstance.member;
  next();
})
/** 3- VIEWS  **/
app.set('views', path.join(__dirname, "views"));
app.set("view engine", "ejs");
/** 4- ROUTERS **/
app.use("/admin", routerAdmin); // BSSR: EJS
app.use("/", router);          // SPA: REACT

export default app;