// файл script.js
window.onload = function(){ 

    let a = 0
    let b = ''
    let expressionResult = ''
    let selectedOperation = null
    let accumulator = 0; // Переменная для хранения накопленного результата
    const backgrounds = [
        { type: 'image', value: 'url("Screeanshot_2.png")' }, // Фоновое изображение 1
        { type: 'image', value: 'url("Screeanshot_1.png")' }, // Фоновое изображение 2
    ];
    // окно вывода результата
    outputElement = document.getElementById("result")
    
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
    
    // кнопка очищения
    document.getElementById("btn_op_clear").onclick = function() { 
        a = 0
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
                expressionResult = (+a) + (+b)
                break;
            case '-':
                expressionResult = (+a) - (+b)
                break;
            case '/':
                expressionResult = (+a) / (+b)
                break;
        }
        
        a = expressionResult.toString()
        b = ''
        selectedOperation = null
    
        outputElement.innerHTML = a
    }

    document.getElementById("btn_op_sign").onclick = function() {
        if (!selectedOperation) {
            a = (-a).toString(); // Меняем знак первого числа
            outputElement.innerHTML = a;
        } else {
            b = (-parseFloat(b)).toString(); // Меняем знак второго числа
            outputElement.innerHTML = b;
        }
    }
    document.getElementById("btn_op_percent").onclick = function() {
        if (!selectedOperation) {
            a = (a / 100).toString(); 
            outputElement.innerHTML = a;
        } else{
            b = (b/100).toString();
            outputElement.innerHTML = b;
        }
    }
    document.getElementById("btn_backspace").onclick = function() {
        onBackspaceClicked(); 
    };

    function onBackspaceClicked() {
        if (!selectedOperation) {
            a = a.slice(0, -1); 
            if (a === '') a = '0'; 
            outputElement.innerHTML = a;
            a = 0;
        } else {
            b = b.slice(0, -1); 
            if (b === '') b = '0'; 
            outputElement.innerHTML = b;
            b = 0;
        }
    }

    document.getElementById('btn_theme').addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
    });

    document.getElementById("btn_op_sqrt").onclick = function() {
        if (!selectedOperation) {
            a = Math.sqrt(a).toString(); // Вычисляем квадратный корень первого числа
            outputElement.innerHTML = a;
        } else {
            b = Math.sqrt(b).toString(); // Вычисляем квадратный корень второго числа
            outputElement.innerHTML = b;
        }
    };

    document.getElementById("btn_op_square").onclick = function() {
        if (!selectedOperation) {
            a = Math.pow(a, 2).toString(); // Возводим первое число в квадрат
            outputElement.innerHTML = a;
        } else {
            b = Math.pow(b, 2).toString(); // Возводим второе число в квадрат
            outputElement.innerHTML = b;
        }
    };

    function factorial(n) {
        if (n === 0 || n === 1) return 1;
        else{
            return n * factorial(n - 1);
        }
    }
    
    document.getElementById("btn_op_factorial").onclick = function() {
        if (!selectedOperation) {
            a = factorial(a).toString(); // Вычисляем факториал первого числа
            outputElement.innerHTML = a;
        } else {
            b = factorial(b).toString(); // Вычисляем факториал второго числа
            outputElement.innerHTML = b;
        }
    };
    document.getElementById("btn_triple_zero").onclick = function() {
        if (!selectedOperation) {
            a += '000'; // Добавляем три нуля к первому числу
            outputElement.innerHTML = a;
        } else {
            b += '000'; // Добавляем три нуля ко второму числу
            outputElement.innerHTML = b;
        }
    }
    document.getElementById("btn_change_color").onclick = function(){
        document.result.classList.toggle('color');
    }
    };