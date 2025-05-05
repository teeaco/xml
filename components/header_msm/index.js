export class HeaderComponent{
constructor(parent) {
  this.parent = parent;
}

render(onHomeClick) {
  const headerHTML = `
    <nav class="navbar navbar-expand-lg mb-4">
      <div class="container-fluid">
        <button class="btn btn-outline-primar home-btn me-2">
          <i class="bi bi-house-door"></i> Домой
        </button>
        <span class="navbar-brand mx-auto">My Singing Monsters</span>

        <!-- Пустой блок справа для баланса -->
        <div style="width: 40px"></div>
      </div>
    </nav>
  `;
  this.parent.insertAdjacentHTML('afterbegin', headerHTML);
  
  document.querySelector('.home-btn')
    .addEventListener('click', onHomeClick);
}
}
