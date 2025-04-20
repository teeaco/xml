import { groupAnagrams } from "../../utils/anagrams.js";

export class AnagramsComponent {
  constructor(parent) {
    this.parent = parent;
  }

  render(words) {
    const groups = groupAnagrams(words);
    const html = groups.length > 0 ? `
        <style>
        .anagrams-box{
            background-color: #3e793f !important;
        }
        </style>
      <div class="anagrams-box mt-3 p-3 bg-light border rounded">
        <h5>Группы анаграмм</h5>
        ${groups.map(group => `
          <div class="mb-2">${group.join(', ')}</div>
        `).join('')}
      </div>
    ` : '';
    this.parent.insertAdjacentHTML('beforeend', html);
  }
}