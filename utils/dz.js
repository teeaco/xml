// utils/dz.js
/**
 * 1.3 Сумма квадратов
 */
export function sumOfSquares(arr) {
  return arr.reduce((sum, num) => sum + num * num, 0);
}

/**
 * 1.7 Сравнение объектов
 */
export function isEqualObj(obj1, obj2) {
  // Сравниваем только breedingTime
  return obj1.breedingTime === obj2.breedingTime;
}

/**
 * 2.2 Диапазоны
 */
export function collapseRanges(nums) {
  if (nums.length === 0) return '';
  
  nums = [...new Set(nums)].sort((a, b) => a - b);
  const ranges = [];
  let start = nums[0];
  
  for (let i = 1; i <= nums.length; i++) {
    if (nums[i] === nums[i-1] + 1) continue;
    
    ranges.push(start === nums[i-1] ? `${start}` : `${start}-${nums[i-1]}`);
    start = nums[i];
  }
  
  return ranges.join(',');
}

/**
 * Анаграммы
 */
export function getAnagramsFromText(text) {
  if (!text || typeof text !== 'string') return [];
  
  // Улучшенное разбиение на слова
  const words = text
      .toLowerCase()
      .match(/[\wа-яё]{3,}/gi) || []; // Берем слова из 3+ букв (с поддержкой кириллицы)
  
  const groups = new Map();

  words.forEach(word => {
      // Нормализуем слово (удаляем повторяющиеся буквы для анаграмм)
      const key = [...word].sort().join('');
      
      if (!groups.has(key)) {
          groups.set(key, new Set());
      }
      groups.get(key).add(word);
  });

  // Фильтруем только настоящие анаграммы (где несколько вариантов)
  return Array.from(groups.values())
      .filter(group => group.size > 1)
      .map(group => [...group].sort())
      .sort((a, b) => a[0].localeCompare(b[0]));
}