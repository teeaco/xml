/**
 * Группирует слова по анаграммам
 * @param {string[]} words - массив слов для анализа
 * @returns {string[][]} массив групп анаграмм
 */
export function groupAnagrams(words) {
  
    const groups = new Map();
  
    // Нормализуем слова и группируем
    words.forEach(word => {
      
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