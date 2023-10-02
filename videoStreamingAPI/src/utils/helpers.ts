import fs from "fs";

export const generateSessionId = () => {
    return `${Math.random()}` + Date.now().toString();
  };
  
export const deleteFile = (filePath: string) => {
    fs.unlink(filePath, (err: any) => {
      if (err) {
        console.error(`Error deleting file: ${err}`);
      } else {
        console.log(`Deleted file: ${filePath}`);
      }
    });
  };