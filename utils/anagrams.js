/**
 * Группирует слова по анаграммам
 * @param {string[]} words - массив слов для анализа
 * @returns {string[][]} массив групп анаграмм
 */
export function groupAnagrams(words) {
    if (!Array.isArray(words)) {
      console.error('Ожидался массив слов, получено:', words);
      return [];
    }
  
    const groups = new Map();
  
    // Нормализуем слова и группируем
    words.forEach(word => {
      if (typeof word !== 'string') {
        console.warn('Пропущено не строковое значение:', word);
        return;
      }
      
      const normalized = word.toLowerCase().trim();
      if (!normalized) return;
      
      const key = [...normalized].sort().join('');
      
      if (!groups.has(key)) {
        groups.set(key, []);
      }
      groups.get(key).push(normalized);
    });
  
    // Фильтруем и сортируем результат
    return Array.from(groups.values())
      .filter(group => group.length >= 2)
      .map(group => [...new Set(group)].sort())
      .sort((a, b) => a[0].localeCompare(b[0]));
  }