// файл script.js

window.onload = function(){ 

    let a = ''
    let b = ''
    let expressionResult = ''
    let selectedOperation = null
    let n = 0;
  

    // окно вывода результата
    outputElement = document.getElementById("result")

    const originalBackground = document.body.style.background;


    
    // список объектов кнопок циферблата (id которых начинается с btn_digit_)
    digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')
    
    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) { 
                a += digit
            }
            outputElement.innerHTML = a
        } else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) { 
                b += digit
                outputElement.innerHTML = b        
            }
        }
    }
    
    // устанавка колбек-функций на кнопки циферблата по событию нажатия
    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML
            onDigitButtonClicked(digitValue)
        }
    });
    
    // установка колбек-функций для кнопок операций
    document.getElementById("btn_op_mult").onclick = function() { 
        if (a === '') return
        selectedOperation = 'x'
    }
    
    document.getElementById("btn_op_plus").onclick = function() { 
        if (a === '') return
        selectedOperation = '+'
    }
    document.getElementById("btn_op_minus").onclick = function() { 
        if (a === '') return
        selectedOperation = '-'
    }

    document.getElementById("btn_op_div").onclick = function() { 
        if (a === '') return
        selectedOperation = '/'
    }

       // Смена знака (+/-)
    document.getElementById("btn_op_sign").onclick = function() {
        if (a === '') return; // Если число не введено, ничего не делаем

        // Меняем знак числа
        a = (-parseFloat(a)).toString();

        // Обновляем отображение
        outputElement.innerHTML = a;
    };

    document.getElementById("btn_op_percent").onclick = function() {
        if (a === '') return; // Если число не введено, ничего не делаем

        a = (+a) / 100;
      
        outputElement.innerHTML = a;
    };


    document.getElementById("btn_op_degree").onclick = function() {
        if (a === '') return; // Если число не введено, ничего не делаем

        a = (+a) * (+a) ;


        outputElement.innerHTML = a;
    };

    

// Шрифт
document.getElementById('font').onchange = function () {
    const selectedFont = this.value; 
    document.body.style.fontFamily = selectedFont; 
};


  // Кнопка смены цвета фона
  document.getElementById("btn_change_color").onclick = function() {
    const colors = ['#A8E6CF', '#FF8B94', '#D4A5A5', '#6C5B7B', '#FAD089']; 
    const randomColor = colors[Math.floor(Math.random() * colors.length)]; 
    document.body.style.background = randomColor; 
};

let currentIndex = 0;

document.getElementById("btn_theme").onclick = function() {
    const colors2 = [
        originalBackground, 
        body.style.background.dark-theme 
    ];
    document.body.style.background = colors2[currentIndex];

    currentIndex = (currentIndex + 1) % colors2.length;
};
  




document.getElementById('btn_theme').addEventListener('click', function() {
    const currentTheme = document.body.className;


    document.body.style.background = '';


    if (currentTheme === 'light-theme') {
        document.body.className = 'dark-theme';
    } else {
        document.body.className = 'light-theme';
    }
}
);


//окна вывода результата
const resultElement = document.getElementById("result");

const colorClasses = [
  "result-color-1",
  "result-color-2",
];

let currentColorIndex = 0; 


document.getElementById("btn_change_result_color").onclick = function () {
 
  resultElement.classList.remove(colorClasses[currentColorIndex]);

  
  currentColorIndex = (currentColorIndex + 1) % colorClasses.length;

  // Добавляем новый класс цвета
  resultElement.classList.add(colorClasses[currentColorIndex]);
};







// Квадратный корень
document.getElementById("btn_op_sqrt").onclick = function() {
    if (a === '') return; // Если число не введено, ничего не делаем

    const number = parseFloat(a); // Преобразуем строку в число

    
    if (number >= 0) {
        a = Math.sqrt(number).toString(); 
    } else {
        alert("Нельзя извлечь корень из отрицательного числа!"); 
        return;
    }
    outputElement.innerHTML = a;
};


// Факториал
document.getElementById("btn_op_factorial").onclick = function() {
    if (a === '') return;

    const number = parseFloat(a);

    if (number < 0 || !Number.isInteger(number)) {
        alert("Ошибка: факториал определен только для неотрицательных целых чисел!");
        return;
    }

    let result = 1;
    for (let i = 1; i <= number; i++) {
        result *= i;
    }

    a = result.toString();
    outputElement.innerHTML = a;
};


// cos
document.getElementById('btn_op_cos').onclick = function () {
    if (a === '') return; // Если число не введено, ничего не делаем

    const number = parseFloat(a); // Преобразуем строку в число
    const radian = number * (Math.PI / 180); // градусы -> радианы
    const cosValue = Math.cos(radian); 

    a = cosValue.toString(); 
    outputElement.innerHTML = a; 
};


// sin
document.getElementById('btn_op_sin').onclick = function () {
    if (a === '') return; // Если число не введено, ничего не делаем

    const number = parseFloat(a); // Преобразуем строку в число
    const radian = number * (Math.PI / 180); // градусы -> радианы
    const sinValue = Math.sin(radian); 
    a = sinValue.toString(); 
    outputElement.innerHTML = a; 
};

//  Backspace
document.getElementById('btn_op_backspace').onclick = function () {
    if (!selectedOperation) {
        // Если операция не выбрана, стираем символ из числа a
        if (a.length > 0) {
            a = a.slice(0, -1); // Удаляем последний символ
            outputElement.innerHTML = a || '0'; // Если строка пустая, выводим 0
        }
    } else {
        // Если операция выбрана, стираем символ из числа b
        if (b.length > 0) {
            b = b.slice(0, -1); // Удаляем последний символ
            outputElement.innerHTML = b || '0'; // Если строка пустая, выводим 0
        }
    }
};



    
    // кнопка очищения
    document.getElementById("btn_op_clear").onclick = function() { 
        a = ''
        b = ''
        selectedOperation = ''
        expressionResult = ''

       
       
 
        outputElement.innerHTML = 0
    }
    





    
    // кнопка расчёта результата
    document.getElementById("btn_op_equal").onclick = function() { 
        if (a === '' || b === '' || !selectedOperation)
            return
            switch(selectedOperation) { 
                case 'x':
                    expressionResult = (+a) * (+b)
                    break;
                case '+':
                    expressionResult =  (+a) + (+b); 
                    break;
                case '-':
                    expressionResult = (+a) - (+b);
                    break;
                case '/':
                    expressionResult = (+a) / (+b)
                    break;
                    
            }


        a = expressionResult.toString()
    
        outputElement.innerHTML = a
    }
    };