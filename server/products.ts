import http, { IncomingMessage, ServerResponse } from "http";
import { productsData } from "./data/productsData";
import { productSchema } from "./schemas/productSchema";
import { categoriesData } from "./data/categoriesData";

const PORT = 3005;

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const URL = req.url;
    // Delete product
    if (URL?.startsWith("/products/") && req.method === "DELETE") {
      const id = URL.split("/")[2];
      const index = productsData.findIndex((item) => item.id === +id);
      if (index === -1) {
        res.statusCode = 404;
        res.end("Product is not found");
        return;
      }
      productsData.splice(index, 1);
      res.end(JSON.stringify(productsData));
      // Get all products
    } else if (URL === "/products" && req.method === "GET") {
      if (productsData.length === 0) {
        res.statusCode = 404;
        res.end("Products are not found");
        return;
      }
      res.statusCode = 200;
      res.end(JSON.stringify(productsData));
      // Get  product by id
    } else if (URL?.startsWith("/products/") && req.method === "GET") {
      const id = URL.split("/")[2];
      const item = productsData.find((i) => i.id === +id);
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
          const isExistCategory = productsData.find(
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
          const category = categoriesData.find((i) => i.id === newItem.categoryId);
          newItem.id = productsData.length + 1;
          delete newItem.categoryId;
          newItem.category = category;
          productsData.push(newItem);
          res.statusCode = 201;
          res.end(JSON.stringify(productsData));
        });
      //  Update product
    } else if (URL?.startsWith("/products/") && req.method === "PUT") {
      const id = URL.split("/")[2];
      const foundIndex = productsData.findIndex((i) => i.id === +id);
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
          productsData[foundIndex] = newItem;
          newItem.id = +id;
          res.statusCode = 200;
          res.end(JSON.stringify(productsData));
        });
      // Sort by price
    } else if (URL?.startsWith("/products?") && req.method === "GET") {
      const sortParam = URL.split("?")[1];
      if (sortParam === "sort=asc") {
        productsData.sort((a, b) => a.price - b.price);
      } else if (sortParam === "sort=desc") {
        productsData.sort((a, b) => b.price - a.price);
      }
      res.end(JSON.stringify(productsData));
      // Get all products
    } else if (URL?.startsWith("/products") && req.method === "GET") {
      res.end(JSON.stringify(productsData));
    }
  }
);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
