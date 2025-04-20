export class CardComponent {
  constructor(parent, onDelete) {
    this.parent = parent;
    this.onDelete = onDelete;
  }

  render(card, onClick) {
    const cardHTML = `
      <div class="card mb-3" style="width: 18rem;">
        <img src="${card.image}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${card.title}</h5>
          <p class="card-text">${card.description}</p>
          <p class="text-muted">${card.category}</p>
          <style>
            /* Обрезка текста с многоточием */
            .card-text {
              display: -webkit-box;
              -webkit-line-clamp: 3;  /* Ограничение в 3 строки */
              -webkit-box-orient: vertical;
              overflow: hidden;
              text-overflow: ellipsis;
              min-height: 60px;  /* Фиксированная высота для 3 строк */
            }
                /* Фиксируем кнопки внизу карточки */
            .card {
            background-color: #2d1f3e;
              display: flex;
              flex-direction: column;
              height: 100%;
              color: #ffffff;
            }
            /* Локальная перезапись */
            .btn-custom-del {
              background-color: #ffc500 !important;
            }
            .btn-custom-prime {
              background-color: #ff97fa !important;
            }
          </style>
          <button class="btn btn-custom-prime details-btn" data-id="${card.id}">Подробнее</button>
          <button class="btn btn-custom-del delete-btn" data-id="${card.id}">Удалить</button>
        </div>
      </div>
    `;
    this.parent.insertAdjacentHTML('beforeend', cardHTML);

    // Обработчики событий
    document.querySelector(`.details-btn[data-id="${card.id}"]`)
      .addEventListener('click', onClick);
      
    document.querySelector(`.delete-btn[data-id="${card.id}"]`)
      .addEventListener('click', () => this.onDelete(card.id));
  }
}