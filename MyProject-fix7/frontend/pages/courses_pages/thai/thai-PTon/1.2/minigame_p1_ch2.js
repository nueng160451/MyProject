const gameData = [
    {
        target: "แม่กน (สะกดด้วย น)",
        moles: [
            { word: "บ้าน", isCorrect: true },
            { word: "แมว", isCorrect: false },
            { word: "นก", isCorrect: false },
            { word: "เรียน", isCorrect: true }
        ]
    },
    {
        target: "แม่กง (สะกดด้วย ง)",
        moles: [
            { word: "ส้ม", isCorrect: false },
            { word: "ช้าง", isCorrect: true },
            { word: "ลิง", isCorrect: true },
            { word: "ดาว", isCorrect: false }
        ]
    },
    {
        target: "แม่กก (ออกเสียงเหมือน ก)",
        moles: [
            { word: "เมฆ", isCorrect: true },
            { word: "มด", isCorrect: false },
            { word: "สุนัข", isCorrect: true },
            { word: "กล้วย", isCorrect: false }
        ]
    },
    {
        target: "แม่กด (ออกเสียงเหมือน ด)",
        moles: [
            { word: "แปด", isCorrect: true },
            { word: "กบ", isCorrect: false },
            { word: "รถ", isCorrect: true },
            { word: "ยิ้ม", isCorrect: false }
        ]
    },
    {
        target: "แม่กบ (ออกเสียงเหมือน บ)",
        moles: [
            { word: "รูป", isCorrect: true },
            { word: "บ้าน", isCorrect: false },
            { word: "ยีราฟ", isCorrect: true },
            { word: "ขาว", isCorrect: false }
        ]
    }
];

let currentRound = 0;
let score = 0;
let remainingCorrect = 0;

const targetText = document.getElementById('target-text');
const roundNum = document.getElementById('round-num');
const scoreDisplay = document.getElementById('score-display');
const statusMessage = document.getElementById('status-message');
const endScreen = document.getElementById('end-screen');

loadRound();

function loadRound() {
    if (currentRound >= gameData.length) {
        finishGame();
        return;
    }

    const data = gameData[currentRound];
    targetText.innerText = `หาคำใน ${data.target}`;
    roundNum.innerText = currentRound + 1;
    statusMessage.innerText = "ทุบคำที่ถูกต้องให้ครบนะ!";
    statusMessage.style.color = "#555";

    remainingCorrect = data.moles.filter(m => m.isCorrect).length;

    for (let i = 0; i < 4; i++) {
        const sign = document.getElementById(`sign-${i}`);
        const mole = document.getElementById(`mole-${i}`);
        
        sign.innerText = data.moles[i].word;
        mole.classList.remove('up');

        setTimeout(() => {
            mole.classList.add('up');
        }, 200 + (i * 100));
    }
}

function whackMole(index) {
    const data = gameData[currentRound];
    const targetMole = data.moles[index];
    const moleElement = document.getElementById(`mole-${index}`);

    if (!moleElement.classList.contains('up')) return;

    if (targetMole.isCorrect) {
        score += 10;
        scoreDisplay.innerText = score;
        statusMessage.innerText = `ถูกต้อง! คำว่า "${targetMole.word}" ใช่เลย!`;
        statusMessage.style.color = "#28a745";
        
        moleElement.classList.remove('up');
        targetMole.isCorrect = false; // ป้องกันการกดซ้ำ
        remainingCorrect--;

        if (remainingCorrect === 0) {
            setTimeout(() => {
                currentRound++;
                loadRound();
            }, 1000);
        }
    } else {
        score = Math.max(0, score - 5);
        scoreDisplay.innerText = score;
        statusMessage.innerText = `อุ๊ย! คำว่า "${targetMole.word}" ยังไม่ใช่ครับ (-5 คะแนน)`;
        statusMessage.style.color = "#dc3545";
    }
}

function finishGame() {
    document.querySelector('.game-board').style.display = 'none';
    document.querySelector('.game-header').style.display = 'none';
    statusMessage.style.display = 'none';
    
    endScreen.classList.remove('hidden');
    document.getElementById('final-mole-score').innerText = `คุณได้คะแนนรวม ${score} คะแนน`;
}