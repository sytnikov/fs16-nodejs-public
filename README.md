# Node.js assignment

## Back-end squad (Group 1)

- Shtanko Yaroslav
- Md Shayemur Rahman
- Amjad Shakhshir
- Alexey Sytnikov

## Basic server and serving the files

The basic http server for products, categories and users is built.

For each entity there different endpoints such as:
  - GET `/items`
  - GET `/items/{itemId}`
  - POST `/items`
  - Delete `/items/{itemId}`
  - PUT `/items/{itemId}`

All the code is TypeScript based.

Two `.html` files are served: home.html and error.html

There are also `*.css` and `*.js` files are served with these pages.

## Comand-line utilities

There are 4 Node.js command-line utilities created:

- list files in a directory
- read the content of a specified file
- write content to a specified file
- Delete a file

Here are the examples of the commands:

```shell
node main.js list ./   // List files in the current directory

node main.js read ./file.txt   // Read the content of file.txt

node main.js write ./file.txt "New content"   // Write content to file.txt

node main.js delete ./file.txt   // Delete file.txt
```
