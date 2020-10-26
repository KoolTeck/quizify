// Q & A form input variables
const questnAndAnswerForm = document.querySelector(".QandA-form");
const alert = document.querySelector(".alert");
const quizQuestion = document.getElementById("question");
const quizAnswers = document.getElementsByClassName("answer");
const quizSetupBtn = document.getElementById("setupBtn");
const quizStartBtn = document.getElementById("startBtn");
const addAnswerBtn = document.querySelector(".toggle-container .add-answer");
const removeAnswerBtn = document.querySelector(
  ".toggle-container .remove-answer"
);

// global variables
let quizInner = document.querySelector(".start-quiz");
let quizContainer = document.querySelector(".quiz-container");
let questnAndAnswers = [];
let quizAmount = document.querySelector(".quiz-amount");
let answerAmount = document.querySelector(".answer-amount");
let quizContent = quizInner.querySelector(".quiz-content");
let optionContainer = document.querySelector(".option-container");

//   getting the quizSetup from local storage
let setupLocalStorage = JSON.parse(localStorage.getItem("quizSetup"));
setupLocalStorage = setupLocalStorage[0];
let questnAndAnslocal = JSON.parse(localStorage.getItem("questnAndans"));
let quizCountDown = parseInt(setupLocalStorage.quizDuration, 0);
quizCountDown = quizCountDown * 60000;

// event linsteners
window.addEventListener("DOMContentLoaded", () => {
  setupQuestnAndAns();
});

// functions
function setupQuestnAndAns() {
  // updating question and answer count
  quizAmount.textContent = setupLocalStorage.numOfQuiz;
  answerAmount.textContent = setupLocalStorage.numOfOptions;

  quizSetupBtn.addEventListener("click", (eve) => {
    eve.preventDefault();
    addQuizQandA();
  });
}

const addQuizQandA = () => {
  // const answerOne = optionContainer.querySelector("#answerOne");
  // const answerTwo = optionContainer.querySelector("#answerTwo");
  const answerThree = optionContainer.querySelector("#answerThree");

  let answer = [].map.call(quizAnswers, (item) => {
    return item.value;
  });

  let formReply = {
    quizQuestion: quizQuestion.value,
    quizAnswers: answer,
  };
  questnAndAnswers.push(formReply);
  if (quizQuestion.value === "" || answerThree.value === "") {
    displayAlert("please fill all fields", "danger");
    questnAndAnswerForm.reset();
  } else if (quizQuestion.value === "" || answerThree.value !== "") {
    addToLocalStorage();
    questnAndAnswerForm.reset();
    displayAlert(
      "question and answer added, add more question or start quiz",
      "success"
    );
  }
};

// adding more options
addAnswerBtn.addEventListener("click", (eve) => {
  eve.preventDefault();
  addOptions();
});
const addOptions = () => {
  let numOfOptions = parseInt(setupLocalStorage.numOfOptions);
  if (numOfOptions > 3) {
    let NewOption = `
      <div class="form-control">
              <label for="answer" >  
                <textarea name="answer" class="answer" cols="30" rows="4" placeholder=
                "(d) input more option
    " required ></textarea>
              </label>
      </div>
    `;
    optionContainer.innerHTML += NewOption;
    removeAnswerBtn.addEventListener("click", () => {
      optionContainer.lastElementChild.remove();
    });
  }
};

// starting quiz

let numOfQuestion = parseInt(setupLocalStorage.numOfQuestion);

if (questnAndAnslocal) {
  quizStartBtn.addEventListener("click", (eve) => {
    eve.preventDefault();
    startQuiz();
  });
}

const startQuiz = () => {
  questnAndAnswerForm.classList.add("hide-QandA-form");
  quizInner.classList.add("reveal-quiz");
  let duration = quizInner.querySelector(".quiz-header p");
  let quizSubject = quizInner.querySelector(".quiz-header h3");
  let quizAuthor = quizInner.querySelector(".quiz-header article");
  duration.innerText = `Duration: ${setupLocalStorage.quizDuration}`;
  quizInner.style.background = `${setupLocalStorage.quizBackgroundColor}`;
  quizSubject.innerText = `subject: ${setupLocalStorage.quizSubject}`;
  quizAuthor.innerText = `author: ${setupLocalStorage.quizAuthor}`;
  if (questnAndAnslocal[0]) {
    setQuizDom(0, 0);
  }
  getCountdown();
};

function setQuizDom(index, index0) {
  let questions = questnAndAnslocal[index].quizQuestion;
  let answer1 = questnAndAnslocal[index0].quizAnswers[0];
  let answer2 = questnAndAnslocal[index0].quizAnswers[1];
  let answer3 = questnAndAnslocal[index0].quizAnswers[2];

  let qsnAndansDom = ` <!-- qustion one start -->
            <div>
                <p> ${questions}</p>
            </div>
            <!-- qustion one end -->
            <!-- multiple answers -->
            <div class="answers">
               <form action="" class="answer-reply">
                <div class="answer-container">
                  <div class="form-group">  
                    <input type="radio" value="." class="labelStyle" name="." id="answer-one">
                    <label for="answer-one" data-id="id1"  > ${answer1} </label>
                   </div>
                    <div class="form-group">  
                    <input type="radio"  class="labelStyle" name="." id="answer-one">
                    <label for="answer-one" data-id="id2" > ${answer2} </label>
                   </div>
                  <div class="form-group">  
                    <input type="radio" class="labelStyle" name="." id="answer-one">
                    <label data-id="id3" for="answer-one"> ${answer3} </label>
                   </div>
                </div>
                   
                       <!-- submit-btns -->
                   <div class="btns-container">
                       <button class="submit-btn btn1" type="button">
                           submit
                       </button>
                       <button class="submit-btn btn2" type="button">
                           quest 2
                       </button>
                   </div>
               </form>
            </div>`;
  quizContent.innerHTML = qsnAndansDom;
  let answerContainer = quizContent.querySelector(".answer-container");
  // adding more answers
  addAnswers();

  formartOptions(answerContainer);

  nextBtn = quizInner.querySelector(".btns-container .btn2");
  let btnCont = quizInner.querySelector(".btns-container");
  nextBtn.addEventListener("click", (eve) => {
    eve.preventDefault();
    setQuizDom(1, 1);
    nextBtn.remove();
  });

  let newBtn1 = document.createElement("BUTTON");
  newBtn1.setAttribute("class", "submit-btn btn", "type", "button");
  newBtn1.innerHTML = `qust 3`;
  btnCont.appendChild(newBtn1);
  newBtn1.addEventListener("click", (eve) => {
    eve.preventDefault();
    setQuizDom(2, 2);
    newBtn1.remove();
  });

  // adding more questions
  addQuestions();
}

