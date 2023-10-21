import http from "http";

const categories = [
  {
    id: 1,
    name: "Shoes",
  },
  {
    id: 2,
    name: "Clothes",
  },
  {
    id: 3,
    name: "Accessories",
  },
];

const server = http.createServer((req, res) => {
  const URL = req.url;
  if (req.method === "GET" && URL === "/categories") {
    res.statusCode = 200;
    res.end(JSON.stringify(categories));
  } else if (req.method === "GET" && URL.startsWith("/categories/")) {
    const errorMesssage = {
      msg: "The category isn't found"
    }
    const categoryId = URL.split("/")[2];
    const category = categories.find((cat) => cat.id === Number(categoryId));
    if (!category) {
      res.statusCode = 404
      res.end(JSON.stringify(errorMesssage))
      return
    }
    res.statusCode = 200;
    res.end(JSON.stringify(category));
  } else if (req.method === "DELETE" && URL.startsWith("/categories/")) {
    const errorMesssage = {
      msg: "The category you're trying to delete isn't found"
    }
    const categoryId = URL.split("/")[2];
    const foundIndex = categories.findIndex(cat => cat.id === Number(categoryId))
    if (foundIndex === -1) {
      res.statusCode = 404
      res.end(JSON.stringify(errorMesssage))
      return
    }
    categories.splice(foundIndex, 1)
    res.statusCode = 200;
    res.end(JSON.stringify(categories));
  } else if (req.method === "POST" && URL === ("/categories")) {
    let body = ""
    req.on("data", (chunk) => {
      body += chunk
    })

    req.on("end", () => {
      const newCategory = JSON.parse(body)
      const errorMesssage = {
        msg: "The category with the same name already exists"
      }
      const isFound = categories.findIndex(cat => cat.name === newCategory.name)
      if (isFound > 0) {
        res.statusCode = 400
        res.end(JSON.stringify(errorMesssage))
        return
      }
      newCategory.id = categories.length + 1
      categories.push(newCategory)
      res.statusCode = 201
      res.end(JSON.stringify(categories))
    })
  } else if (req.method === "PUT" && URL.startsWith("/categories/")) {
    let body = ""
    req.on("data", (chunk) => {
      body += chunk
    })

    req.on("end", () => {
      const update = JSON.parse(body)
      const errorMesssage = {
        msg: "The category you're trying to update isn't found"
      }
      const categoryId = URL.split("/")[2]
      const foundIndex = categories.findIndex(cat => cat.id === Number(categoryId))
      if (foundIndex === -1) {
        res.statusCode = 404
        res.end(JSON.stringify(errorMesssage))
        return
      }
      categories[foundIndex].name = update.name
      res.statusCode = 200
      res.end(JSON.stringify(categories))
    })
  }

  
});

const PORT = 7007;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
