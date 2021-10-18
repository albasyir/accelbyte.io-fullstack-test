// pripare bootstrap and injection
import { expressInjection } from "./src/plugins";
import middleware from "./src/app/middleware";

// pripare express
import express, { Router } from "express";
const app = express();
app.use(middleware);

// inject our plugin
expressInjection(app);

// inject api router
import apiRoute from "./src/routers/api";
const api = Router();
apiRoute(api);
app.use("/", api);

// inject static router
import assetRoute from "./src/routers/asset";
const asset = Router();
assetRoute(asset);
app.use("/public", asset);

// open express http
app.listen(8000, "0.0.0.0");
console.log(`Running on http://0.0.0.0:8000`);
