// คลังคำศัพท์ 5 หัวข้อหลัก (แต่ละหัวข้อจะมีคำที่ถูก 2 คำ ลอยปะปนกับตัวหลอกรวม 20 ลูก)
const gameData = [
    {
        targetWord: "โรงเรียน",
        balloons: [
            { word: "ดินสอ", isCorrect: false },
            { word: "กระดาน", isCorrect: false },
            { word: "อ่านเขียน", isCorrect: true }, // ข้อถูกที่ 1
            { word: "หนังสือ", isCorrect: false },
            { word: "ยางลบ", isCorrect: false },
            { word: "พากเพียร", isCorrect: true }, // ข้อถูกที่ 2
            { word: "กระเป๋า", isCorrect: false },
            { word: "โต๊ะเรียน", isCorrect: false },
            { word: "พัดลม", isCorrect: false },
            { word: "เพื่อนรัก", isCorrect: false },
            { word: "คุณครู", isCorrect: false },
            { word: "เก้าอี้", isCorrect: false },
            { word: "สมุด", isCorrect: false },
            { word: "ไม้บรรทัด", isCorrect: false },
            { word: "สีไม้", isCorrect: false },
            { word: "สนามเด็กเล่น", isCorrect: false },
            { word: "หน้าต่าง", isCorrect: false },
            { word: "ประตู", isCorrect: false },
            { word: "ถังขยะ", isCorrect: false },
            { word: "นาฬิกา", isCorrect: false }
        ]
    },
    {
        targetWord: "คุณตา",
        balloons: [
            { word: "กวาดบ้าน", isCorrect: false },
            { word: "ขนม", isCorrect: false },
            { word: "ยาดี", isCorrect: true }, // ข้อถูกที่ 1
            { word: "พัดลม", isCorrect: false },
            { word: "มาหา", isCorrect: true }, // ข้อถูกที่ 2
            { word: "เก้าอี้", isCorrect: false },
            { word: "หน้าต่าง", isCorrect: false },
            { word: "ทำสวน", isCorrect: false },
            { word: "ดื่มน้ำ", isCorrect: false },
            { word: "แว่นตา", isCorrect: false },
            { word: "วิทยุ", isCorrect: false },
            { word: "ต้นไม้", isCorrect: false },
            { word: "ปูอัด", isCorrect: false },
            { word: "ปลาเผา", isCorrect: false },
            { word: "เสื้อผ้า", isCorrect: false },
            { word: "รองเท้า", isCorrect: false },
            { word: "หมวกสาน", isCorrect: false },
            { word: "จานชาม", isCorrect: false },
            { word: "มะพร้าว", isCorrect: false },
            { word: "แตงโม", isCorrect: false }
        ]
    },
    {
        targetWord: "นกบิน",
        balloons: [
            { word: "ต้นไม้", isCorrect: false },
            { word: "กินปลา", isCorrect: true }, // ข้อถูกที่ 1
            { word: "รังนก", isCorrect: false },
            { word: "ท้องฟ้า", isCorrect: false },
            { word: "ยินดี", isCorrect: true }, // ข้อถูกที่ 2
            { word: "สายลม", isCorrect: false },
            { word: "ภูเขา", isCorrect: false },
            { word: "ก้อนเมฆ", isCorrect: false },
            { word: "ดวงอาทิตย์", isCorrect: false },
            { word: "แม่น้ำ", isCorrect: false },
            { word: "ดอกไม้", isCorrect: false },
            { word: "ผีเสื้อ", isCorrect: false },
            { word: "กิ่งไม้", isCorrect: false },
            { word: "แมลงวัน", isCorrect: false },
            { word: "กบขุน", isCorrect: false },
            { word: "สายฝน", isCorrect: false },
            { word: "พายุ", isCorrect: false },
            { word: "ร่มกาง", isCorrect: false },
            { word: "ทุ่งนา", isCorrect: false },
            { word: "กระท่อม", isCorrect: false }
        ]
    },
    {
        targetWord: "ดวงดาว",
        balloons: [
            { word: "กลางคืน", isCorrect: false },
            { word: "สว่าง", isCorrect: false },
            { word: "แวววาว", isCorrect: true }, // ข้อถูกที่ 1
            { word: "พระจันทร์", isCorrect: false },
            { word: "ก้อนเมฆ", isCorrect: false },
            { word: "สีขาว", isCorrect: true }, // ข้อถูกที่ 2
            { word: "สดใส", isCorrect: false },
            { word: "ท้องฟ้า", isCorrect: false },
            { word: "มืดมิด", isCorrect: false },
            { word: "สวยงาม", isCorrect: false },
            { word: "ระยิบระยับ", isCorrect: false },
            { word: "ขอบฟ้า", isCorrect: false },
            { word: "จักรวาล", isCorrect: false },
            { word: "จันทรุปราคา", isCorrect: false },
            { word: "ดวงอาทิตย์", isCorrect: false },
            { word: "แสงไฟ", isCorrect: false },
            { word: "โคมไฟ", isCorrect: false },
            { word: "ไฟฉาย", isCorrect: false },
            { word: "มองดู", isCorrect: false },
            { word: "ยามดึก", isCorrect: false }
        ]
    },
    {
        targetWord: "ยิ้มแย้ม",
        balloons: [
            { word: "น่ารัก", isCorrect: false },
            { word: "แจ่มใส", isCorrect: true }, // ข้อถูกที่ 1
            { word: "ใจดี", isCorrect: false },
            { word: "เพื่อนฝูง", isCorrect: false },
            { word: "แก้มแดง", isCorrect: true }, // ข้อถูกที่ 2
            { word: "ความสุข", isCorrect: false },
            { word: "หัวเราะ", isCorrect: false },
            { word: "เบิกบาน", isCorrect: false },
            { word: "เริงร่า", isCorrect: false },
            { word: "สดชื่น", isCorrect: false },
            { word: "ยินดี", isCorrect: false },
            { word: "น่าเอ็นดู", isCorrect: false },
            { word: "ตลกขบขัน", isCorrect: false },
            { word: "หน้าบึ้ง", isCorrect: false },
            { word: "ร้องไห้", isCorrect: false },
            { word: "โกรธเคือง", isCorrect: false },
            { word: "สนุกสนาน", isCorrect: false },
            { word: "เพลิดเพลิน", isCorrect: false },
            { word: "สบายใจ", isCorrect: false },
            { word: "อารมณ์ดี", isCorrect: false }
        ]
    }
];

