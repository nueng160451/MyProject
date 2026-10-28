const questions = [
    {
        question: "1. คำในข้อใดจัดอยู่ใน 'แม่ ก กา' (ไม่มีตัวสะกด)?",
        options: ["ก) บ้าน", "ข) ปลา", "ค) ลิง"],
        answer: 1
    },
    {
        question: "2. คำว่า 'ช้าง' และ 'ลิง' มีตัวสะกดอยู่ในมาตราใด?",
        options: ["ก) แม่กง", "ข) แม่กม", "ค) แม่เกย"],
        answer: 0
    },
    {
        question: "3. คำว่า 'ส้ม' มีตัวสะกดตรงกับข้อใด?",
        options: ["ก) ง", "ข) ม", "ค) ย"],
        answer: 1
    },
    {
        question: "4. ข้อใดเป็นคำในมาตรา 'แม่เกย' ทุกคำ?",
        options: ["ก) ยาย, กล้วย", "ข) ดาว, ขาว", "ค) ร่ม, ยิ้ม"],
        answer: 0
    },
    {
        question: "5. คำว่า 'แมว' สะกดด้วยมาตราใด?",
        options: ["ก) แม่กง", "ข) แม่เกอว", "ค) แม่กบ"],
        answer: 1
    },
    {
        question: "6. ข้อใดคือลักษณะของมาตราตัวสะกด 'ไม่ตรงมาตรา'?",
        options: ["ก) มีตัวสะกดเพียงตัวเดียว", "ข) มีพยัญชนะสะกดได้หลายตัวแต่ออกเสียงเหมือนกัน", "ค) ไม่มีตัวสะกดเลย"],
        answer: 1
    },
    {
        question: "7. คำว่า 'บอล' ออกเสียงเหมือนมีตัวอะไรเป็นตัวสะกด?",
        options: ["ก) น (แม่กน)", "ข) ก (แม่กก)", "ค) ด (แม่กด)"],
        answer: 0
    },
    {
        question: "8. คำว่า 'นก' จัดอยู่ในมาตราตัวสะกดใด?",
        options: ["ก) แม่กบ", "ข) แม่กก", "ค) แม่กด"],
        answer: 1
    },
    {
        question: "9. คำว่า 'เมฆ' ออกเสียงตัวสะกดเหมือนกับคำใด?",
        options: ["ก) นก", "ข) มด", "ค) กบ"],
        answer: 0
    },
    {
        question: "10. คำในข้อใดมีตัวสะกดอยู่ในมาตรา 'แม่กด'?",
        options: ["ก) บ้าน", "ข) แปด", "ค) ร่ม"],
        answer: 1
    },
    {
        question: "11. คำว่า 'รถ' และ 'ตำรวจ' อยู่ในมาตราตัวสะกดเดียวกับข้อใด?",
        options: ["ก) มด", "ข) บอล", "ค) ลิง"],
        answer: 0
    },
    {
        question: "12. คำว่า 'กบ' สะกดอยู่ในมาตราใด?",
        options: ["ก) แม่กก", "ข) แม่กบ", "ค) แม่กด"],
        answer: 1
    },
    {
        question: "13. คำว่า 'ยีราฟ' ออกเสียงตัวสะกดเหมือนคำใด?",
        options: ["ก) รูป", "ข) เรียน", "ค) ดาว"],
        answer: 0
    },
    {
        question: "14. จากมินิเกม ถ้าโจทย์สั่งให้หาคำใน 'แม่กก' ควรทุบตัวตุ่นที่ถือป้ายคำใด?",
        options: ["ก) สุนัข", "ข) บ้าน", "ค) ยาย"],
        answer: 0
    },
    {
        question: "15. จากมินิเกม คำว่า 'เรียน' และ 'บ้าน' อยู่ในมาตราตัวสะกดใด?",
        options: ["ก) แม่กน", "ข) แม่กม", "ค) แม่เกอว"],
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