import { IncomingMessage, ServerResponse } from 'http';
import { usersData } from '../data/usersData';

export class UsersController {
    async getUsers(req: IncomingMessage, res: ServerResponse) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(usersData));
    }

    async getUser(req: IncomingMessage, res: ServerResponse, id: number) {
        const user = usersData.find(userId => userId.id === Number(id));
        
        if (!user) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found' }));
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(user));
        }
    }

    async createUser(req: IncomingMessage, res: ServerResponse) {
        let body = '';

        req.on('usersData', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const newUser = JSON.parse(body);
            newUser.id = usersData.length + 1;
            usersData.push(newUser);
        });
    }

    async updateUser(req: IncomingMessage, res: ServerResponse, id: Number) {
        const user = usersData.find(userId => userId.id === Number(id));

        if (!user) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found' }));
        } else {
            let body = '';

            req.on('usersData', chunk => {
                body += chunk.toString();
            });

            req.on('end', () => {
                const { name, email, password, role } = JSON.parse(body);
                const updatedUser = {
                    id: user.id,
                    name: name || user.name,
                    email: email || user.email,
                    password: password || user.password,
                    role: role || user.role
                };

                const index = usersData.indexOf(user);
                usersData.splice(index, 1, updatedUser);

            });
        }
    }

    async deleteUser(req: IncomingMessage, res: ServerResponse, id: Number) {
        const user = usersData.find(userId => userId.id === Number(id));

        if (!user) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found' }));
        } else {
            const index = usersData.indexOf(user);
            usersData.splice(index, 1);
        }
    }
}