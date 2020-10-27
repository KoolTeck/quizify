//   getting the quizSetup from local storage
let setupLocalStorage = JSON.parse(localStorage.getItem("quizSetup"));
setupLocalStorage = setupLocalStorage[0];
export function addQuestions() {
  let numOfQuestion = parseInt(setupLocalStorage.numOfQuiz);
  if (numOfQuestion >= 4) {
    let btnCont = document.querySelector(".btns-container");
    let newBtn2 = document.createElement("BUTTON");
    newBtn2.setAttribute("class", "submit-btn", "type", "button");
    newBtn2.innerHTML = `quest 4`;
    btnCont.appendChild(newBtn2);
    newBtn2.addEventListener("click", (eve) => {
      eve.preventDefault();
      setQuizDom(3, 3);
    });
  }
  if (numOfQuestion >= 5) {
    let btnCont = document.querySelector(".btns-container");
    let newBtn3 = document.createElement("BUTTON");
    newBtn3.setAttribute("class", "submit-btn", "type", "button");
    newBtn3.innerHTML = `quest 5`;
    btnCont.appendChild(newBtn3);
    newBtn3.addEventListener("click", (eve) => {
      eve.preventDefault();
      setQuizDom(4, 4);
    });
  }
  if (numOfQuestion >= 6) {
    let btnCont = document.querySelector(".btns-container");
    let newBtn4 = document.createElement("BUTTON");
    newBtn4.setAttribute("class", "submit-btn", "type", "button");
    newBtn4.innerHTML = `quest 6`;
    btnCont.appendChild(newBtn4);
    newBtn4.addEventListener("click", (eve) => {
      eve.preventDefault();
      setQuizDom(5, 5);
    });
  }
}
