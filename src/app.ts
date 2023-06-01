// write express hello world example in typescript
import * as express from "express";
import restaurantsRouter from "./restaurants/restaurants.route";
import * as cors from "cors";
((): void => {
  class Server {
    public app: express.Application;
    constructor() {
      const app: express.Application = express();
      this.app = app;
    }

    private setRoute(): void {
      this.app.use(restaurantsRouter);
    }
    private setMiddleware(): void {
      //* cors middleware
      this.app.use(cors());

      //* logging middleware
      this.app.use(
        (
          req: express.Request,
          res: express.Response,
          next: express.NextFunction
        ) => {
          console.log("[Logging Middleware]:");
          console.log(`요청 Client: ${req.rawHeaders[5]}`);
          console.log("요청 URL: ", req.url);
          console.log("요청 METHOD: ", req.method);
          console.log("요청 BODY: ", req.body ?? "no body");
          console.log("요청 PARAMS: ", req.params);
          console.log("요청 QUERY: ", req.query);
          console.log("요청 Clinet IP: ", req.ip);
          next();
        }
      );
      //* JSON middleware
      this.app.use(express.json());

      //* cats router middleware
      this.setRoute();

      //* 404 middleware
      this.app.use((req: express.Request, res: express.Response) => {
        console.log("this is error middleware");
        res.send({ error: "404 not found" });
      });
    }

    public listen(): void {
      const port: number = 8000;
      this.setMiddleware();
      this.app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
      });
    }
  }

  const init = (): void => {
    const server = new Server();
    server.listen();
  };

  init();
})();
