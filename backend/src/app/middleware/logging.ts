import { Request, Response, NextFunction } from "express";

export default function (req: Request, res: Response, next: NextFunction) {
  let start = new Date().getMilliseconds();

  next();

  let end = new Date().getMilliseconds();
  let speed = end - start;
  let msg = `[router]: ${req.method} ${req.url} . ${speed} ms`;

  if (speed > 800) {
    console.warn("\x1b[33m%s\x1b[0m", msg);
  } else {
    console.log(msg);
  }
}
