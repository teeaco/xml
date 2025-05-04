export class CardComponent {
  constructor(parent, onDelete) {
    this.parent = parent;
    this.onDelete = onDelete;
  }

  render(card_msm, onClick) {
    const cardHTML = `
      <div class="card mb-3" style="width: 18rem;">
        <img src="${card_msm.image}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${card_msm.name}</h5>
          <p class="card-text">${card_msm.description}</p>
          <p class="text-muted">${card_msm.type}</p>
          <button class="btn btn-custom-prime details-btn" data-id="${card_msm.id}">Подробнее</button>
          <button class="btn btn-custom-del delete-btn" data-id="${card_msm.id}">Удалить</button>
        </div>
      </div>
    `;
    this.parent.insertAdjacentHTML('beforeend', cardHTML);

    // Обработчики событий
    document.querySelector(`.details-btn[data-id="${card_msm.id}"]`)
      .addEventListener('click', onClick);
      
    document.querySelector(`.delete-btn[data-id="${card_msm.id}"]`)
      .addEventListener('click', () => this.onDelete(card_msm.id));
  }
}