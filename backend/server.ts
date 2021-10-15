// pripare bootstrap and injection
import { expressInjection } from "./src/plugins";

// pripare express
import express, { Router } from "express";
const app = express();

// inject our plugin
expressInjection(app);

// inject our router
import webRoute from "./src/routers/web";
const web = Router();
app.use("/", web);
webRoute(web);

// open express http
app.listen(8000, "0.0.0.0");
console.log(`Running on http://0.0.0.0:8000`);
