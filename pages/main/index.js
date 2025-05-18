import { HeaderComponent } from "../../components/header_msm/index.js";
import { FilterComponent } from "../../components/types_msm/index.js";
import { CardComponent } from "../../components/card_msm/index.js";
import { mockData } from "../../mock_msm/data.js";
import { DetailsPage } from "../about_monster/index.js";
import {ajax} from "../../modules/ajax.js";
import {msmUrls} from "../../modules/msmUrls.js";

export class MainPage {
  constructor(parent) {
    this.parent = parent;
    this.data = [...mockData]; // Инициализация моками
    this.filteredData = [...mockData];
  }

  // Новый метод для загрузки данных
  getData() {
    ajax.get(msmUrls.getmsm(), (data) => {
      if (data) {
        this.data = data; // Обновляем данные с сервера
        this.filteredData = [...data];
        this.renderCards();
        
        // Обновляем фильтр если он уже есть
        if (filterContainer) {
          new FilterComponent(this.parent, this.onFilter_msm_type.bind(this))
            .render(this.getCategories());
        }
      }
    });
  }

  // Остальные методы без изменений
  getCategories() {
    return [...new Set(this.data.map(item => item.type))];
  }

  onCard_msm_Click(id) {
    const detailsPage = new DetailsPage(this.parent, id);
    detailsPage.render();
  }

  onDeleteCard_msm(id) {
    ajax.delete(msmUrls.removemsmById(id), () => {
      this.data = this.data.filter(card => card.id !== id);
      this.filteredData = this.filteredData.filter(card => card.id !== id);
      this.renderCards();
    });
  }

  onFilter_msm_type(type) {
    this.filteredData = type === "all" 
      ? [...this.data] 
      : this.data.filter(card_msm => card_msm.type === type);
    this.renderCards();
  }

  onAddCard_uuduk() {
    if (this.data.length > 0) {
      const firstCard = this.data[0];
      const newCard = {
        ...firstCard,
        id: Date.now(),
        name: `Копия ${firstCard.name}`
      };
      
      ajax.post(msmUrls.createmsm(), newCard, (createdCard) => {
        if (createdCard) {
          this.data.push(createdCard);
          this.filteredData.push(createdCard);
          this.renderCards();
        }
      });
    }
  }


  renderCards() {
    const cardsContainer_msm = document.getElementById('cards-container');
    cardsContainer_msm.innerHTML = '';
    
    this.filteredData.forEach(card_msm => {
      const cardComponent_monster = new CardComponent(cardsContainer_msm, this.onDeleteCard_msm.bind(this));
      cardComponent_monster.render(card_msm, () => this.onCard_msm_Click(card_msm.id));
    });
  }

  render() {
    this.parent.innerHTML = '';
    
    // Хедер
    const header_msm = new HeaderComponent(this.parent);
    header_msm.render(() => {
      const mainPage_msm = new MainPage(this.parent);
      mainPage_msm.render();
    });

    // Фильтр
    const filter_type = new FilterComponent(this.parent, this.onFilter_msm_type.bind(this));
    filter_type.render(this.getCategories());

    // Кнопка добавления 
    const addButtonHTML = `
      <button class="btn btn-success mb-3 add-btn">Добавить карточку</button>
      <div id="cards-container" class="d-flex flex-wrap gap-3"></div>
    `;
    this.parent.insertAdjacentHTML('beforeend', addButtonHTML);

    document.querySelector('.add-btn')
      .addEventListener('click', this.onAddCard_uuduk.bind(this));

    // Загружаем данные с сервера
    this.getData();
  }
}