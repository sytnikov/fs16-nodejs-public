import { IncomingMessage, ServerResponse } from "http";
import { productsData } from "../data/productsData";

export class ProductsController {
  async getProducts(req: IncomingMessage, res: ServerResponse) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(productsData));
  }

  async getProduct(req: IncomingMessage, res: ServerResponse, id: number) {
    const product = productsData.find((prod) => prod.id === Number(id));

    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product not found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(product));
    }
  }

  async createProduct(req: IncomingMessage, res: ServerResponse) {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const newProduct = JSON.parse(body);
      newProduct.id = productsData.length + 1;
      productsData.push(newProduct);
    });
  }

  async updateProduct(req: IncomingMessage, res: ServerResponse, id: Number) {
    const product = productsData.find((prod) => prod.id === Number(id));

    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product not found" }));
    } else {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        const { name, price, category } = JSON.parse(body);
        const updatedProduct = {
          id: product.id,
          name: name || product.name,
          price: price || product.price,
          category: category.id || product.category.id,
        };

        const index = productsData.indexOf(product);
        productsData.splice(index, 1, updatedProduct);
      });
    }
  }

  async deleteProduct(req: IncomingMessage, res: ServerResponse, id: Number) {
    const product = productsData.find((prod) => prod.id === Number(id));

    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product not found" }));
    } else {
      const index = productsData.indexOf(product);
      productsData.splice(index, 1);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `Product ${id} removed` }));
    }
  }
}