import './style.css';

const scoreTable = document.getElementById('scoreList');
const userName = document.getElementById('name');
const userScore = document.getElementById('score');
const submitBtn = document.getElementById('submitBtn');
const refreshBtn = document.getElementById('refresh');
const getLink = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/RuYeeftBrKGkqg3FQ9Ck/scores/';

const postScores = async(name, num) => {
  const response = await fetch(getLink, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: name,
      score: num,
    }),
  });
  return response.json();
};

const getScores = async (url) => {
  const response = await fetch(url);
  return response.json();
};

function addToScoreBord(user, score) {
  const li = document.createElement('li');
  li.textContent = `${user} : ${score}`;
  scoreTable.appendChild(li);
}

function validAddToScreen(str) {
  if (str) {
    addToScoreBord(userName.value, userScore.value);
    userName.value = '';
    userScore.value = '';
  }
}

function validateToPost() {
  if (userName.value !== '' && userScore.value !== '') {
    postScores(userName.value, userScore.value)
      .then(data => validAddToScreen(data.result));
  }
}

function displayScores() {
  getScores(getLink)
    .then(data => {
      scoreTable.innerHTML = '';
      data.result.forEach(elem => addToScoreBord(elem.user, elem.score));
    });
}

displayScores();
submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  validateToPost();
});
refreshBtn.addEventListener('click', displayScores);