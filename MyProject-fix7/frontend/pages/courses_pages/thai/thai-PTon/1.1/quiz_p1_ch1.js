const questions = [
    {
        question: "1. พยัญชนะไทยมีทั้งหมดกี่ตัว?",
        options: ["ก) ๔๐ ตัว", "ข) ๔๒ ตัว", "ค) ๔๔ ตัว"],
        answer: 2
    },
    {
        question: "2. พยัญชนะคู่ใดที่ออกเสียงเหมือนกัน (แฝดเสียง)?",
        options: ["ก) ก และ ข", "ข) ข และ ฃ", "ค) ค และ ง"],
        answer: 1
    },
    {
        question: "3. พยัญชนะในข้อใดออกเสียงเหมือนตัว 'ส' ทุกตัว?",
        options: ["ก) ศ, ษ, ส", "ข) ข, ฃ, ค", "ค) ด, ต, ถ"],
        answer: 0
    },
    {
        question: "4. ข้อใดเป็นสระเสียงสั้นทั้งหมด?",
        options: ["ก) อะ, อิ, อุ", "ข) อา, อี, อู", "ค) เอ, โอ, ไอ"],
        answer: 0
    },
    {
        question: "5. สระในข้อใดเป็นสระเสียงยาว?",
        options: ["ก) สระอะ", "ข) สระอิ", "ค) สระอา"],
        answer: 2
    },
    {
        question: "6. คำว่า 'ตา' และ 'ปู' ใช้สระประเภทใด?",
        options: ["ก) สระเสียงสั้น", "ข) สระเสียงยาว", "ค) สระเปลี่ยนรูป"],
        answer: 1
    },
    {
        question: "7. อักษร ๓ หมู่ (ไตรยางศ์) แบ่งพยัญชนะออกเป็นแก๊งอะไรบ้าง?",
        options: ["ก) เสียงเอก, เสียงโท, เสียงตรี", "ข) อักษรสูง, อักษรกลาง, อักษรต่ำ", "ค) อักษรเดี่ยว, อักษรคู่, อักษรผสม"],
        answer: 1
    },
    {
        question: "8. อักษรกลางมีทั้งหมดกี่ตัว?",
        options: ["ก) ๗ ตัว", "ข) ๙ ตัว", "ค) ๑๑ ตัว"],
        answer: 1
    },
    {
        question: "9. คำท่องจำ 'ไก่ จิก เด็ก ตาย บน ปาก โอ่ง' ใช้สำหรับจำอักษรหมู่ใด?",
        options: ["ก) อักษรกลาง", "ข) อักษรสูง", "ค) อักษรต่ำ"],
        answer: 0
    },
    {
        question: "10. พยัญชนะ 'ก' และ 'จ' จัดอยู่ในอักษรหมู่ใด?",
        options: ["ก) อักษรสูง", "ข) อักษรกลาง", "ค) อักษรต่ำ"],
        answer: 1
    },
    {
        question: "11. พยัญชนะ 'ข' และ 'ห' จัดอยู่ในอักษรหมู่ใด?",
        options: ["ก) อักษรสูง", "ข) อักษรกลาง", "ค) อักษรต่ำ"],
        answer: 0
    },
    {
        question: "12. คำท่องจำ 'ผี ฝาก ถุง ข้าว สาร ให้ ฉัน' ใช้จำอักษรสูง ซึ่งมีทั้งหมดกี่ตัว?",
        options: ["ก) ๙ ตัว", "ข) ๑๑ ตัว", "ค) ๒๔ ตัว"],
        answer: 1
    },
    {
        question: "13. พยัญชนะ 'ค', 'ง', 'ช' จัดอยู่ในอักษรหมู่ใด?",
        options: ["ก) อักษรสูง", "ข) อักษรกลาง", "ค) อักษรต่ำ"],
        answer: 2
    },
    {
        question: "14. มอนสเตอร์สีเขียวชอบกินอักษรกลาง ควรเลือกป้อนคุกกี้ตัวใดให้มอนสเตอร์สีเขียว?",
        options: ["ก) คุกกี้ตัว 'ข'", "ข) คุกกี้ตัว 'ก'", "ค) คุกกี้ตัว 'ค'"],
        answer: 1
    },
    {
        question: "15. ถ้าเราลากคุกกี้พยัญชนะ 'ฉ' ไปป้อน ต้องป้อนให้มอนสเตอร์ตัวสีอะไร? (ฉ เป็นอักษรสูง)",
        options: ["ก) มอนสเตอร์สีแดง (อักษรสูง)", "ข) มอนสเตอร์สีเขียว (อักษรกลาง)", "ค) มอนสเตอร์สีน้ำเงิน (อักษรต่ำ)"],
        answer: 0
    }
];

let currentQuestion = 0;
let score = 0;
let canAnswer = true;

const questionNumberEl = document.getElementById('question-number');
const scoreCountEl = document.getElementById('score-count');
const questionTextEl = document.getElementById('question-text');
const optionsContainerEl = document.getElementById('options-container');
const quizBox = document.getElementById('quiz-box');
const resultBox = document.getElementById('result-box');
const finalScoreEl = document.getElementById('final-score');

loadQuestion();

function loadQuestion() {
    canAnswer = true;
    const q = questions[currentQuestion];
    questionNumberEl.innerText = `ข้อที่ ${currentQuestion + 1} / ${questions.length}`;
    scoreCountEl.innerText = `คะแนน: ${score}`;
    questionTextEl.innerText = q.question;
    
    optionsContainerEl.innerHTML = '';
    
    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.classList.add('option-btn');
        btn.innerText = opt;
        btn.onclick = () => selectOption(index, btn);
        optionsContainerEl.appendChild(btn);
    });
}

function selectOption(selectedIndex, btnElement) {
    if (!canAnswer) return;
    canAnswer = false;
    
    const correctIndex = questions[currentQuestion].answer;
    const allButtons = optionsContainerEl.querySelectorAll('.option-btn');
    
    if (selectedIndex === correctIndex) {
        btnElement.classList.add('correct');
        score++;
        scoreCountEl.innerText = `คะแนน: ${score}`;
    } else {
        btnElement.classList.add('incorrect');
        allButtons[correctIndex].classList.add('correct');
    }
    
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }, 1200);
}

function showResult() {
    quizBox.classList.add('hidden');
    resultBox.classList.remove('hidden');
    finalScoreEl.innerText = `คุณได้คะแนน ${score} จาก ${questions.length} คะแนน`;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    resultBox.classList.add('hidden');
    quizBox.classList.remove('hidden');
    loadQuestion();
}