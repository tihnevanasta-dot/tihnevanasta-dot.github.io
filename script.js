
        const userNameElement = document.getElementById('user-name');
        const userScoreElement = document.getElementById('user-score');
        const userNumberElement = document.getElementById('user-number');
        const computerScoreElement = document.getElementById('computer-score');
        const computerNumberElement = document.getElementById('computer-number');
        const generateBtn = document.getElementById('generate-btn');
        const resetBtn = document.getElementById('reset-btn');
        const roundResultElement = document.getElementById('round-result');
        const resultElement = document.getElementById('result');
        let userName = '';
        let userScore = 0;
        let computerScore = 0;
        let gameOver = false;
        function getUserName() {
            let name = '';
            while (!name || name.trim() === '') {
                name = prompt('Будь ласка, введіть ваше ім\'я:');
                if (name === null) {
                    name = 'Гравець';
                }
            }
            return name.trim();
        }
        function initGame() {
            userName = getUserName();
            userNameElement.textContent = userName;
            userScore = 0;
            computerScore = 0;
            gameOver = false;
            updateScores();
            resetNumbers();
            roundResultElement.textContent = '';
            resultElement.textContent = '';
            generateBtn.disabled = false;
            userNumberElement.classList.remove('winner');
            computerNumberElement.classList.remove('winner');
        }
        function updateScores() {
            userScoreElement.textContent = userScore;
            computerScoreElement.textContent = computerScore;
        }
        function resetNumbers() {
            userNumberElement.textContent = '-';
            computerNumberElement.textContent = '-';
        }
        function generateRandomNumber() {
            return Math.floor(Math.random() * 12) + 1;
        }
        function checkGameOver() {
            if (userScore >= 3 || computerScore >= 3) {
                gameOver = true;
                generateBtn.disabled = true;     
                let winnerMessage = '';
                if (userScore > computerScore) {
                    winnerMessage = `Вітаємо, ${userName} переміг(ла) з рахунком ${userScore}:${computerScore}!`;
                } else {
                    winnerMessage = `Комп'ютер переміг з рахунком ${computerScore}:${userScore}. Спробуйте ще раз!`;
                }  
                resultElement.textContent = winnerMessage;
                return true;
            }
            return false;
        }
        generateBtn.addEventListener('click', function() {
            if (gameOver) return;
            const userNumber = generateRandomNumber();
            const computerNumber = generateRandomNumber();
            userNumberElement.textContent = userNumber;
            computerNumberElement.textContent = computerNumber;
            let roundResult = '';
            userNumberElement.classList.remove('winner');
            computerNumberElement.classList.remove('winner');
            if (userNumber > computerNumber) {
                userScore++;
                roundResult = `${userName} виграв(ла) цей раунд!`;
                userNumberElement.classList.add('winner');
            } else if (computerNumber > userNumber) {
                computerScore++;
                roundResult = 'Комп\'ютер виграв цей раунд!';
                computerNumberElement.classList.add('winner');
            } else {
                roundResult = 'Нічия в цьому раунді!';
            }
            updateScores();
            roundResultElement.textContent = roundResult;
            checkGameOver();
        });
        resetBtn.addEventListener('click', initGame);
        window.addEventListener('load', initGame);