import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

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

function readFileInDir(file) {
  const __filename = fileURLToPath(import.meta.url);
  const dirname = path.dirname(__filename);
  const filePath = path.join(dirname, file);
  fs.readFile(path.join(filePath), "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data);
  });
}

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

const writeFileInDir = (fileName, content) => {
  const __filename = fileURLToPath(import.meta.url);
  const dirname = path.dirname(__filename);
  const filePath = path.join(dirname, fileName);
  fs.writeFile(filePath, content, "utf8", (err) => {
    if (err) {
      console.error("👀 Error writing to the file: ", err);
    } else {
      console.log(`Content written to ${filePath}`);
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

    case "read":
      readFileInDir(path);
      break;

    case "write":
      if (content) {
        writeFileInDir(path, content);
      } else {
        console.log("Please provide content to write to the file.");
      }
      break;

    default:
      break;
  }
};
