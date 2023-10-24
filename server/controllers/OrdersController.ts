import { IncomingMessage, ServerResponse } from 'http';
import { ordersData } from '../data/ordersData';
import { Order } from '../types/Order';

export class OrdersController {
  async getOrders(req: IncomingMessage, res: ServerResponse) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(ordersData));
  }

  async getSingleOrder(
    req: IncomingMessage,
    res: ServerResponse,
    orderId: number
  ) {
    const singleOrder = ordersData.find((order) => order.id === orderId);

    if (singleOrder) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      console.log(singleOrder);
      res.end(JSON.stringify(singleOrder));
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Order not found');
    }
  }

  async createOrder(req: IncomingMessage, res: ServerResponse) {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const newOrder = JSON.parse(body);
      newOrder.id = ordersData.length + 1;
      ordersData.push(newOrder);
    });
  }

  async updateOrder(
    req: IncomingMessage,
    res: ServerResponse,
    orderId: number
  ) {
    const orderIndex = ordersData.findIndex((order) => order.id === orderId);

    if (!orderIndex) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Order not found' }));
    } else {
      let body = '';

      req.on('data', (chunk) => {
        body += chunk.toString();
      });

      req.on('end', () => {
        const updatedOrder = JSON.parse(body);

        const updateOrder = {
          id: orderId,
          products: updatedOrder.products,
        };

        ordersData.splice(orderIndex, 1, updateOrder);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(updateOrder));
      });
    }
  }

  async deleteASingleOrder(
    req: IncomingMessage,
    res: ServerResponse,
    orderId: number
  ) {
    const singleOrder = ordersData.find((order) => order.id === orderId);

    if (!singleOrder) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Order not found' }));
    } else {
      const index = ordersData.indexOf(singleOrder);
      ordersData.splice(index, 1);
    }
  }
}
