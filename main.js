document.addEventListener("DOMContentLoaded", () => {
    const duck = document.getElementById("duck");
    const playerScoreBoard = document.getElementById("player-score");
    const bestScoreBoard = document.getElementById("best-score");
    const timeRemainingBoard = document.getElementById("time-remaining");
    const resetButton = document.getElementById("reset-game");
    const gameArea = document.getElementById("game-area");

    let playerScore = 0;
    let bestScore = localStorage.getItem("bestScore") || 0;
    let gameTimer;
    let isActive = false;
    let timeRemaining = 30;

    bestScoreBoard.textContent = bestScore;

    function moveDuck() {
        const areaWidth = gameArea.clientWidth;
        const areaHeight = gameArea.clientHeight;

        const randomX = Math.random() * (areaWidth - 100);
        const randomY = Math.random() * (areaHeight - 100);

        duck.style.left = `${randomX}px`;
        duck.style.top = `${randomY}px`;
    }

    function updateScore(isHit) {
        if (isHit) {
            playerScore++;
        } else {
            playerScore--;
        }
        playerScoreBoard.textContent = playerScore;
        updateBestScore();
    }

    function updateBestScore() {
        if (playerScore > bestScore) {
            bestScore = playerScore;
            bestScoreBoard.textContent = bestScore;
            localStorage.setItem("bestScore", bestScore);
        }
    }

    function endGame() {
        clearInterval(gameTimer);
        isActive = false;
        alert(`¡El juego ha terminado! Tu puntaje final es: ${playerScore}`);
        duck.style.display = "none";
    }

    function startGameTimer() {
        if (!isActive) {
            isActive = true;
            gameTimer = setInterval(() => {
                timeRemaining--;
                timeRemainingBoard.textContent = timeRemaining;
                if (timeRemaining <= 0) {
                    endGame();
                }
            }, 1000);
        }
    }

    duck.addEventListener("click", () => {
        if (isActive) {
            updateScore(true);
            moveDuck();
        } else {
            startGameTimer();
            moveDuck();
        }
    });

    gameArea.addEventListener("click", (e) => {
        if (isActive && e.target !== duck) {
            updateScore(false);
        }
    });

    resetButton.addEventListener("click", () => {
        clearInterval(gameTimer);
        playerScore = 0;
        timeRemaining = 15;
        timeRemainingBoard.textContent = timeRemaining;
        playerScoreBoard.textContent = playerScore;
        duck.style.display = "block";
        isActive = false;
        moveDuck();
    });

    moveDuck();
});