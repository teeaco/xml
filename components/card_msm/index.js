export class CardComponent {
  constructor(parent, onDelete) {
    this.parent = parent;
    this.onDelete = onDelete;
  }

  render(char_msm, onClick) {
    const msmHTML = `
      <div class="card mb-3" style="width: 18rem;">
        <img src="${char_msm.image}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${char_msm.name}</h5>
          <p class="card-text">${char_msm.description}</p>
          <p class="text-muted">${char_msm.type}</p>
          <button class="btn btn-custom-prime details-btn" data-id="${char_msm.id}">Подробнее</button>
          <button class="btn btn-custom-del delete-btn" data-id="${char_msm.id}">Удалить</button>
        </div>
      </div>
    `;
    this.parent.insertAdjacentHTML('beforeend', msmHTML);

    // Обработчики событий
    document.querySelector(`.details-btn[data-id="${char_msm.id}"]`)
      .addEventListener('click', onClick);
      
    document.querySelector(`.delete-btn[data-id="${char_msm.id}"]`)
      .addEventListener('click', () => this.onDelete(char_msm.id));
  }
}