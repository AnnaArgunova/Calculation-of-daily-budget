'use strict';

let start1 = document.getElementById('start'),
    budgetValue = document.getElementsByClassName('budget-value')[0],
    daybudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalexpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthsavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearsavingsValue = document.getElementsByClassName('yearsavings-value')[0],
    
    expensesItem = document.getElementsByClassName('expenses-item'),
    expensesItemBtn = document.getElementsByTagName('button')[0],
    optionalexpensesBtn = document.getElementsByTagName('button')[1],
    countBudgetBtn = document.getElementsByTagName('button')[2],
    optionalexpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    chooseIncome = document.querySelector('.choose-income'),
    checkSavings = document.querySelector('#savings'),
    sumValue = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');
    

let money, time;

expensesItemBtn.disabled = true;
optionalexpensesBtn.disabled = true;
countBudgetBtn.disabled = true;

    start1.addEventListener('click', function() {
        time = prompt('Введите дату в формате YYYY-MM-DD', '');
        money = +prompt("Ваш бюджет на месяц?", '');
    
        while (isNaN(money) || money == '' || money == null) {
            money = prompt("Ваш бюджет?", "");
        }
        appData.budgetMonth = money;
        appData.timeData = time;
        budgetValue.textContent = money.toFixed();
        yearValue.value = new Date(Date.parse(time)).getFullYear();
        monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
        dayValue.value = new Date(Date.parse(time)).getDate();

        expensesItemBtn.disabled = false;
        optionalexpensesBtn.disabled = false;
        countBudgetBtn.disabled = false;
});

expensesItemBtn.addEventListener('click', function() {
    let sum = 0;
    for(let i = 0; i < expensesItem.length; i++){
        let article = expensesItem[i].value;
        let howMuch = expensesItem[++i].value;  
       
        if((typeof(article))==='string' && typeof(article) != null && typeof(howMuch) != null
        && article != '' && howMuch != '' && article.length < 50){
            console.log("done");
    
        appData.expenses[article] = howMuch;
        sum += +howMuch;
        }else {
            i = i - 1;
        }
    }
    expensesValue.textContent = sum;
});

optionalexpensesBtn.addEventListener('click', function() {
    for (let i = 0; i < optionalexpensesItem.length; i++) {
		let opt = optionalexpensesItem[i].value;
        appData.optionalExpenses[i] = opt;
        optionalexpensesValue.textContent += appData.optionalExpenses[i] + ' ';
	
          }

});


countBudgetBtn.addEventListener('click', function() {
    
    if(appData.budgetMonth != undefined) {
        appData.budgetDay = ((appData.budgetMonth - +expensesValue.textContent) / 30).toFixed();
        daybudgetValue.textContent = appData.budgetDay;
    
        if(appData.budgetDay < 100){
            levelValue.textContent = 'Минимальный уровень достатка.';
        } else if (appData.budgetDay > 100 && appData.budgetDay < 2000){
            levelValue.textContent = 'Средний уровень достатка';
        } else if(appData.budgetDay > 2000){
            levelValue.textContent = 'Высокий уровень достатка';
        } else {
            levelValue.textContent = 'Ошибка';
        }    
    }else{
        daybudgetValue.textContent = 'Произошла ошибка'
    }
    
    
});

chooseIncome.addEventListener('input', function() {
    let items = chooseIncome.value;
    appData.incom = items.split(', ');
    incomeValue.textContent = appData.incom;
    
});

checkSavings.addEventListener("click", () => {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

sumValue.addEventListener('input', () => {
    if (appData.savings == true) {
        let sum = +sumValue.value;
        let percent = +percentValue.value;
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;
        monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

percentValue.addEventListener('input', () => {
    if (appData.savings == true) {
        let sum = +sumValue.value;
        let percent = +percentValue.value;
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;
        monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});
let appData = {
    budgetMonth: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
	incom: [],
	savings: false,
};






