import Express from "express";
import listEndpoints from "express-list-endpoints";
import filesRouter from "./api/files/index.js";
import productsRouter from "./api/products/index.js";

const server = Express();
const port = 3005;
server.use(Express.json());

server.use("/products", productsRouter);
server.use("/products", filesRouter);

server.listen(port, () => {
  console.table(listEndpoints(server));
  console.log(`Server on port ${port}`);
});
