// constants
const stepperContainer = document.querySelector(".stepper");
const plusBtnOne = document.querySelector(".plus");
const plusBtnTwo = document.querySelector(".add");
const minusBtn = document.querySelector(".minus");
const minusBtnTwo = document.querySelector(".sub");
const quizSetupForm = document.querySelector(".setup-form");
const alerts = document.querySelector(".alert");

// quiz setup user inputs

const quizSubject = document.getElementById("subject");
const numOfQuiz = document.getElementById("numOfQuiz");
const quizDuration = document.getElementById("testDuration");
const quizBackgroundColor = document.getElementById("backGroundColor");
const quizAnswerColor = document.getElementById("answerColor");
const quizAuthor = document.getElementById("author");
const numOfOptions = document.querySelector("#numOfOptions");
const quizSetupSubmitBTn = document.querySelector(".submit-btn");

// global variables
let quizSetupDetails = [];

// event listeners
document.addEventListener("DOMContentLoaded", () => {
  setupQuiz();
  alert(
    "Welcome to qui-zify! A simple quiz building app. Fill the details of your quiz to begin"
  );
});

plusBtnOne.addEventListener("click", counter);
minusBtn.addEventListener("click", counter);
plusBtnTwo.addEventListener("click", counter2);
minusBtnTwo.addEventListener("click", counter2);

// functions
function setupQuiz() {
  quizSetupSubmitBTn.addEventListener("click", addSetup);
}
let formInput = [...quizSetupForm.getElementsByClassName("formInput")].map(
  (input) => {
    return input;
  }
);

const addSetup = (eve) => {
  eve.preventDefault();

  if (formInput[1].value === "") {
    displayAlert("please ensure all fields are filled", "danger");
  } else if (formInput[0].value || formInput[1].value !== "") {
    let setup = {
      quizAuthor: quizAuthor.value,
      quizSubject: quizSubject.value,
      numOfQuiz: numOfQuiz.value,
      numOfOptions: numOfOptions.value,
      quizDuration: quizDuration.value,
      quizBackgroundColor: quizBackgroundColor.value,
      quizAnswerColor: quizAnswerColor.value,
    };

    quizSetupDetails.push(setup);
    setLocalStorage();
    eve.target.parentElement.onclick = null;
    eve.target.parentElement.click();
    quizSetupForm.reset();
  }
};

function counter(Event) {
  const count = Event.target;
  if (count.classList.contains("fa-plus")) {
    numOfQuiz.value++;
  } else if (count.classList.contains("fa-minus")) {
    numOfQuiz.value--;
    if (numOfQuiz.value < 0) {
      numOfQuiz.value = 0;
    }
  }
}

function counter2(Event) {
  const count = Event.target;
  if (count.classList.contains("fa-plus")) {
    numOfOptions.value++;
  } else if (count.classList.contains("fa-minus")) {
    numOfOptions.value--;
    if (numOfOptions.value < 0) {
      numOfOptions.value = 0;
    }
  }
}

// alert
function displayAlert(text, action) {
  alerts.textContent = text;
  alerts.classList.add(`alert-${action}`);
  // remove alert
  setTimeout(() => {
    alerts.textContent = "";
    alerts.classList.remove(`alert-${action}`);
  }, 4000);
}
// set local storage
const setLocalStorage = () => {
  localStorage.setItem("quizSetup", JSON.stringify(quizSetupDetails));
};
