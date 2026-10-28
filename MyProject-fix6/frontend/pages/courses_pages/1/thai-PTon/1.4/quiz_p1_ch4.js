const questions = [
    {
        question: "1. อ่านข้อความ: 'วันนี้ฝนตกหนัก แม่จึงกางร่มสีแดงเดินไปตลาด' คำถาม: ใครเดินไปตลาด?",
        options: ["ก) แม่", "ข) พ่อ", "ค) น้อง"],
        answer: 0
    },
    {
        question: "2. จากข้อความในข้อ 1 คุณแม่กางร่มสีอะไร?",
        options: ["ก) สีเขียว", "ข) สีแดง", "ค) สีเหลือง"],
        answer: 1
    },
    {
        question: "3. จากข้อความในข้อ 1 สภาพอากาศในวันนั้นเป็นอย่างไร?",
        options: ["ก) แดดจ้า", "ข) ฝนตกหนัก", "ค)ลมพายุพัดแรง"],
        answer: 1
    },
    {
        question: "4. เมื่อเห็นสัญลักษณ์ 'รูปคนกางร่ม' สื่อความหมายถึงสิ่งใด?",
        options: ["ก) ฝนกำลังตก", "ข) แดดออก", "ค) ห้ามเข้า"],
        answer: 0
    },
    {
        question: "5. ป้ายรูปวงกลมมีขีดทับรูปถังขยะ สื่อความหมายว่าอย่างไร?",
        options: ["ก) ให้ทิ้งขยะตรงนี้", "ข) ห้ามทิ้งขยะ", "ค) ถังขยะเต็ม"],
        answer: 1
    },
    {
        question: "6. ป้ายคนเดินข้ามถนนบนเส้นลายขาว-ดำ สื่อถึงสถานที่ใด?",
        options: ["ก) สะพานลอย", "ข) ทางม้าลาย", "ค) สนามเด็กเล่น"],
        answer: 1
    },
    {
        question: "7. ถ้าต้องการถามถึง 'บุคคลหรือสัตว์' ควรใช้คำถามว่าอย่างไร?",
        options: ["ก) อะไร", "ข) ใคร", "ค) ที่ไหน"],
        answer: 1
    },
    {
        question: "8. ถ้าต้องการถามถึง 'สถานที่' ควรใช้คำถามว่าอย่างไร?",
        options: ["ก) ที่ไหน", "ข) อะไร", "ค) ใคร"],
        answer: 0
    },
    {
        question: "9. คำถาม: 'เจ้าแมวน้อยกำลังทำอะไร?' คำตอบในข้อใดตรงประเด็นที่สุด?",
        options: ["ก) อยู่ในบ้าน", "ข) กำลังนอนหลับ", "ค) ตัวสีขาว"],
        answer: 1
    },
    {
        question: "10. อ่านข้อความ: 'นกตัวน้อยส่งเสียงร้องเพลงอยู่บนต้นไม้' คำถาม: นกอยู่ 'ที่ไหน'?",
        options: ["ก) บนหลังคา", "ข) บนต้นไม้", "ค) ในกรง"],
        answer: 1
    },
    {
        question: "11. จากมินิเกม ถ้าเปิดเจอการ์ดคำถาม 'ใครกำลังกินปลา?' ต้องจับคู่กับการ์ดใบใด?",
        options: ["ก) น้องแมว", "ข) นกบิน", "ค) คุณตา"],
        answer: 0
    },
    {
        question: "12. จากมินิเกม การ์ดคำว่า 'ฝนตกหนัก' มีความสัมพันธ์กับสิ่งใดมากที่สุด?",
        options: ["ก) คนกางร่ม", "ข) ทางม้าลาย", "ค) ถังขยะ"],
        answer: 0
    },
    {
        question: "13. ข้อใด **ไม่ใช่** ประโยชน์ของการอ่านจับใจความ?",
        options: ["ก) รู้ว่าใครทำอะไรที่ไหน", "ข) เข้าใจเรื่องราวได้ถูกต้อง", "ค) ทำให้อ่านหนังสือช้าลง"],
        answer: 2
    },
    {
        question: "14. คำถาม: 'น้องทานอะไรเป็นอาหารเช้า?' คำตอบควรเป็นสิ่งใด?",
        options: ["ก) ข้าวผัด", "ข) ที่โรงเรียน", "ค) ตอนเช้า"],
        answer: 0
    },
    {
        question: "15. การสังเกตสัญลักษณ์รอบตัว มีประโยชน์อย่างไรในชีวิตประจำวัน?",
        options: ["ก) ช่วยให้สื่อสารและปฏิบัติตามกฎได้ถูกต้อง", "ข) ทำให้วาดรูปสวยขึ้น", "ค) ช่วยให้สะกดคำยากๆ ได้"],
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