const questions = [
    {
        question: "1. คำคล้องจองคือคำที่มีสิ่งใดเหมือนกัน?",
        options: ["ก) พยัญชนะต้นเหมือนกัน", "ข) สระและมาตราตัวสะกดเดียวกัน", "ค) วรรณยุกต์เหมือนกัน"],
        answer: 1
    },
    {
        question: "2. คำว่า 'ตา' คล้องจองกับคำใด?",
        options: ["ก) ยา", "ข) หู", "ค) ปู"],
        answer: 0
    },
    {
        question: "3. คำว่า 'หู' คล้องจองกับคำใด?",
        options: ["ก) ตา", "ข) ปู", "ค) มา"],
        answer: 1
    },
    {
        question: "4. คำว่า 'โรงเรียน' คล้องจองกับคำว่า 'เขียนอ่าน' เพราะใช้สิ่งใดเหมือนกัน?",
        options: ["ก) สระเอีย และ แม่กน", "ข) สระแอ และ แม่กม", "ค) สระอี และ แม่กง"],
        answer: 0
    },
    {
        question: "5. คำว่า 'นกบิน' คล้องจองกับคำใด?",
        options: ["ก) กินปลา", "ข) ต้นไม้", "ค) ท้องฟ้า"],
        answer: 0
    },
    {
        question: "6. ประโยคที่สมบูรณ์จะต้องสื่อสารให้รู้ว่าอะไร?",
        options: ["ก) คำไหนสะกดอย่างไร", "ข) ใคร ทำอะไร", "ค) อ่านยากหรืออ่านง่าย"],
        answer: 1
    },
    {
        question: "7. ในประโยค 'แมวกินปลา' คำว่า 'แมว' ทำหน้าที่เป็นส่วนใด?",
        options: ["ก) ประธาน", "ข) กริยา", "ค) กรรม"],
        answer: 0
    },
    {
        question: "8. ในประโยค 'แมวกินปลา' คำว่า 'กิน' ทำหน้าที่เป็นส่วนใด?",
        options: ["ก) ประธาน", "ข) กริยา", "ค) กรรม"],
        answer: 1
    },
    {
        question: "9. ในประโยค 'แมวกินปลา' คำว่า 'ปลา' ทำหน้าที่เป็นส่วนใด?",
        options: ["ก) ประธาน", "ข) กริยา", "ค) กรรม (ผู้ถูกกระทำ)"],
        answer: 2
    },
    {
        question: "10. ข้อใดเรียงคำเป็นประโยคได้ถูกต้อง?",
        options: ["ก) ปลา กิน แมว", "ข) น้อง วิ่ง เล่น", "ค) โรงเรียน เดิน ไป"],
        answer: 1
    },
    {
        question: "11. ข้อใดเป็นคำคล้องจองประเภทไม่มีตัวสะกด?",
        options: ["ก) ร่ม - ส้ม", "ข) กา - มา", "ค) บิน - กิน"],
        answer: 1
    },
    {
        question: "12. คำคู่ใด **ไม่** คล้องจองกัน?",
        options: ["ก) ดี - มี", "ข) สวย - กล้วย", "ค) ช้าง - ดิน"],
        answer: 2
    },
    {
        question: "13. จากประโยค 'น้องดื่มนม' ข้อใดคือคำกริยา (การกระทำ)?",
        options: ["ก) น้อง", "ข) ดื่ม", "ค) นม"],
        answer: 1
    },
    {
        question: "14. จากมินิเกม คำที่คล้องจองกับคำว่า 'ดวงดาว' คือข้อใด?",
        options: ["ก) แวววาว", "ข) สว่าง", "ค) กลางคืน"],
        answer: 0
    },
    {
        question: "15. จากมินิเกม คำว่า 'ยิ้มแย้ม' คล้องจองกับคำว่า 'แจ่มใส' เพราะท้ายคำแรกสัมผัสด้วยสิ่งใด?",
        options: ["ก) สระแอลดรูป", "ข) สระแอ และ ตัวสะกดแม่กม", "ค) สระเอีย และ ตัวสะกดแม่กน"],
        answer: 1
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