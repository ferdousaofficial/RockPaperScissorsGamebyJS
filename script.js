// ** musics for evey situation
const click = new Audio("./music/click.wav");
const gameTie = new Audio("./music/game_tie.wav");
const gameWin = new Audio("./music/game_win.wav");
const gameLose = new Audio("./music/game_lose.wav");

const totalScore = { computerScore: 0, playerScore: 0 };

// **This function will randomly select one of rock, paper, or scissors**
function getComputerChoice() {
  const rpsChoice = ["Rock", "Paper", "Scissors"];
  const randomNumber = Math.floor(Math.random() * 3);
  return rpsChoice[randomNumber];
}

// **This function compares the player's choice and the computer's choice, and determines the outcome of the game**
function getResult(playerChoice, computerChoice) {
  let score;
  switch (playerChoice) {
    case computerChoice:
      score = 0;
      break;
    case "Rock":
      score = computerChoice === "Scissors" ? 1 : -1;
      break;
    case "Paper":
      score = computerChoice === "Rock" ? 1 : -1;
      break;
    case "Scissors":
      score = computerChoice === "Paper" ? 1 : -1;
      break;
    default:
      score = -1;
  }

  return score;
}

// ** this function update the DOM and also show player's choice vs computer's choice **
function showResult(score, playerChoice, computerChoice) {
  const resultDiv = document.getElementById("result");
  const handsDiv = document.getElementById("hands");
  const playerScoreDIv = document.getElementById("player-score");

  if (score == 1) {
    resultDiv.innerHTML = "You won! 🥳";
    gameWin.play();
  } else if (score == -1) {
    resultDiv.innerHTML = "You lose! ☹️";
    gameLose.play();
  } else {
    resultDiv.innerHTML = "It's tie! 🙁";
    gameTie.play();
  }

  handsDiv.innerText = `🙍‍♂️${playerChoice} VS 🤖${computerChoice}`;
  playerScoreDIv.innerText = `Your score is: ${totalScore["playerScore"]}`;
}

// ** This function calculate who is the winner and display it. **
function onClickRPS(playerChoice) {
  const computerChoice = getComputerChoice();
  const score = getResult(playerChoice, computerChoice);
  totalScore["playerScore"] += score;

  showResult(score, playerChoice, computerChoice);
}

// ** This function activates the RPS btns and detects the value of the button clicked by the player **
function playGame() {
  const rpsButtons = document.querySelectorAll(".rpsButton");

  rpsButtons.forEach((rpsButton) => {
    rpsButton.onclick = () => {
      click.play();
      onClickRPS(rpsButton.value);
    };
  });

  const endGameButton = document.getElementById("endGameButton");
  endGameButton.onclick = () => endGame(totalScore);
}

// ** This function cleas  all the texts on the DOM **
function endGame(totalScore) {
  totalScore["playerScore"] = 0;
  totalScore["computerScore"] = 0;

  const resultDiv = document.getElementById("result");
  const handsDiv = document.getElementById("hands");
  const playerScoreDIv = document.getElementById("player-score");

  resultDiv.innerHTML = "";
  handsDiv.innerHTML = "";
  playerScoreDIv.innerHTML = "";
  click.play();
}

playGame();
