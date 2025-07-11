import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise(resolve => rl.question(question, answer => resolve(answer)));
}

async function calculator() {
  const num1 = parseFloat(await ask("Enter first number: "));
  const operator = await ask("Enter operator (+, -, *, /): ");
  const num2 = parseFloat(await ask("Enter second number: "));

  let result;

  switch (operator) {
    case '+': result = num1 + num2; break;
    case '-': result = num1 - num2; break;
    case '*': result = num1 * num2; break;
    case '/': result = num2 !== 0 ? num1 / num2 : "Error: Divide by zero"; break;
    default: result = "Invalid operator";
  }

  console.log(`Result: ${result}`);
  rl.close();
}

calculator();
