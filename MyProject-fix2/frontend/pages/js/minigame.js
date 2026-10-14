const questions = [
  {
    q: "A ____________ is an insect that makes honey.",
    options: ["Bee", "Ant", "Butterfly", "Beetle"],
    answer: "Bee",
  },
  {
    q: "It is _____________ in the rainy season.",
    options: ["dry", "wet", "freezing", "cold"],
    answer: "wet",
  },
  {
    q: "Jim likes fruit and vegetables.  He eats lots of _____________.",
    options: ["oranges", "yoghurt", "chicken", "pizzas"],
    answer: "oranges",
  },
  {
    q: "To get to the bus stop.  Go down this street, turn ____________ at the corner, the bus stop is ahead of you.",
    options: ["left", "light", "life", "write"],
    answer: "left",
  },
];

// จำนวนข้อที่จะสุ่มมาเล่นในแต่ละรอบ (ใส่ questions.length ถ้าอยากเล่นทุกข้อ)
const QUESTIONS_PER_GAME = 4;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

let quiz = shuffle(questions).slice(0, QUESTIONS_PER_GAME);
let current = 0;
let score = 0;
let locked = false;

const scoreEl = document.getElementById("score");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const messageEl = document.getElementById("message");

function showQuestion() {
  locked = false;
  messageEl.textContent = "";
  const item = quiz[current];
  questionEl.textContent = `Q${current + 1}/${quiz.length}: ${item.q}`;
  choicesEl.innerHTML = "";

  shuffle(item.options).forEach(text => {
    const btn = document.createElement("button");
    btn.className = "choice";
    btn.textContent = text;
    btn.addEventListener("click", () => checkAnswer(btn, text));
    choicesEl.appendChild(btn);
  });
}

function checkAnswer(btn, text) {
  if (locked) return;
  locked = true;

  if (text === quiz[current].answer) {
    score++;
    scoreEl.textContent = score;
    btn.classList.add("correct");
    messageEl.textContent = "Correct!";
  } else {
    btn.classList.add("wrong");
    messageEl.textContent = `Wrong! The answer is "${quiz[current].answer}".`;
  }

  setTimeout(() => {
    current++;
    current < quiz.length ? showQuestion() : endGame();
  }, 1500);
}

function endGame() {
  questionEl.textContent = "Game Over!";
  choicesEl.innerHTML = "";
  messageEl.textContent = `Your final score: ${score} / ${quiz.length}`;

  const again = document.createElement("button");
  again.className = "choice";
  again.textContent = "Play Again";
  again.addEventListener("click", restart);
  choicesEl.appendChild(again);
}

function restart() {
  quiz = shuffle(questions).slice(0, QUESTIONS_PER_GAME);
  current = 0;
  score = 0;
  scoreEl.textContent = 0;
  showQuestion();
}

showQuestion();