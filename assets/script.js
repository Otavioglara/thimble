const cups = [1, 2, 3];
let ballPosition;
let gameInProgress = false;

document.getElementById("bet-button").addEventListener("click", startGame)
    const limite = 1;
        let contador = 0;
        const botao = document.getElementById("bet-button");

        botao.addEventListener("click", () => {
            contador++;
            if (contador >= limite) {
                botao.disabled = true;

                setTimeout(() => {
                    contador = 0;
                    botao.disabled = false
                }, 12500);
            }             
        })
;
function startGame() {
    document.getElementById("result").textContent = "";
    document.getElementById("instruction").textContent = "Olhe onde está a bolinha!";
    gameInProgress = true;

  
    moveBallToRandomCup();
    document.getElementById(`ball${ballPosition}`).style.display = "block";

    setTimeout(() => {
        document.getElementById("instruction").textContent = "Vamos embaralhar!";
        
        
        cups.forEach(cup => {
            document.getElementById(`ball${cup}`).style.display = "none";
        });

        shuffleCups();
    }, 2000);
}

function moveBallToRandomCup() {
   
    let newBallPosition;
    do {
        newBallPosition = Math.floor(Math.random() * cups.length) + 1;
    } while (newBallPosition === ballPosition); 

    ballPosition = newBallPosition;
}

function shuffleCups() {
    let shuffleCount = 0;
    const interval = setInterval(() => {
        randomizeCupPositions();

       
        moveBallToRandomCup();
        cups.forEach(cup => {
            document.getElementById(`ball${cup}`).style.display = "none";
        });

        shuffleCount++;
        if (shuffleCount === 15) {
            clearInterval(interval);
            resetCupPositions();
            document.getElementById("instruction").textContent = "Escolha um copo!";
            enableCupSelection(); 
        }
    }, 400);
}

function enableCupSelection() {

    cups.forEach(cup => {
        const cupElement = document.getElementById(`cup${cup}`);
        cupElement.addEventListener("click", () => guessCup(cup));
    });
}

function randomizeCupPositions() {
    const positions = [-100, 0, 100];
    const shuffledPositions = positions.sort(() => Math.random() - 0.5);

    cups.forEach((cup, index) => {
        const cupElement = document.getElementById(`cup${cup}`);
        cupElement.style.transition = "transform 0.3s ease";
        cupElement.style.transform = `translateX(${shuffledPositions[index]}px)`;
    });
}

function resetCupPositions() {
    cups.forEach((cup, index) => {
        const cupElement = document.getElementById(`cup${cup}`);
        cupElement.style.transition = "transform 0.5s ease";
        cupElement.style.transform = `translateX(${index * 5 - 5}px)`;
    });
}

function guessCup(selectedCup) {
    if (!gameInProgress) return;

    gameInProgress = false;

    document.getElementById(`ball${ballPosition}`).style.display = "block";

    if (selectedCup === ballPosition) {
        document.getElementById("result").textContent = "Parabéns! Você acertou!";
    } else {
        document.getElementById("result").textContent = `Você errou! A bola estava no copo ${ballPosition}.`;
    }

    
    setTimeout(() => {
        cups.forEach(cup => {
            document.getElementById(`ball${cup}`).style.display = "none";
        });
    }, 3000);
}