function addAnswers() {
  let answerContainer = quizContent.querySelector(".answer-container");
  let numOfOptions = parseInt(setupLocalStorage.numOfOptions);

  if (numOfOptions === 4) {
    let answer4 = questnAndAnslocal[3].quizAnswers[3];
    let otherOptionOne = `  <div class="form-group">
                    <input type="radio" class="labelStyle" name="." id="answer-one">
                    <label data-id="id" for="answer-one"> ${answer4} </label>
                   </div>`;

    answerContainer.innerHTML += otherOptionOne;
    // formartOptions(answerContainer);
  } else if (numOfOptions === 5) {
    let answer5 = questnAndAnslocal[4].quizAnswers[4];
    let otherOptionTwo = ` <div class="form-group">
                    <input type="radio" class="labelStyle" name="." id="answer-one">
                    <label data-id="id" for="answer-one"> ${answer5} </label>
                   </div>`;
    answerContainer.innerHTML += otherOptionTwo;
  }
}

function addQuestions() {
  let numOfQuestion = parseInt(setupLocalStorage.numOfQuiz);
  if (numOfQuestion >= 4) {
    let btnCont = quizInner.querySelector(".btns-container");
    let newBtn2 = document.createElement("BUTTON");
    newBtn2.setAttribute("class", "submit-btn", "type", "button");
    newBtn2.innerHTML = `quest 4`;
    btnCont.appendChild(newBtn2);
    newBtn2.addEventListener("click", (eve) => {
      eve.preventDefault();
      setQuizDom(3, 3);
      newBtn2.remove();
    });
  }
  if (numOfQuestion >= 5) {
    let btnCont = quizInner.querySelector(".btns-container");
    let newBtn3 = document.createElement("BUTTON");
    newBtn3.setAttribute("class", "submit-btn", "type", "button");
    newBtn3.innerHTML = `quest 5`;
    btnCont.appendChild(newBtn3);
    newBtn3.addEventListener("click", (eve) => {
      eve.preventDefault();
      setQuizDom(4, 4);
      newBtn3.remove();
    });
  }
  if (numOfQuestion >= 6) {
    let btnCont = quizInner.querySelector(".btns-container");
    let newBtn4 = document.createElement("BUTTON");
    newBtn4.setAttribute("class", "submit-btn", "type", "button");
    newBtn4.innerHTML = `quest 6`;
    btnCont.appendChild(newBtn4);
    newBtn4.addEventListener("click", (eve) => {
      eve.preventDefault();
      setQuizDom(5, 5);
      newBtn4.remove();
    });
  }
}

function formartOptions(answerContainer) {
  let options = quizInner.querySelectorAll(".answer-reply label");
  let inputs = [...answerContainer.getElementsByClassName("labelStyle")];
  options.forEach((option) => {
    if (option.textContent.includes(`answer`)) {
      let getOption = option.innerText.toString();
      getOption = getOption.replace("answer", "`");
      option.innerText = getOption;
      inputs.map((input) => {
        checkBtn = quizInner.querySelector(".btns-container .btn1");
        checkBtn.addEventListener("click", (eve) => {
          eve.preventDefault();
          checkAnswer(input);
        });
      });
    }
  });

  const checkAnswer = (input) => {
    if (input.checked) {
      let items = [...options];
      items.forEach((item) => {
        if (item.textContent.includes("`")) {
          item.style.background = `${setupLocalStorage.quizAnswerColor}`;
          displayAlert(
            `answer highlighted in ${setupLocalStorage.quizAnswerColor}`,
            "success"
          );
        } else if (!item.textContent.includes("`")) {
          item.style.background = "red";
        }
      });
    }
  };
}

// local storage
function addToLocalStorage() {
  localStorage.setItem("questnAndans", JSON.stringify(questnAndAnswers));
}

const removeFromStorage = () => {
  localStorage.removeItem("questnAndans");
  localStorage.removeItem("quizSetup");
};

// alert
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  // remove alert
  setTimeout(() => {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 5000);
}

const getCountdown = () => {
  let timeOutContainer = document.querySelector(".set-time-out");
  setTimeout(function () {
    quizContainer.remove();
    timeOutContainer.innerHTML = `
                        <p>Time elapsed</p>
                               <br/>
                            <!-- timeout-btns -->
                      <div class="btns-container"> 
                        <a href="index.html">
                                <button class="submit-btn reset" type="button">reset quiz</button>
                          </a>
                        <a href="Q&A.html">
                                <button class="submit-btn" type="button">restart quiz</button>
                          </a>
                      </div>`;
    let resetBtn = timeOutContainer.querySelector(".reset");
    resetBtn.addEventListener("click", () => {
      removeFromStorage();
    });
  }, quizCountDown);
};
