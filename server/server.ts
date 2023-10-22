import http, { IncomingMessage, ServerResponse } from "http";

import { UsersController } from "./controllers/UsersController";
import { CategoriesController } from "./controllers/CategoriesController";
import { ProductsController } from "./controllers/ProductsController";

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

    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Server is running' }));
    }
    else if (req.url === '/api/users' && req.method === 'GET') {
        usersController.getUsers(req, res);
    } else if (req.url?.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET') {
        const id = req.url.split('/')[3];
        usersController.getUser(req, res, Number(id));
    } else if (req.url === '/api/users' && req.method === 'POST') {
        usersController.createUser(req, res);
    } else if (req.url?.match(/\/api\/users\/([0-9]+)/) && req.method === 'PUT') {
        const id = req.url.split('/')[3];
        usersController.updateUser(req, res, Number(id));
    } else if (req.url?.match(/\/api\/users\/([0-9]+)/) && req.method === 'DELETE') {
        const id = req.url.split('/')[3];
        usersController.deleteUser(req, res, Number(id));
    } else if (req.url === '/api/categories' && req.method === 'GET') {
        categoriesController.getCategories(req, res);
    } else if (req.url?.match(/\/api\/categories\/([0-9]+)/) && req.method === 'GET') {
        const id = req.url.split('/')[3];
        categoriesController.getCategory(req, res, Number(id));
    } else if (req.url === '/api/categories' && req.method === 'POST') {
        categoriesController.createCategory(req, res);
    } else if (req.url?.match(/\/api\/categories\/([0-9]+)/) && req.method === 'PUT') {
        const id = req.url.split('/')[3];
        categoriesController.updateCategory(req, res, Number(id));
    } else if (req.url?.match(/\/api\/categories\/([0-9]+)/) && req.method === 'DELETE') {
        const id = req.url.split('/')[3];
        categoriesController.deleteCategory(req, res, Number(id));
    } else if (req.url === '/api/products' && req.method === 'GET') {
        productsController.getProducts(req, res);
    } else if (req.url?.match(/\/api\/products\/([0-9]+)/) && req.method === 'GET') {
        const id = req.url.split('/')[3];
        productsController.getProduct(req, res, Number(id));
    } else if (req.url === '/api/products' && req.method === 'POST') {
        productsController.createProduct(req, res);
    } else if (req.url?.match(/\/api\/products\/([0-9]+)/) && req.method === 'PUT') {
        const id = req.url.split('/')[3];
        productsController.updateProduct(req, res, Number(id));
    } else if (req.url?.match(/\/api\/products\/([0-9]+)/) && req.method === 'DELETE') {
        const id = req.url.split('/')[3];
        productsController.deleteProduct(req, res, Number(id));
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));