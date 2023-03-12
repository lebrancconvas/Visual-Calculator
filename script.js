class Calculator {
  constructor(previousOperandMonitor, currentOperandMonitor) {
    this.previousOperandMonitor = previousOperandMonitor;
    this.currentOperandMonitor = currentOperandMonitor;
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined; 
  }

  delete() {
    this.currentOperand = this.currentOperand.slice(0, -1);
  }

  appendNumber(number) {
    if(number === '.' && this.currentOperand.includes('.')) return; 
    if(this.currentOperand !== undefined) {
      this.currentOperand = this.currentOperand.toString() + number.toString();
    } else {
      this.currentOperand = number.toString(); 
    }
  }

  chooseOperation(operation) {
    if(this.currentOperand === '') return; 
    if(this.previousOperand !== '') {
      this.compute(); 
    }
    this.operation = operation; 
    this.previousOperand = this.currentOperand;
    this.currentOperand = ''; 
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if(isNaN(prev) || isNaN(current)) return;
    switch(this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '/':
        computation = prev / current;
        break;
      default:
        return; 
    }
    this.currentOperand = computation;
    this.operantion = undefined;
    this.previousOperand = ''; 
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1]; 
    let integerDisplay;
    if(isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
    }
    if(decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay; 
    }
  }

  updateDisplay() {
    this.currentOperandMonitor.innerText = this.getDisplayNumber(this.currentOperand); 
    if(this.previousOperand !== undefined && this.operation !== null) this.previousOperandMonitor.innerText = `${this.previousOperand} ${this.operation}`; 
  }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]'); 
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandMonitor = document.querySelector('[data-previous-operand]');
const currentOperandMonitor = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandMonitor, currentOperandMonitor);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay(); 
  });
});

equalsButton.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
});

allClearButton.addEventListener('click', () => {
  calculator.clear(); 
  calculator.updateDisplay(); 
})
