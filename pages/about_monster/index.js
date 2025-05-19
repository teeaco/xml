import { HeaderComponent } from "../../components/header_msm/index.js";
import { MainPage } from "../main/index.js";
import { ajax } from "../../modules/ajax.js";
import { msmUrls } from "../../modules/msmUrls.js";

export class DetailsPage {
  constructor(parent, id) {
    this.parent = parent;
    this.id = id;
    this.isEditing = false;
    this.currentCard = null;
    this.backupCard = null; 
  }

  render() {
    this.loadCardData();
  }

  loadCardData() {
    ajax.get(msmUrls.getmsmById(this.id), (card_msm, status) => {
      if (status === 200 && card_msm) {
        this.currentCard = card_msm;
        this.backupCard = {...card_msm}; // Сохраняем копию
      } else {
        console.error('Ошибка загрузки карточки:', status);
        this.currentCard = null;
      }
      this.renderCardView();
    });
  }

  renderCardView() {
    this.parent.innerHTML = '';
    
    new HeaderComponent(this.parent).render(() => {
      new MainPage(this.parent).render();
    });

    if (!this.currentCard) {
      this.parent.insertAdjacentHTML('beforeend', `
        <div class="alert alert-danger">Карточка не найдена</div>
      `);
      return;
    }

    this.isEditing ? this.renderEditForm() : this.renderCardDetails();
  }

  renderCardDetails() {
    const { image, name, description, type } = this.currentCard;
    
    this.parent.insertAdjacentHTML('beforeend', `
      <div class="card">
        <img src="${image}" class="card-img-top" style="max-width: 300px; height: auto;">
        <div class="card-body">
          <h2 class="card-title">${name}</h2>
          <p class="card-text">${description}</p>
          <p class="text-muted">Категория: ${type}</p>
          <div class="mt-3">
            <button class="btn btn-primary" id="edit-btn">Редактировать</button>
          </div>
        </div>
      </div>
    `);

    document.getElementById('edit-btn').addEventListener('click', () => {
      this.isEditing = true;
      this.renderCardView();
    });
  }

  renderEditForm() {
    const { image, name, description, type } = this.currentCard;
    
    this.parent.insertAdjacentHTML('beforeend', `
      <div class="card">
        <div class="card-body">
          <form id="edit-form">
            <div class="mb-3">
              <label class="form-label">Изображение (URL)</label>
              <input type="text" class="form-control" id="image-input" value="${image}">
            </div>
            <div class="mb-3">
              <label class="form-label">Название</label>
              <input type="text" class="form-control" id="name-input" value="${name}">
            </div>
            <div class="mb-3">
              <label class="form-label">Описание</label>
              <textarea class="form-control" id="desc-input" rows="3">${description}</textarea>
            </div>
            <div class="mb-3">
              <label class="form-label">Категория</label>
              <input type="text" class="form-control" id="type-input" value="${type}">
            </div>
            <div class="d-flex gap-2">
              <button type="submit" class="btn btn-success">Сохранить</button>
              <button type="button" class="btn btn-secondary" id="cancel-btn">Отмена</button>
            </div>
          </form>
        </div>
      </div>
    `);

    document.getElementById('edit-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveChanges();
    });

    document.getElementById('cancel-btn').addEventListener('click', () => {
      this.isEditing = false;
      this.currentCard = {...this.backupCard}; // Восстанавливаем из резервной копии
      this.renderCardView();
    });
  }

  async saveChanges() {
    const updatedCard = {
      ...this.currentCard,
      image: document.getElementById('image-input').value,
      name: document.getElementById('name-input').value,
      description: document.getElementById('desc-input').value,
      type: document.getElementById('type-input').value
    };

    try {
      ajax.patch(msmUrls.updatemsmById(this.id), updatedCard, (response, status) => {
        if (status === 200 && response) {
          this.currentCard = response;
          this.backupCard = {...response}; 
          this.isEditing = false;
          this.renderCardView();
        }
      });
    } catch (error) {
      console.error('Ошибка при сохранении:', error);
    }
  }

  showNotification(message, type = 'success') {
    const alertClass = type === 'success' ? 'alert-success' : 'alert-danger';
    const notification = document.createElement('div');
    notification.className = `alert ${alertClass} position-fixed top-0 end-0 m-3`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 3000);
  }
}