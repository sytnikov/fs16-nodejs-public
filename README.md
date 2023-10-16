# Node.js assignment

## Assignment 1

### Basic server

Build a basic http server where you would have:

- On-memory data (Hard coded array/json of products)
- 5 different endpoints
  - GET `/items`
  - GET `/items/{itemId}`
  - POST `/items`
  - Delete `/items/{itemId}`
  - PUT `/items/{itemId}`
- Convert it to TypeScript

### Serve \*.html files

- Serve two different \*.html files
  - Home page
  - 404 page
- Serve `*.css` and `*.js` files with the home.html and 404.html

## Assignment 2

You will create a Node.js command-line utility that interacts with the file system to perform various operations.

Your Node.js script should accept command-line arguments to determine the operation to be performed. The available operations should include:

- List files in a directory
- Read the content of a specified file
- Write content to a specified file
- Delete a file

Commands should be as the following:

```shell
node main.js list ./   // List files in the current directory

node main.js read ./file.txt   // Read the content of file.txt

node main.js write ./file.txt "New content"   // Write content to file.txt

node main.js delete ./file.txt   // Delete file.txt
```