// โทนสีลูกโป่งพาสเทล
const balloonColors = ['#ff85a1', '#70d6ff', '#ffd670', '#ff70a6', '#06d6a0', '#b5e2fa'];

let currentRound = 0;
let score = 0;
let remainingCorrectInRound = 2; // แต่ละด่านต้องหาข้อถูกให้ครบ 2 ข้อ
let spawnTimer = null;
let balloonQueue = [];

const targetWordEl = document.getElementById('target-word');
const roundNumEl = document.getElementById('round-num');
const scoreDisplayEl = document.getElementById('score-display');
const statusMessageEl = document.getElementById('status-message');
const skyAreaEl = document.getElementById('sky-area');
const endScreenEl = document.getElementById('end-screen');

loadRound();

function loadRound() {
    if (currentRound >= gameData.length) {
        finishGame();
        return;
    }

    remainingCorrectInRound = 2; // Reset คำตอบถูกประจำด่านเป็น 2 ข้อ
    const data = gameData[currentRound];
    targetWordEl.innerText = `"${data.targetWord}"`;
    roundNumEl.innerText = currentRound + 1;
    scoreDisplayEl.innerText = score;
    statusMessageEl.innerText = "หาคำคล้องจองให้ครบ 2 คำในด่านนี้นะ!";
    statusMessageEl.style.color = "#555";

    skyAreaEl.innerHTML = '';
    balloonQueue = [...data.balloons];

    if (spawnTimer) clearInterval(spawnTimer);

    // ปล่อยลูกโป่งทุกๆ 1.8 วินาที (ไม่เร็วไม่ช้าไป)
    spawnBalloon();
    spawnTimer = setInterval(() => {
        if (remainingCorrectInRound > 0) {
            if (balloonQueue.length === 0) {
                // ถ้าปล่อยครบ 20 ลูกแล้วยังหาไม่ครบ ให้วนเอาลูกโป่งที่เหลือมาลอยใหม่
                balloonQueue = [...data.balloons];
            }
            spawnBalloon();
        }
    }, 1800);
}

function spawnBalloon() {
    if (balloonQueue.length === 0 || remainingCorrectInRound <= 0) return;

    const item = balloonQueue.shift();
    const balloon = document.createElement('div');
    balloon.classList.add('balloon');
    balloon.innerText = item.word;

    // สุ่มตำแหน่งซ้าย-ขวา
    const randomLeft = Math.floor(Math.random() * 70) + 10; // 10% - 80%
    const randomColor = balloonColors[Math.floor(Math.random() * balloonColors.length)];
    
    balloon.style.left = `${randomLeft}%`;
    balloon.style.backgroundColor = randomColor;

    if (randomColor === '#ffd670' || randomColor === '#b5e2fa') {
        balloon.style.color = '#333';
    }

    balloon.onclick = () => popBalloon(balloon, item);

    // เมื่อลอยหลุดขอบฟ้า ให้ลบออกจากหน้าจอ
    balloon.addEventListener('animationend', () => {
        balloon.remove();
    });

    skyAreaEl.appendChild(balloon);
}

function popBalloon(element, item) {
    if (element.classList.contains('pop') || element.classList.contains('wrong')) return;

    if (item.isCorrect) {
        score += 5; // จิ้มถูก +5 คะแนน
        remainingCorrectInRound--;
        
        scoreDisplayEl.innerText = score;
        statusMessageEl.innerText = `ถูกต้อง! คำว่า "${item.word}" คล้องจองกัน! (+5 คะแนน)`;
        statusMessageEl.style.color = "#28a745";

        element.classList.add('pop');
        item.isCorrect = false; // ป้องกันการจิ้มตัวเดิมซ้ำ

        // เมื่อหาคำที่ถูกต้องครบ 2 คำในหัวข้อนี้แล้ว
        if (remainingCorrectInRound === 0) {
            if (spawnTimer) clearInterval(spawnTimer);
            statusMessageEl.innerText = "เก่งมาก! หาคำคล้องจองครบทั้ง 2 คำแล้ว ไปหัวข้อถัดไปกันเลย";
            
            setTimeout(() => {
                currentRound++;
                loadRound();
            }, 1500);
        }
    } else {
        // จิ้มผิด จิ้มกี่ครั้งก็ได้ เปลี่ยนเป็นสีเทาและแจ้งข้อความ
        element.classList.add('wrong');
        element.innerText = "☹️ ไม่ใช่";
        statusMessageEl.innerText = `คำว่า "${item.word}" ยังไม่ถูกต้องครับ ลองหาคำอื่นดูนะ!`;
        statusMessageEl.style.color = "#dc3545";
    }
}

function finishGame() {
    if (spawnTimer) clearInterval(spawnTimer);
    document.querySelector('.game-area').style.display = 'none';
    document.querySelector('.game-header').style.display = 'none';
    statusMessageEl.style.display = 'none';

    endScreenEl.classList.remove('hidden');
    document.getElementById('final-balloon-score').innerText = `คุณได้คะแนนรวม ${score} คะแนนเต็ม! 🎉`;
}