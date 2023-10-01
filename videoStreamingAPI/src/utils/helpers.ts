import fs from "fs";

export const generateUniqueSessionID = () => {
    return Date.now().toString();
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