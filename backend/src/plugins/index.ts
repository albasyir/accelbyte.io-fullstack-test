import cors from "./cors";
import bodyParser from "./body-parser";
import multer from "./multer";

/**
 * Global plugin registration
 *
 */

import { Express } from "express";
/**
 * Add your express plugin as code reflection
 *
 * @param server
 */
export function expressInjection(server: Express) {
  server.use(cors);
  server.use(bodyParser);
  server.use(multer);
}
