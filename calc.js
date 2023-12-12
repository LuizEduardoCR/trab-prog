//seleciona os elementos para retornar valores

const previousOperationText = document.querySelector("#previous-operation"); //declara a constante e usa document.querySelector() para selecionar o previous-operation
const currentOperationText = document.querySelector("#current-operation"); //declara a constante e usa document.querySelector() para selecionar o current-operation
const buttons = document.querySelectorAll("#buttons-container button"); //declara a constante e usa document.querySelectorAll() para selecionar os botões dentro de buttons-container

class Calculator {
  //Define a class Calculator
  constructor(previousOperationText, currentOperationText) {
    //cria objetos
    this.previousOperationText = previousOperationText; //propriedade do objeto
    this.currentOperationText = currentOperationText; //propriedade do objeto
    this.currentOperation = ""; //inicia a propriedade vazia, pois a operação atual vai aí
  }

  // coloca o numero na tela
  addDigit(digit) {
    //representa o dígito a ser adicionado na operação atual.
    // Check if number already has a dot
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return; //ve se a operação tem ponto, e se tiver, retorna nada.
    }

    this.currentOperation = digit;
    this.updateScreen();
  }

  // processa as operações da calculadora
  processOperation(operation) {
    // vê se o valor atual ta vazio
    if (this.currentOperationText.innerText === "" && operation !== "C") {
      // muda a operação
      if (this.previousOperationText.innerText !== "") {
        this.changeOperation(operation);
      }
      return;
    }

    // pega o valor atual e anterior
    let operationValue;
    let previous = +this.previousOperationText.innerText.split(" ")[0]; //define que a let é igual o conteudo do previousOperation
    let current = +this.currentOperationText.innerText; //define que a let é igual o conteudo do currentOperation

    switch (operation) {
      case "+":
        operationValue = previous + current; //se for +, soma o valor anterior com o atual
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "-":
        operationValue = previous - current; //se for -, subtrai o valor anterior com o atual
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "X":
        operationValue = previous * current; //se for X, multiplica o valor anterior com o atual
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "÷":
        operationValue = previous / current; //se for ÷, divide o valor anterior com o atual
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "DEL":
        this.processDelOperator(); //chama a função para a ação
        break;
      case "CE":
        this.processClearCurrentOperator(); //chama a função para a ação
        break;
      case "C":
        this.processClearOperator(); //chama a função para a ação
        break;
      case "=":
        this.processEqualOperator(); //chama a função para a ação
        break;
      default:
        return;
    }
  }

  // muda os valores na calculadora
  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    if (operationValue === null) {
      // colocar numero no valor atual
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      // ver se é zero, se for coloca o valor atual
      if (previous === 0) {
        operationValue = current;
      }
      // bota o valor atual como anterior
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = "";
    }
  }

  // trocar as operações
  changeOperation(operation) {
    const mathOperations = ["X", "-", "+", "÷"]; //deixa as operações matematicas como constantes

    if (!mathOperations.includes(operation)) {
      //ve se o valor pra trocar a operação ta na const mathOperations, se n tiver, retorna um grande nada
      return;
    }

    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation; //tira o ultimo operador e concatena a proxima operação
  }

  // Deleta um digito
  processDelOperator() {
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1); //o slice (0, -1) tira fora o ultimo numero digitado
  }

  // limpa o valor atual
  processClearCurrentOperator() {
    this.currentOperationText.innerText = ""; //isso faz com que o valor atual fique vazio
  }

  // limpa todas as operações
  processClearOperator(DEL) {
    this.currentOperationText.innerText = ""; //deixa o valor atual vazio
    this.previousOperationText.innerText = ""; //deixa o valor anterior vazio
  }

  // processa uma operação
  processEqualOperator() {
    // obtém a operação realizada anteriormente
    let operation = this.previousOperationText.innerText.split(" ")[1];

    //faz com que seja processada a operação de acordo com o operador identificado
    this.processOperation(operation);
  }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // pega o valor do texto do botão clicado
    const value = e.target.innerText;

    // ve se o valor é um número positivo ou um ponto decimal
    if (+value >= 0 || value === ".") {
      console.log(value);
      // se for um número ou um ponto, adiciona o dígito à operação atual na calculadora
      calc.addDigit(value);
    } else {
      // se não for um número ou ponto, processa a operação correspondente na calculadora
      calc.processOperation(value);
    }
  });
});

// Event listener para capturar eventos de teclado
document.addEventListener("keydown", (event) => {
  const keyValue = event.key; // pega o valor da tecla pressionada

  // ve se a tecla pressionada é um número, ponto ou operação matemática
  if (!isNaN(keyValue)) {
    // se for um número, ponto ou operação, adiciona o dígito à operação atual na calculadora
    calc.addDigit(keyValue);
  } else if (keyValue === "Backspace") {
    // Se a tecla pressionada for 'Backspace', processa a operação de deleção na calculadora
    calc.processOperation("DEL");
  }
});
