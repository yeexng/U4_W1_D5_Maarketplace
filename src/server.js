import Express from "express";
import listEndpoints from "express-list-endpoints";
import filesRouter from "./api/files/index.js";
import productsRouter from "./api/products/index.js";
import {
  badRequestHandler,
  genericErrorHandler,
  notfoundHandler,
  unauthorizedHandler,
} from "./errosHandler.js";

const server = Express();
const port = 3005;
server.use(Express.json());

server.use("/products", productsRouter);
server.use("/products", filesRouter);

//Errors
server.use(badRequestHandler);
server.use(unauthorizedHandler);
server.use(notfoundHandler);
server.use(genericErrorHandler);

server.listen(port, () => {
  console.table(listEndpoints(server));
  console.log(`Server on port ${port}`);
});
