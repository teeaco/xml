import { HeaderComponent } from "../../components/header_msm/index.js";
import { FilterComponent } from "../../components/types_msm/index.js";
import { CardComponent } from "../../components/card_msm/index.js";
import { DetailsPage } from "../about_monster/index.js";
import { ajax } from "../../modules/ajax.js";
import { msmUrls } from "../../modules/msmUrls.js";

export class MainPage {
  constructor(parent) {
    this.parent = parent;
    this.data = [];
    this.filteredData = [];
  }

  getData() {
    ajax.get(msmUrls.getmsm(), (data) => {
      this.data = data || []; // Сохраняем данные с сервера
      this.filteredData = [...this.data];
      this.renderCards(); // Отрисовываем карточки
    });
  }

  getCategories() {
    return [...new Set(this.data.map(item => item.type))];
  }

  onCard_msm_Click(id) {
    const detailsPage = new DetailsPage(this.parent, id);
    detailsPage.render();
  }

  onDeleteCard_msm(id) {
    ajax.delete(msmUrls.getmsmById(id), () => {
      this.data = this.data.filter(card_msm => card_msm.id !== id);
      this.filteredData = this.filteredData.filter(card_msm => card_msm.id !== id);
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
      const newCard = { 
        ...this.data[0], 
        id: Date.now(),
        name: `New Monster ${Date.now().toString().slice(-4)}`
      };
      
      ajax.post(msmUrls.createmmsm(), newCard, (createdCard) => {
        this.data.push(createdCard);
        this.filteredData.push(createdCard);
        this.renderCards();
      });
    }
  }

  renderCards() {
    const cardsContainer_msm = document.getElementById('cards-container');
    if (!cardsContainer_msm) return;
    
    cardsContainer_msm.innerHTML = '';
    
    this.filteredData.forEach(card_msm => {
      const cardComponent = new CardComponent(cardsContainer_msm, this.onDeleteCard_msm.bind(this));
      cardComponent.render(card_msm, () => this.onCard_msm_Click(card_msm.id));
    });
  }

  render() {
    this.parent.innerHTML = '';
    
    // Хедер
    const header = new HeaderComponent(this.parent);
    header.render(() => {
      const mainPage = new MainPage(this.parent);
      mainPage.render();
    });

    // Фильтр
    const filter = new FilterComponent(this.parent, this.onFilter_msm_type.bind(this));
    filter.render(this.getCategories());

    // Кнопка добавления и контейнер карточек
    const addButtonHTML = `
      <button class="btn btn-success mb-3 add-btn">Добавить карточку</button>
      <div id="cards-container" class="d-flex flex-wrap gap-3"></div>
    `;
    this.parent.insertAdjacentHTML('beforeend', addButtonHTML);

    document.querySelector('.add-btn')
      .addEventListener('click', this.onAddCard_uuduk.bind(this));

    // Загрузка данных
    this.getData();
  }
}