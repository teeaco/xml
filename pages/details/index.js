import { HeaderComponent } from "../../components/header/index.js";
import { mockData } from "../../mock/data.js";
import { MainPage } from "../main/index.js";

export class DetailsPage {
  constructor(parent, id) {
    this.parent = parent;
    this.id = id;
  }

  render() {
    const card = mockData.find(item => item.id === this.id);
    
    this.parent.innerHTML = '';
    
    // Хедер
    const header = new HeaderComponent(this.parent);
    header.render(() => {
      const mainPage = new MainPage(this.parent);
      mainPage.render();
    });

    // Детали карточки
    if (card) {
      this.parent.insertAdjacentHTML('beforeend', `
        <style> 
            .card {
            background-color: #2d1f3e;
              display: flex;
              flex-direction: column;
              height: 100%;
              color: #ffffff;
            }
        </style>
        <div class="card">
          <img src="${card.image}" class="card-img-top" style="max-width: 300px; height: auto;">
          <div class="card-body">
            <h2 class="card-title">${card.title}</h2>
            <p class="card-text">${card.description}</p>
            <p class="text-muted">Категория: ${card.category}</p>
          </div>
        </div>
      `);
    } else {
      this.parent.insertAdjacentHTML('beforeend', `
        <div class="alert alert-danger">Карточка не найдена</div>
      `);
    }
  }
}