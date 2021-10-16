// pripare bootstrap and injection
import { expressInjection } from "./src/plugins";

// pripare express
import express, { Router } from "express";
const app = express();

// inject our plugin
expressInjection(app);

// inject our router
import apiRoute from "./src/routers/api";
const web = Router();
app.use("/", web);
apiRoute(web);

// open express http
app.listen(8000, "0.0.0.0");
console.log(`Running on http://0.0.0.0:8000`);
