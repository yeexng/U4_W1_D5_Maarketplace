import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
const { readJSON, writeJSON, writeFile } = fs;

//=>C:\Users\xuan\Desktop\FS 05-22\Unit 3\Build_Week_3_LinkedIn_Build_\U4_W1_D5_Maarketplace\src\data
const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data");

//productsJSONPath & Functions
///Users/xuanng/Desktop/Epicode/U4_W1_D5_Maarketplace/src/data/products.json
const productsJSONPath = join(dataFolderPath, "products.json");
export const getProducts = () => readJSON(productsJSONPath);
export const writeProducts = (productsArray) =>
  writeJSON(productsJSONPath, productsArray);
console.log(productsJSONPath);

//Products Review
const productsReviewJSONPath = join(dataFolderPath, "review.json");
export const getProductsReview = () => readJSON(productsReviewJSONPath);
export const writeProductsReview = (productsReviewArray) =>
  writeJSON(productsReviewJSONPath, productsReviewArray);

//Image Folder
//C:\Users\xuan\Desktop\FS 05-22\Unit 3\Build_Week_3_LinkedIn_Build_\U4_W1_D5_Maarketplace\public\img\products
const productPublicFolderPath = join(process.cwd(), "./public/img/products");
// console.log(productPublicFolderPath);

//Image Upload
export const saveProductImage = (fileName, fileContentAsBuffer) =>
  writeFile(join(productPublicFolderPath, fileName), fileContentAsBuffer);
