import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const usersPath = path.join(__dirname, '../data/users.json');
const readFile = promisify(fs.readFile);

const data = await readFile(usersPath, 'utf8')
    .then(data => {
        return JSON.parse(data);
    })
    .catch(err => console.log(err));

export class UsersController {
    async getUsers(req, res) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
    }

    async getUser(req, res, id) {
        const user = data.find(userId => userId.id === parseInt(id));
        
        if (!user) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found' }));
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(user));
        }
    }

    async createUser(req, res) {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const newUser = JSON.parse(body);
            newUser.id = data.length + 1;
            data.push(newUser);

            fs.writeFile(usersPath, JSON.stringify(data), err => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Error writing file' }));
                } else {
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(newUser));
                }
            });
        });
    }

    async updateUser(req, res, id) {
        const user = data.find(userId => userId.id === parseInt(id));

        if (!user) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found' }));
        } else {
            let body = '';

            req.on('data', chunk => {
                body += chunk.toString();
            });

            req.on('end', () => {
                const { name, email } = JSON.parse(body);
                const updatedUser = {
                    id: user.id,
                    name: name || user.name,
                    email: email || user.email
                };

                const index = data.indexOf(user);

                data.splice(index, 1, updatedUser);

                fs.writeFile(usersPath, JSON.stringify(data), err => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'Error writing file' }));
                    } else {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(updatedUser));
                    }
                });
            });
        }
    }

    async deleteUser(req, res, id) {
        const user = data.find(userId => userId.id === parseInt(id));

        if (!user) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found' }));
        } else {
            const index = data.indexOf(user);

            data.splice(index, 1);

            fs.writeFile(usersPath, JSON.stringify(data), err => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Error writing file' }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: `User ${id} removed` }));
                }
            });
        }
    }
}