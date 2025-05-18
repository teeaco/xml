import { MainPage } from "./pages/main/index.js";

const root = document.getElementById('root');
const mainPage = new MainPage(root);
mainPage.render();
console.log("Тест: скрипт подключен!"); // Должно появиться в консоли