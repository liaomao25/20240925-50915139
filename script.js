// 初始化兩組不同主題的圖片
const themes = {
    theme1: [
        'https://s.yimg.com/ny/api/res/1.2/SkHHHMt.HsKzgpDBw0TvEQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTQ4MA--/https://media.zenfs.com/zh-tw/petsmao_nownews_707/feb39d64eeb0067d709a07f9422545d8',
        'https://media.gq.com.tw/photos/60226dd5b88b7f80a2d4bcbf/16:9/w_2560%2Cc_limit/846f533335fe83fd15b099fb1862ceed.jpg',
        'https://image.blocktempo.com/2023/08/1672888853501779-1024x697-1.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj11XIK5PECVRF24UO-BPfnpl8tvtYZYLaGw&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6wZEnXZl6jGTCblWgvpdqIBRt7_QM_KLMhg&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdQdWysxsfMQ3Lsuzgpv-I4U7KHcw03ngmFg&s',
        'https://memeprod.ap-south-1.linodeobjects.com/user-template-thumbnail/84dc996d7db862b28fc0db4cafd4e344.jpg',
        'https://memeprod.ap-south-1.linodeobjects.com/user-template-thumbnail/58e104a9d76161bff6343fb0e5c3cda9.jpg'
    ],
    theme2: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfHJL4y6E0Ps6voeKXWnbQzNUEknoXGQCwuA&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM1cDnT1Q5ZrkfLfxiSgFvC2ZsjpngynJGvg&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvCW6gQaavw2toeF-2b5V6YCFvq4Kpip5ivQ&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_Z4xPQJqZtvQ9lE_KjxD-USwDdWfxwbJxBg&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzQV6u6qBsB5ENmyw2JvRqoNrMYXFbij0DLw&s',
        'https://images.squarespace-cdn.com/content/v1/607f89e638219e13eee71b1e/1684821560422-SD5V37BAG28BURTLIXUQ/michael-sum-LEpfefQf4rU-unsplash.jpg',
        'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        'https://media.istockphoto.com/id/1361394182/zh/%E7%85%A7%E7%89%87/funny-british-shorthair-cat-portrait-looking-shocked-or-surprised.jpg?s=612x612&w=0&k=20&c=aXH2HqDUhGSPa8G9ofry1IJLHJI_JWFH14jn-dFzOpo='
    ]
};

let currentTheme = 'theme1';  // 預設主題
let isGameStarted = false;
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;
let scoreElement = document.getElementById('score');

const container = document.querySelector('.container');
const timerElement = document.getElementById('timer');

function generateCards() {
    container.innerHTML = '';  // 清空現有卡片

    let cards = [];
    themes[currentTheme].forEach((img) => {
        for (let i = 0; i < 2; i++) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <div class="card-inner" data-image="${img}">
                    <div class="card-front">
                        <img src="${img}" alt="image" style="width:100%; height:100%; border-radius: 10px;">
                    </div>
                    <div class="card-back">
                        Back
                    </div>
                </div>
            `;
            cards.push(card);
        }
    });

    // 隨機排列卡片
    cards = cards.sort(() => Math.random() - 0.5);
    cards.forEach(card => container.appendChild(card));

    // 添加翻轉效果
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => flipCard(card));
    });
}

function flipCard(card) {
    if (lockBoard || card === firstCard) return;

    card.classList.add('flip');
    if (!firstCard) {
        firstCard = card;
    } else {
        secondCard = card;
        checkForMatch();
    }
}

function checkForMatch() {
    lockBoard = true;
    let isMatch = firstCard.querySelector('.card-inner').dataset.image === secondCard.querySelector('.card-inner').dataset.image;

    if (isMatch) {
        disableCards();
        matches++;
        scoreElement.textContent = `得分: ${matches}`;
        if (matches === themes[currentTheme].length) {
            alert("你贏了！");
            resetGame();
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', () => flipCard(firstCard));
    secondCard.removeEventListener('click', () => flipCard(secondCard));
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function resetGame() {
    isGameStarted = false;
    matches = 0;
    scoreElement.textContent = `得分: ${matches}`;
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('flip');
    });
}

document.getElementById('flip-front').addEventListener('click', () => {
    document.querySelectorAll('.card').forEach(card => {
        card.classList.add('flip');
    });
});

document.getElementById('flip-back').addEventListener('click', () => {
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('flip');
    });
});

document.getElementById('switch-theme').addEventListener('click', () => {
    currentTheme = currentTheme === 'theme1' ? 'theme2' : 'theme1';
    if (!isGameStarted) {
        generateCards();
    }
});

document.getElementById('start-game').addEventListener('click', () => {
    if (!isGameStarted) {
        isGameStarted = true;
        generateCards();
        document.querySelectorAll('.card').forEach(card => {
            card.classList.remove('flip');
        });

        let countdown = 10;
        timerElement.textContent = `倒數: ${countdown}`;
        
        const countdownInterval = setInterval(() => {
            countdown--;
            timerElement.textContent = `倒數: ${countdown}`;
            if (countdown === 0) {
                clearInterval(countdownInterval);
                document.querySelectorAll('.card').forEach(card => {
                    card.classList.add('flip');
                });
            }
        }, 1000);
    }
});

document.getElementById('restart-game').addEventListener('click', () => {
    resetGame();
    generateCards();
});
