import { HeaderComponent } from "../../components/header_msm/index.js";
import { mockData } from "../../mock_msm/data.js";
import { MainPage } from "../main/index.js";
import {ajax} from "../../modules/ajax.js";
import {msmUrls} from "../../modules/msmUrls.js";

export class DetailsPage {
  constructor(parent, id) {
    this.parent = parent;
    this.id = id;
  }

  render() {
    const card_msm = mockData.find(monster => monster.id === this.id);
    
    this.parent.innerHTML = '';
    
    // Хедер
    const header = new HeaderComponent(this.parent);
    header.render(() => {
      const mainPage = new MainPage(this.parent);
      mainPage.render();
    });

    // Детали карточки
    if (card_msm) {
      this.parent.insertAdjacentHTML('beforeend', `
        <div class="card">
          <img src="${card_msm.image}" class="card-img-top" style="max-width: 300px; height: auto;">
          <div class="card-body">
            <h2 class="card-title">${card_msm.name}</h2>
            <p class="card-text">${card_msm.description}</p>
            <p class="text-muted">Категория: ${card_msm.type}</p>
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