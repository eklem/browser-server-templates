/* ### ########################################################### ### */
/* ### Fake math library for demo purposes                         ### */

let responseJson

const add = function (num1, num2) {
  const answerCalc = num1 + num2
  responseJson = { answer: answerCalc, mathProblem: `${num1} + ${num2} = ` }
  return responseJson
}

const subtract = function (num1, num2) {
  const answerCalc = num1 - num2
  responseJson = { answer: answerCalc, mathProblem: `${num1} - ${num2} = ` }
  return responseJson
}

const multiply = function (num1, num2) {
  const answerCalc = num1 * num2
  responseJson = { answer: answerCalc, mathProblem: `${num1} * ${num2} = ` }
  return responseJson
}

const divide = function (num1, num2) {
  const answerCalc = num1 / num2
  responseJson = { answer: answerCalc, mathProblem: `${num1} / ${num2} = ` }
  return responseJson
}

export { add, subtract, multiply, divide }
