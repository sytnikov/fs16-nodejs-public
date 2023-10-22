import http, { IncomingMessage, ServerResponse } from "http";
import { products } from "./data/products";
import { productSchema } from "./schemas/productSchema";
import { categories } from "./data/categories";

const PORT = 3005;

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const URL = req.url;
    // Delete product
    if (URL?.startsWith("/products/") && req.method === "DELETE") {
      const id = URL.split("/")[2];
      const index = products.findIndex((item) => item.id === +id);
      if (index === -1) {
        res.statusCode = 404;
        res.end("Product is not found");
        return;
      }
      products.splice(index, 1);
      res.end(JSON.stringify(products));
      // Get all products
    } else if (URL === "/products" && req.method === "GET") {
      if (products.length === 0) {
        res.statusCode = 404;
        res.end("Products are not found");
        return;
      }
      res.statusCode = 200;
      res.end(JSON.stringify(products));
      // Get  product by id
    } else if (URL?.startsWith("/products/") && req.method === "GET") {
      const id = URL.split("/")[2];
      const item = products.find((i) => i.id === +id);
      if (!item) {
        res.statusCode = 404;
        res.end("Product is not found");
        return;
      }
      res.end(JSON.stringify(item));
      // Create  product
    } else if (URL === "/products" && req.method === "POST") {
      let body = "";
      req
        .on("data", (chunk) => {
          body += chunk;
        })
        .on("end", () => {
          const newItem = JSON.parse(body);
          const { error } = productSchema.validate(newItem);
          const isExistCategory = products.find(
            (i) => i.id === newItem.categoryId
          );
          if (!isExistCategory) {
            res.statusCode = 404;
            res.end("Category not found, please provide a correct category id");
            return;
          }
          if (error) {
            res.statusCode = 400;
            res.end(error.details[0].message);
            return;
          }
          const category = categories.find((i) => i.id === newItem.categoryId);
          newItem.id = products.length + 1;
          delete newItem.categoryId;
          newItem.category = category;
          products.push(newItem);
          res.statusCode = 201;
          res.end(JSON.stringify(products));
        });
      //  Update product
    } else if (URL?.startsWith("/products/") && req.method === "PUT") {
      const id = URL.split("/")[2];
      const foundIndex = products.findIndex((i) => i.id === +id);
      if (foundIndex === -1) {
        res.statusCode = 404;
        res.end("Item is not found");
        return;
      }
      let body = "";
      req
        .on("data", (chunk) => {
          body += chunk;
        })
        .on("end", () => {
          const newItem = JSON.parse(body);
          const { error } = productSchema.validate(newItem);
          if (error) {
            res.statusCode = 400;
            res.end(error.details[0].message);
            return;
          }
          products[foundIndex] = newItem;
          newItem.id = +id;
          res.statusCode = 200;
          res.end(JSON.stringify(products));
        });
      // Sort by price
    } else if (URL?.startsWith("/products?") && req.method === "GET") {
      const sortParam = URL.split("?")[1];
      if (sortParam === "sort=asc") {
        products.sort((a, b) => a.price - b.price);
      } else if (sortParam === "sort=desc") {
        products.sort((a, b) => b.price - a.price);
      }
      res.end(JSON.stringify(products));
      // Get all products
    } else if (URL?.startsWith("/products") && req.method === "GET") {
      res.end(JSON.stringify(products));
    }
  }
);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
