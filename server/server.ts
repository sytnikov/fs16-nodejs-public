import http, { IncomingMessage, ServerResponse } from "http";
import fs from "fs"

import { UsersController } from "./controllers/UsersController";
import { CategoriesController } from "./controllers/CategoriesController";
import { ProductsController } from "./controllers/ProductsController";
import { OrdersController } from './controllers/OrdersController';

const sendFileContent = (res: any, fileName: string, contentType: string) => {
  fs.readFile(fileName, (err, data) => {
    if (err) {
      res.writeHead(404)
      res.write("File not found")
      return
    }
    res.writeHead(200, {"Content-Type": contentType})
    res.write(data)
    res.end()
  })
}

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    const URL: string | undefined = req.url;
    if (!URL) {
        res.statusCode = 400;
        res.end("Bad Request");
        return;
    }
    const usersController = new UsersController();
    const categoriesController = new CategoriesController();
    const productsController = new ProductsController();
    const ordersController = new OrdersController();

    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Server is running' }));
    }
    else if (req.url === '/api/users' && req.method === 'GET') {
      usersController.getUsers(req, res);
    } else if (req.url === '/api/orders' && req.method === 'GET') {
      ordersController.getOrders(req, res);
    } else if (
      req.url?.match(/\/api\/users\/([0-9]+)/) &&
      req.method === 'GET'
    ) {
      const id = req.url.split('/')[3];
      usersController.getUser(req, res, Number(id));
    } else if (req.url === '/api/users' && req.method === 'POST') {
      usersController.createUser(req, res);
    } else if (
      req.url?.match(/\/api\/users\/([0-9]+)/) &&
      req.method === 'PUT'
    ) {
      const id = req.url.split('/')[3];
      usersController.updateUser(req, res, Number(id));
    } else if (
      req.url?.match(/\/api\/users\/([0-9]+)/) &&
      req.method === 'DELETE'
    ) {
      const id = req.url.split('/')[3];
      usersController.deleteUser(req, res, Number(id));
    } else if (req.url === '/api/categories' && req.method === 'GET') {
      categoriesController.getCategories(req, res);
    } else if (
      req.url?.match(/\/api\/categories\/([0-9]+)/) &&
      req.method === 'GET'
    ) {
      const id = req.url.split('/')[3];
      categoriesController.getCategory(req, res, Number(id));
    } else if (req.url === '/api/categories' && req.method === 'POST') {
      categoriesController.createCategory(req, res);
    } else if (
      req.url?.match(/\/api\/categories\/([0-9]+)/) &&
      req.method === 'PUT'
    ) {
      const id = req.url.split('/')[3];
      categoriesController.updateCategory(req, res, Number(id));
    } else if (
      req.url?.match(/\/api\/categories\/([0-9]+)/) &&
      req.method === 'DELETE'
    ) {
      const id = req.url.split('/')[3];
      categoriesController.deleteCategory(req, res, Number(id));
    } else if (req.url === '/api/products' && req.method === 'GET') {
      productsController.getProducts(req, res);
    } else if (
      req.url?.match(/\/api\/products\/([0-9]+)/) &&
      req.method === 'GET'
    ) {
      const id = req.url.split('/')[3];
      productsController.getProduct(req, res, Number(id));
    } else if (req.url === '/api/products' && req.method === 'POST') {
      productsController.createProduct(req, res);
    } else if (
      req.url?.match(/\/api\/products\/([0-9]+)/) &&
      req.method === 'PUT'
    ) {
      const id = req.url.split('/')[3];
      productsController.updateProduct(req, res, Number(id));
    } else if (
      req.url?.match(/\/api\/products\/([0-9]+)/) &&
      req.method === 'DELETE'
    ) {
      const id = req.url.split('/')[3];
      productsController.deleteProduct(req, res, Number(id));
    } else if (req.method === 'GET' && URL === '/home') {
      sendFileContent(res, './client/home.html', 'text/html');
    } else if (req.method === 'GET' && URL === '/404') {
      sendFileContent(res, './client/error.html', 'text/html');
    } else if (req.method === 'GET' && URL === '/styles.css') {
      sendFileContent(res, 'client/styles.css', 'text/css');
    } else if (req.method === 'GET' && URL === '/script.js') {
      sendFileContent(res, './client/script.js', 'text/javascript');
    } else if (req.method === 'GET' && URL === '/favicon.ico') {
      sendFileContent(res, './client/favicon.ico', 'image/x-icon');
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Route not found' }));
    }
});

const PORT = process.env.PORT || 8000;
console.log('PORT:', PORT)
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));