import { HeaderComponent } from "../../components/header/index.js";
import { FilterComponent } from "../../components/filter/index.js";
import { CardComponent } from "../../components/card/index.js";
import { mockData } from "../../mock/data.js";
import { DetailsPage } from "../details/index.js";
import { AnagramsComponent } from "../../components/anagrams/index.js";

export class MainPage {
  constructor(parent) {
    this.parent = parent;
    this.data = [...mockData];
    this.filteredData = [...mockData];
  }

  getCategories() {
    return [...new Set(this.data.map(item => item.category))];
  }

  onCardClick(id) {
    const detailsPage = new DetailsPage(this.parent, id);
    detailsPage.render();
  }

  onDeleteCard(id) {
    this.data = this.data.filter(card => card.id !== id);
    this.filteredData = this.filteredData.filter(card => card.id !== id);
    this.renderCards();
  }

  onFilter(category) {
    this.filteredData = category === "all" 
      ? [...this.data] 
      : this.data.filter(item => item.category === category);
    this.renderCards();
  }

  onAddCard() {
    if (this.data.length > 0) {
      const newCard = { ...this.data[0], id: Date.now() };
      this.data.push(newCard);
      this.filteredData.push(newCard);
      this.renderCards();
    }
  }

  renderCards() {
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = '';
    
    this.filteredData.forEach(card => {
      const cardComponent = new CardComponent(cardsContainer, this.onDeleteCard.bind(this));
      cardComponent.render(card, () => this.onCardClick(card.id));
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
    const filter = new FilterComponent(this.parent, this.onFilter.bind(this));
    filter.render(this.getCategories());

    // Кнопка добавления
    const addButtonHTML = `
      <style> 
            .btn-success{
              background-color: #ffc500 !important;
            }
            .btn-info{
              background-color: #ff97fa !important;
            }
      </style>
      <button class="btn btn-success mb-3 add-btn">Добавить карточку</button>
      <div id="cards-container" class="d-flex flex-wrap gap-3"></div>
    `;
    this.parent.insertAdjacentHTML('beforeend', addButtonHTML);

    document.querySelector('.add-btn')
      .addEventListener('click', this.onAddCard.bind(this));

    // Карточки
    this.renderCards();

    
    const anagramsBtn = document.createElement('button');
    anagramsBtn.className = 'btn btn-info mb-3 mt-3';
    anagramsBtn.textContent = 'Показать анаграммы';
    anagramsBtn.onclick = () => {
      const words = ['стол', 'листок', 'слот', 'кот', 'ток'];
      new AnagramsComponent(this.parent).render(words);
    };
    this.parent.appendChild(anagramsBtn);
  }
}