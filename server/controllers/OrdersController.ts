import { IncomingMessage, ServerResponse } from 'http';
import { ordersData } from '../data/ordersData';

export class OrdersController {
  async getOrders(req: IncomingMessage, res: ServerResponse) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(ordersData));
  }
}
