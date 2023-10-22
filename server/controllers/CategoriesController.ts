import { IncomingMessage, ServerResponse } from "http";
import { categoriesData } from "../data/categoriesData";

export class CategoriesController {
  async getCategories(req: IncomingMessage, res: ServerResponse) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(categoriesData));
  }

  async getCategory(req: IncomingMessage, res: ServerResponse, id: number) {
    const category = categoriesData.find((cat) => cat.id === Number(id));

    if (!category) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Category not found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(category));
    }
  }

  async createCategory(req: IncomingMessage, res: ServerResponse) {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const newCategory = JSON.parse(body);
      newCategory.id = categoriesData.length + 1;
      categoriesData.push(newCategory);
    });
  }

  async updateCategory(
    req: IncomingMessage,
    res: ServerResponse,
    id: Number
  ) {
    const category = categoriesData.find((cat) => cat.id === Number(id));

    if (!category) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Category not found" }));
    } else {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        const { name, image } = JSON.parse(body);
        const updatedCategory = {
          id: category.id,
          name: name || category.name,
          image: image || category.image,
        };

        const index = categoriesData.indexOf(category);
        categoriesData.splice(index, 1, updatedCategory);
      });
    }
  }

  async deleteCategory(req: IncomingMessage, res: ServerResponse, id: Number) {
    const category = categoriesData.find((cat) => cat.id === Number(id));

    if (!category) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Category not found" }));
    } else {
      const index = categoriesData.indexOf(category);
      categoriesData.splice(index, 1);
    }
  }
}


// import http, { IncomingMessage, ServerResponse } from "http";
// import {categoriesData} from "../data/categoriesData";

// const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
//   const URL: string | undefined = req.url;
//   if (!URL) {
//     res.statusCode = 400;
//     res.end("Bad Request");
//     return;
//   }

//   if (req.method === "GET" && URL === "/categories") {
//     res.statusCode = 200;
//     res.end(JSON.stringify(categoriesData));
//   } else if (req.method === "GET" && URL.startsWith("/categories/")) {
//     const errorMesssage = {
//       msg: "The category isn't found",
//     };
//     const categoryId = URL.split("/")[2];
//     const category = categoriesData.find((cat) => cat.id === Number(categoryId));
//     if (!category) {
//       res.statusCode = 404;
//       res.end(JSON.stringify(errorMesssage));
//       return;
//     }
//     res.statusCode = 200;
//     res.end(JSON.stringify(category));
//   } else if (req.method === "DELETE" && URL.startsWith("/categories/")) {
//     const errorMesssage = {
//       msg: "The category you're trying to delete isn't found",
//     };
//     const categoryId = URL.split("/")[2];
//     const foundIndex = categoriesData.findIndex(
//       (cat) => cat.id === Number(categoryId)
//     );
//     if (foundIndex === -1) {
//       res.statusCode = 404;
//       res.end(JSON.stringify(errorMesssage));
//       return;
//     }
//     categoriesData.splice(foundIndex, 1);
//     res.statusCode = 200;
//     res.end(JSON.stringify(categoriesData));
//   } else if (req.method === "POST" && URL === "/categories") {
//     let body = "";
//     req.on("data", (chunk) => {
//       body += chunk;
//     });

//     req.on("end", () => {
//       const newCategory = JSON.parse(body);
//       const errorMesssage = {
//         msg: "The category with the same name already exists",
//       };
//       const isFound = categoriesData.findIndex(
//         (cat) => cat.name === newCategory.name
//       );
//       if (isFound > 0) {
//         res.statusCode = 400;
//         res.end(JSON.stringify(errorMesssage));
//         return;
//       }
//       newCategory.id = categoriesData.length + 1;
//       categoriesData.push(newCategory);
//       res.statusCode = 201;
//       res.end(JSON.stringify(categoriesData));
//     });
//   } else if (req.method === "PUT" && URL.startsWith("/categories/")) {
//     let body = "";
//     req.on("data", (chunk) => {
//       body += chunk;
//     });

//     req.on("end", () => {
//       const update = JSON.parse(body);
//       const errorMesssage = {
//         msg: "The category you're trying to update isn't found",
//       };
//       const categoryId = URL.split("/")[2];
//       const foundIndex = categoriesData.findIndex(
//         (cat) => cat.id === Number(categoryId)
//       );
//       if (foundIndex === -1) {
//         res.statusCode = 404;
//         res.end(JSON.stringify(errorMesssage));
//         return;
//       }
//       categoriesData[foundIndex].name = update.name;
//       res.statusCode = 200;
//       res.end(JSON.stringify(categoriesData));
//     });
//   }
// });

// const PORT = 7007;
// server.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
