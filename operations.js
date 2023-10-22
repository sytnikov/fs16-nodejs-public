import fs from "fs";

const listAllFiles = (path) => {
  fs.readdir(path, (err, files) => {
    if (err) {
      console.log("👀 Be careful, there's a error");
      return;
    }
    console.log("Files in the directory");
    files.forEach((file) => console.log(file));
  });
};

const deleteFile = (path) => {
  const dirFolder = path.slice(0, 2);
  const fileName = path.slice(2);
  fs.readdir(dirFolder, (err, files) => {
    if (err) {
      console.log("👀 Be careful, there's a error");
      return;
    }
    const fileToDelete = files.find((file) => file === fileName);
    if (fileToDelete) {
      fs.unlink(path, (err) => {
        if (err) {
          console.log("👀 Error happened while deleting the file: ", err);
        } else {
          console.log(`File ${fileName} successfully deleted`);
        }
      });
    } else {
      console.log(`File ${fileName} not found`);
    }
  });
};

export const handleCommand = (command, options) => {
  const [path, content] = options;

  switch (command) {
    case "list":
      listAllFiles(path);
      break;

    case "delete":
      deleteFile(path);
      break;

    default:
      break;
  }
};
