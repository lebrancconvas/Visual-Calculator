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

  }

  compute() {

  }

  updateDisplay() {
    this.currentOperandMonitor.innerText = this.currentOperand; 
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
    calculator.appendNumber(button.innerHTML);
    calculator.updateDisplay();
  });
});

