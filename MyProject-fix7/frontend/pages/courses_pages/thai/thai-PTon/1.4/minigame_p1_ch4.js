// ข้อมูลการ์ด 9 ใบ (จับคู่ 4 คู่ + การ์ดดาวโบนัสพิเศษ 1 ใบ)
const cardData = [
    // คู่ที่ 1: ฝนตกหนัก - รูปกางร่ม
    { id: 1, pairId: 'A', text: "ฝนตกหนัก 🌧️" },
    { id: 2, pairId: 'A', text: "คนกางร่ม ☂️" },

    // คู่ที่ 2: ห้ามทิ้งขยะ - รูปป้ายถังขยะ
    { id: 3, pairId: 'B', text: "ห้ามทิ้งขยะ 🚯" },
    { id: 4, pairId: 'B', text: "ป้ายถังขยะ 🗑️" },

    // คู่ที่ 3: ใครกำลังกินปลา - แมว
    { id: 5, pairId: 'C', text: "ใครกินปลา? 🐟" },
    { id: 6, pairId: 'C', text: "น้องแมว 🐱" },

    // คู่ที่ 4: ทางม้าลาย - คนข้ามถนน
    { id: 7, pairId: 'D', text: "ทางม้าลาย 🦓" },
    { id: 8, pairId: 'D', text: "คนข้ามถนน 🚶‍♂️" },

    // ใบที่ 9: การ์ดโบนัสเวทมนตร์ (คลิกแล้วเปิดรับดาวฟรีทันที!)
    { id: 9, pairId: 'BONUS', text: "การ์ดดาวโบนัส ⭐" }
];

let flippedCards = [];
let matchedPairs = 0;
let canFlip = true;

const cardGrid = document.getElementById('card-grid');
const scoreDisplay = document.getElementById('score-display');
const statusMessage = document.getElementById('status-message');
const endScreen = document.getElementById('end-screen');

initGame();

function initGame() {
    cardGrid.innerHTML = '';
    flippedCards = [];
    matchedPairs = 0;
    canFlip = true;
    scoreDisplay.innerText = `${matchedPairs} / 4 คู่`;

    // สุ่มสลับตำแหน่งการ์ด 9 ใบ
    const shuffledCards = [...cardData].sort(() => Math.random() - 0.5);

    shuffledCards.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.id = item.id;
        card.dataset.pairId = item.pairId;
        card.dataset.text = item.text;
        card.innerText = "❓"; // หลังไพ่

        card.onclick = () => flipCard(card);
        cardGrid.appendChild(card);
    });
}

function flipCard(card) {
    if (!canFlip || card.classList.contains('flipped') || card.classList.contains('matched')) return;

    // กรณีคลิกเจอการ์ดโบนัสใบที่ 9
    if (card.dataset.pairId === 'BONUS') {
        card.classList.add('flipped', 'bonus');
        card.innerText = card.dataset.text;
        statusMessage.innerText = "ยินดีด้วย! คุณเปิดเจอการ์ดดาวโบนัสเวทมนตร์ ⭐";
        statusMessage.style.color = "#856404";
        return;
    }

    // หงายการ์ดปกติ
    card.classList.add('flipped');
    card.innerText = card.dataset.text;
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    canFlip = false;
    const [card1, card2] = flippedCards;

    if (card1.dataset.pairId === card2.dataset.pairId) {
        // จับคู่ถูกต้อง
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        scoreDisplay.innerText = `${matchedPairs} / 4 คู่`;
        
        statusMessage.innerText = "ถูกต้อง! การ์ดทั้งสองใบมีความสัมพันธ์กัน ✨";
        statusMessage.style.color = "#28a745";

        flippedCards = [];
        canFlip = true;

        if (matchedPairs === 4) {
            setTimeout(finishGame, 1000);
        }
    } else {
        // จับคู่ผิด
        statusMessage.innerText = "ยังไม่ถูกต้อง ลองจับคู่ใหม่อีกครั้งนะ!";
        statusMessage.style.color = "#dc3545";

        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.innerText = "❓";
            card2.innerText = "❓";
            flippedCards = [];
            canFlip = true;
        }, 1200);
    }
}

function finishGame() {
    document.querySelector('.game-area').style.display = 'none';
    document.querySelector('.game-header').style.display = 'none';
    statusMessage.style.display = 'none';

    endScreen.classList.remove('hidden');
}