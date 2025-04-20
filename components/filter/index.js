export class FilterComponent {
    constructor(parent, onFilter) {
      this.parent = parent;
      this.onFilter = onFilter;
    }
  
    render(categories) {
      const filterHTML = `
        <div class="mb-3">
          <select class="form-select filter-select">
            <option value="all">Все категории</option>
            ${categories.map(cat => 
              `<option value="${cat}">${cat}</option>`
            ).join('')}
          </select>
        </div>
      `;
      this.parent.insertAdjacentHTML('beforeend', filterHTML);
  
      document.querySelector('.filter-select')
        .addEventListener('change', (e) => this.onFilter(e.target.value));
    }
  }