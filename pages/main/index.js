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
    this.data = [...mockData]; 
    this.filteredData = [...mockData];
  }

  // Новый метод для загрузки данных
  getData() {
    ajax.get(msmUrls.getmsm(), (data) => {
      if (data) {
        this.data = data; 
        this.filteredData = [...data];
        this.renderCards();
      }
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
    const buttonsHTML = `
      <div class="d-flex gap-2 mb-3">
        <button class="btn btn-success add-btn">Создать копию</button>
        <button class="btn btn-primary create-monster-btn">Создать монстра</button>
      </div>
      <div id="cards-container" class="d-flex flex-wrap gap-3"></div>
      
      <!-- Модальное окно -->
      <div class="modal fade" id="createMonsterModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Создание нового монстра</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <form id="monster-form">
                <div class="mb-3">
                  <label class="form-label">Имя монстра</label>
                  <input type="text" class="form-control" id="monster-name" required>
                </div>
                <div class="mb-3">
                  <label class="form-label">Тип</label>
                  <select class="form-select" id="monster-type" required>
                    <option value="Магический">Магический</option>
                    <option value="Природный">Природный</option>
                    <option value="Огненный">Огненный</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label class="form-label">Описание</label>
                  <textarea class="form-control" id="monster-desc" rows="3" required></textarea>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
              <button type="button" class="btn btn-primary" id="confirm-create">Создать</button>
            </div>
          </div>
        </div>
      </div>
    `;
    this.parent.insertAdjacentHTML('beforeend', buttonsHTML);

    // Обработчики
    document.querySelector('.add-btn').addEventListener('click', this.onAddCard_uuduk.bind(this));
    
    document.querySelector('.create-monster-btn').addEventListener('click', () => {
      // модальное окно
      const modal = new bootstrap.Modal(document.getElementById('createMonsterModal'));
      modal.show();
    });

    document.getElementById('confirm-create').addEventListener('click', () => {
      this.createNewMonster();
    });
    this.getData();
  }
  createNewMonster() {
    const name = document.getElementById('monster-name').value;
    const type = document.getElementById('monster-type').value;
    const description = document.getElementById('monster-desc').value;

    if (!name || !description) {
      alert('Заполните все обязательные поля!');
      return;
    }

    const newMonster = {
      name,
      type,
      description,
      image: "Dandidoo.png",
      level: 1,
      breedingTime: 9
    };
    
    ajax.post(msmUrls.createmsm(), newMonster, (createdMonster) => {
      if (createdMonster) {
        // Закрываем окно
        const modal = bootstrap.Modal.getInstance(document.getElementById('createMonsterModal'));
        modal.hide();
        
        // Добавление
        this.data.unshift(createdMonster);
        this.filteredData.unshift(createdMonster);
        this.renderCards();
        
        // Очистка формы
        document.getElementById('monster-form').reset();
      }
    });
  }
}