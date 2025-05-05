import { HeaderComponent } from "../../components/header_msm/index.js";
import { FilterComponent } from "../../components/types_msm/index.js";
import { CardComponent } from "../../components/card_msm/index.js";
import { mockData } from "../../mock_msm/data.js";
import { DetailsPage } from "../about_monster/index.js";
import { DzComponent } from "../../components/dz/index.js"; // Импорт компонента ДЗ
import { 
  sumOfSquares, 
  isEqualObj, 
  collapseRanges, 
  getAnagramsFromText 
} from "../../utils/dz.js"; // Импорт функций ДЗ

export class MainPage {
  constructor(parent) {
    this.parent = parent;
    this.data = [...mockData];
    this.filteredData = [...mockData];
    this.dzComponent = new DzComponent(parent); // Инициализация компонента ДЗ
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

  // ДЗ
  handleSumOfSquares() {
    const times = this.data.map(m => m.breedingTime || 0);
    this.dzComponent.renderSumResult(times, sumOfSquares(times));
  }

  handleCompareMonsters() {
    const [m1, m2] = this.data.slice(0, 2);
    this.dzComponent.renderComparisonResult(m1, m2, isEqualObj(m1, m2));
  }

  handleCollapseRanges() {
    const lengths = this.data.map(m => m.description?.length || 0);
    this.dzComponent.renderRangesResult(lengths, collapseRanges(lengths));
  }

  handleFindAnagrams() {
    const randomMonster = this.data[Math.floor(Math.random() * this.data.length)];
    this.dzComponent.renderAnagramsResult(
      randomMonster.description || "Нет описания",
      getAnagramsFromText(randomMonster.description || "")
    );
  }

renderDzButtons() {
  const container = document.createElement('div');
  container.className = 'dz-buttons-container mt-4 p-3 rounded';

  const buttons = [
    { 
      text: '1.3 Сумма квадратов времени', 
      handler: (btn) => {
        const times = this.data.map(m => m.breedingTime || 0);
        this.dzComponent.renderSumResult(btn, times, sumOfSquares(times));
      }
    },
    { 
      text: '1.7 Сравнить монстров', 
      handler: (btn) => {
        this.dzComponent.renderMonsterComparison(btn, this.data);
      }
    },
    { 
      text: '2.2 Диапазоны уровней', 
      handler: (btn) => {
        const levels = this.data.map(m => m.level || 0);
        this.dzComponent.renderRangesResult(btn, levels, collapseRanges(levels));
      }
    },
    { 
      text: '3.5 Найти анаграммы', 
      handler: (btn) => {
        this.dzComponent.renderAnagramsSearch(btn, this.data);
      }
    }
  ];

  buttons.forEach(btnData => {
    const btn = document.createElement('button');
    btn.className = 'dz-button';
    btn.textContent = btnData.text;
    btn.onclick = () => btnData.handler(btn);
    container.appendChild(btn);
  });

  this.parent.appendChild(container);
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

    // Кнопки ДЗ
    this.renderDzButtons();
  }
}