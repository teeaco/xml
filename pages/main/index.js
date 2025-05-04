import { HeaderComponent } from "../../components/header_msm/index.js";
import { FilterComponent } from "../../components/types_msm/index.js";
import { CardComponent } from "../../components/card_msm/index.js";
import { mockData } from "../../mock_msm/data.js";
import { DetailsPage } from "../about_monster/index.js";

export class MainPage {
  constructor(parent) {
    this.parent = parent;
    this.data = [...mockData];
    this.filteredData = [...mockData];
  }

  getCategories() {
    return [...new Set(this.data.map(item => item.type))];
  }

  onCard_msm_Click(id) {
    const detailsPage = new DetailsPage(this.parent, id);
    detailsPage.render();
  }

  onDeleteCard_msm(id) {
    this.data = this.data.filter(card_msm => card_msm.id !== id);
    this.filteredData = this.filteredData.filter(card_msm => card_msm.id !== id);
    this.renderCards();
  }

  onFilter_msm_type(type) {
    this.filteredData = type === "all" 
      ? [...this.data] 
      : this.data.filter(card_msm => card_msm.type === type);
    this.renderCards();
  }

  onAddCard_uuduk() {
    if (this.data.length > 0) {
      const newCard_uuduk = { ...this.data[0], id: Date.now() };
      this.data.push(newCard_uuduk);
      this.filteredData.push(newCard_uuduk);
      this.renderCards();
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

    // Карточки
    this.renderCards();
  }
}