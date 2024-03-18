// Impede que qualquer letra seja inserido no input
const dayInput = document.getElementById('day');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');

dayInput.addEventListener('keypress', onlyNumbers);
monthInput.addEventListener('keypress', onlyNumbers);
yearInput.addEventListener('keypress', onlyNumbers);

function onlyNumbers (event) {
    const key = event.key;
    if (isNaN(key)) {
        event.preventDefault();
    }
}

// Limitando o numero de caracteres permitidos no input de dia e mês
dayInput.addEventListener('input', limitInput);
monthInput.addEventListener('input', limitInput);

function limitInput(event) {
    const input = event.target;
    const maxLength = 2;
     
    if (input.value.length > maxLength) {
        input.value = input.value.slice(0, maxLength);
    }
}

// Limitando o numero de caracteres permitidos no input de ano
yearInput.addEventListener('input', limitYearInput);
function limitYearInput (event) {
    const yearInput = event.target
    const yearMaxLength = 4;

    if (yearInput.value.length > yearMaxLength) {
        yearInput.value = yearInput.value.slice(0, yearMaxLength)
    }
}

// Não permite que o usuario utilize um ano maior que o ano atual
const currentYear = new Date().getFullYear();
const yearErrorMessage = document.getElementById('year-error-message');
const submitButton = document.getElementById('submit-button');

yearInput.addEventListener('input', currentYearValidation);

function currentYearValidation() {
    const yearInputValue = parseInt(yearInput.value);
    if (yearInputValue > currentYear) {
        yearErrorMessage.style.display = 'block';
        yearInput.style.borderColor = 'red';
        ageCalculatorContainer.style.height = '580px';
        submitButton.style.display = 'none';
    } else {
        yearErrorMessage.style.display = 'none';
        yearInput.style.borderColor = '';
        submitButton.style.display = 'block';
    }
}


// Limitação de dias e meses
const dayLimitErrorMessage = document.getElementById('day-limit-error-message');
const monthLimitErrorMessage = document.getElementById('month-limit-error-message');
dayInput.addEventListener('input', validateDayInput);
monthInput.addEventListener('input', validateMonthInput);

function validateDayInput() {
    const dayValue = parseInt(dayInput.value);

    if (dayValue > 31) {
        dayLimitErrorMessage.style.display = 'block';
        ageCalculatorContainer.style.height = '580px';
        submitButton.style.display = 'none';
    } else {
        dayLimitErrorMessage.style.display = 'none';
        submitButton.style.display = 'block';
    }
}

function validateMonthInput() {
    const monthValue = parseInt(monthInput.value);

    if (monthValue > 12) {
        monthLimitErrorMessage.style.display = 'block';
        ageCalculatorContainer.style.height = '580px';
        submitButton.style.display = 'none';
    } else {
        monthLimitErrorMessage.style.display = 'none';
    }
}

// Validação do mês de fevereiro
const errorMessage = document.getElementById('error-message');
const ageCalculatorContainer = document.getElementById('age-calculator-container');

dayInput.addEventListener('input', validateDate);
monthInput.addEventListener('input', validateDate);

function validateDate () {
    const day = parseInt(dayInput.value);
    const month = parseInt(monthInput.value);

    if (month === 2 && day > 29) {
        errorMessage.style.display = 'block';
        dayInput.style.borderColor = 'red';
        ageCalculatorContainer.style.height = '580px';
        submitButton.style.display = 'none';
    } else {
        errorMessage.style.display = 'none';
        dayInput.style.borderColor = '';
        submitButton.style.display = '';
    }
}

// Enviar os dados e calcular
function calcularIdade() {
    const dia = parseInt(document.getElementById('day').value);
    const mes = parseInt(document.getElementById('month').value);
    const ano = parseInt(document.getElementById('year').value);

    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();
    const mesAtual = dataAtual.getMonth() + 1;
    const diaAtual = dataAtual.getDate();

    let anos = anoAtual - ano;
    let meses = mesAtual - mes;
    let dias = diaAtual - dia;

    if (meses < 0 || (meses === 0 && dias < 0)) {
        anos--;
        meses += 12;
    }

    if (dias < 0) {
        const ultimoDiaDoMes = new Date(anoAtual, mesAtual - 1, 0).getDate();
        dias += ultimoDiaDoMes;
        meses--;
    }

    document.querySelector('.age-calculator-result-container .age-calculator-result:nth-child(1) .age-calculator-result-number').textContent = anos;
    document.querySelector('.age-calculator-result-container .age-calculator-result:nth-child(2) .age-calculator-result-number').textContent = meses;
    document.querySelector('.age-calculator-result-container .age-calculator-result:nth-child(3) .age-calculator-result-number').textContent = dias;
}

    document.getElementById('submit-button').addEventListener('click', calcularIdade);
