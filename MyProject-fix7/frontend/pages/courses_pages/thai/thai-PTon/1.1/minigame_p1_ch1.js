// ชุดคำถามและเฉลย
const questions = [
    { letter: 'ก', class: 'กลาง' },
    { letter: 'ข', class: 'สูง' },
    { letter: 'ค', class: 'ต่ำ' },
    { letter: 'จ', class: 'กลาง' },
    { letter: 'ฉ', class: 'สูง' }
];

let currentRound = 0;
let score = 0;

const cookieElement = document.getElementById('cookie');
const monsters = document.querySelectorAll('.monster');
const scoreDisplay = document.getElementById('score-display');
const messageDisplay = document.getElementById('message-display');
const endScreen = document.getElementById('end-screen');
const gameArea = document.querySelector('.game-area');

// ผูก Event สำหรับ Drag & Drop
cookieElement.addEventListener('dragstart', dragStart);

monsters.forEach(monster => {
    monster.addEventListener('dragover', dragOver);
    monster.addEventListener('dragleave', dragLeave);
    monster.addEventListener('drop', drop);
});

// โหลดคำถามแรก
loadRound();

function loadRound() {
    if (currentRound < questions.length) {
        cookieElement.innerText = questions[currentRound].letter;
        cookieElement.style.display = 'flex';
        messageDisplay.innerText = "ลากคุกกี้ไปป้อนเลย!";
        messageDisplay.style.color = "#0056b3";
    } else {
        gameArea.style.display = 'none';
        endScreen.classList.remove('hidden');
    }
}

function dragStart(e) {
    // แนบข้อมูลว่าคุกกี้ตัวนี้เป็นอักษรหมู่อะไร
    e.dataTransfer.setData('text/plain', questions[currentRound].class);
}

function dragOver(e) {
    e.preventDefault(); // จำเป็นต้องมีเพื่อให้วาง (drop) ได้
    this.classList.add('drag-over');
}

function dragLeave(e) {
    this.classList.remove('drag-over');
}

function drop(e) {
    e.preventDefault();
    this.classList.remove('drag-over');
    
    const expectedClass = e.dataTransfer.getData('text/plain');
    const monsterClass = this.getAttribute('data-class');
    const faceElement = this.querySelector('.monster-face');
    
    if (expectedClass === monsterClass) {
        // ตอบถูก!
        score++;
        scoreDisplay.innerText = `คะแนน: ${score} / ${questions.length}`;
        faceElement.innerText = '🥰'; // มอนสเตอร์ยิ้มแฉ่ง
        messageDisplay.innerText = "ถูกต้อง! อร่อยมาก";
        messageDisplay.style.color = "#28a745";
        
        cookieElement.style.display = 'none'; // ซ่อนคุกกี้ชั่วคราว
        currentRound++;
        
        // รอ 1 วินาทีแล้วโหลดคำถามถัดไป
        setTimeout(() => {
            faceElement.innerText = '😋'; // กลับเป็นหน้าเดิม
            loadRound();
        }, 1000);
    } else {
        // ตอบผิด!
        faceElement.innerText = '🤮'; // มอนสเตอร์พ่นออก
        messageDisplay.innerText = "แหวะ! ผิดหมู่นะ";
        messageDisplay.style.color = "#dc3545";
        
        // รอ 1 วินาทีแล้วกลับมาหน้าเดิมให้ลองใหม่
        setTimeout(() => {
            faceElement.innerText = '😋';
            messageDisplay.innerText = "ลองป้อนใหม่ดูสิ!";
            messageDisplay.style.color = "#0056b3";
        }, 1000);
    }
}