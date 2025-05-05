// components/dz/index.js
import { getAnagramsFromText } from '../../utils/dz.js';
import { isEqualObj } from '../../utils/dz.js';
export class DzComponent {
  constructor(parent) {
    this.parent = parent;
    this.currentResult = null;
    this.activeButton = null;
  }

  clearResults() {
    if (this.currentResult) {
      this.currentResult.remove();
      this.currentResult = null;
    }
  }

  toggleResult(button, contentGenerator) {
    if (this.activeButton === button) {
      this.clearResults();
      this.activeButton = null;
      button.classList.remove('active');
    } else {
      this.clearResults();
      this.currentResult = document.createElement('div');
      this.currentResult.className = 'dz-result';
      contentGenerator(this.currentResult);
      this.parent.appendChild(this.currentResult);
      this.activeButton = button;
      button.classList.add('active');
    }
  }

  // 1.3 Сумма квадратов
  renderSumResult(button, times, sum) {
    this.toggleResult(button, (container) => {
      container.innerHTML = `
        <h5>Сумма квадратов времени выведения</h5>
        <div>Времена: [${times.join(', ')}]</div>
        <div class="dz-value">Результат: ${sum}</div>
      `;
    });
  }

  // 1.7 Сравнение объектов
  renderMonsterComparison(button, monsters) {
    this.toggleResult(button, (container) => {
      container.innerHTML = `
        <h5>Сравнение монстров</h5>
        <div class="row mb-3">
          <div class="col-md-5">
            <select class="form-control dz-monster-select mb-2">
              ${monsters.map(m => `<option value="${m.id}">${m.name} (${m.breedingTime}ч)</option>`).join('')}
            </select>
          </div>
          <div class="col-md-2 text-center">
            <button class="btn dz-button compare-now-btn">Сравнить!</button>
          </div>
          <div class="col-md-5">
            <select class="form-control dz-monster-select mb-2">
              ${monsters.map(m => `<option value="${m.id}">${m.name} (${m.breedingTime}ч)</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="dz-comparison-result" id="comparison-result"></div>
      `;

      const compareBtn = container.querySelector('.compare-now-btn');
      compareBtn.onclick = () => {
        const selects = container.querySelectorAll('.dz-monster-select');
        const m1 = monsters.find(m => m.id == selects[0].value);
        const m2 = monsters.find(m => m.id == selects[1].value);
        
        const isEqual = isEqualObj(m1, m2);
        const resultDiv = document.getElementById('comparison-result');
        resultDiv.innerHTML = `
          <div class="dz-comparison">
            <div>
              <h6>${m1.name}</h6>
              <div>Время: ${m1.breedingTime}ч</div>
            </div>
            <div class="dz-comparison-operator">
              ${isEqual ? '==' : '!='}
            </div>
            <div>
              <h6>${m2.name}</h6>
              <div>Время: ${m2.breedingTime}ч</div>
            </div>
          </div>
          <div class="alert ${isEqual ? 'alert-success' : 'alert-danger'} mt-3">
             ${isEqual ? 'True' : 'False'}
          </div>
        `;
      };
    });
  }

  // 2.2 Диапазоны уровней
  renderRangesResult(button, numbers, ranges) {
    this.toggleResult(button, (container) => {
      container.innerHTML = `
        <h5>Диапазоны уровней монстров</h5>
        <div>Уровни: [${numbers.join(', ')}]</div>
        <div class="dz-value">Диапазоны: ${ranges}</div>
      `;
    });
  }

  // Анаграммы
  renderAnagramsSearch(button, monsters) {
    this.toggleResult(button, (container) => {
        // Создаем уникальный ID для контейнера результатов
        const resultId = 'anagrams-result-' + Date.now();
        
        container.innerHTML = `
            <div class="anagrams-ui">
                <h5>Поиск анаграмм в описании</h5>
                <select class="form-control dz-monster-select mb-3">
                    ${monsters.map(m => `
                        <option value="${m.id}" data-description="${m.description || ''}">
                            ${m.name}
                        </option>
                    `).join('')}
                </select>
                <button class="btn button-primary find-now-btn">Найти анаграммы!</button>
                <div class="anagrams-result" id="${resultId}"></div>
            </div>
        `;

        const findBtn = container.querySelector('.find-now-btn');
        findBtn.onclick = () => {
            const select = container.querySelector('.dz-monster-select');
            const selectedOption = select.options[select.selectedIndex];
            const description = selectedOption.getAttribute('data-description') || "";
            const monsterName = selectedOption.text;
            
            // Получаем анаграммы
            const groups = getAnagramsFromText(description);
            const resultDiv = document.getElementById(resultId);
            
            if (groups.length > 0) {
                resultDiv.innerHTML = `
                    <div class="anagrams-found">
                        <h6>Найденные анаграммы в описании "${monsterName}":</h6>
                        <ul class="dz-groups">
                            ${groups.map(group => `
                                <li>${group.join(', ')}</li>
                            `).join('')}
                        </ul>
                    </div>
                `;
            } else {
                resultDiv.innerHTML = `
                    <div class="dz-no-anagrams">
                        В описании "${monsterName}" не найдено анаграмм
                    </div>
                `;
            }
        };
    });
}
}