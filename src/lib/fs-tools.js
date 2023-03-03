import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
const { readJSON, writeJSON, writeFile } = fs;

//=>C:\Users\xuan\Desktop\FS 05-22\Unit 3\Build_Week_3_LinkedIn_Build_\U4_W1_D5_Maarketplace\src\data
const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data");

//productsJSONPath & Functions
const productsJSONPath = join(dataFolderPath, "products.json");
export const getProducts = () => readJSON(productsJSONPath);
export const writeProducts = (productsArray) =>
  writeJSON(productsJSONPath, productsArray);
