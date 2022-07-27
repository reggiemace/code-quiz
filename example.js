var highScores = JSON.parse(localStorage.getItem('scores')) || [];

highScores.push({
    initials: 'JJ',
    score: 100
});

localStorage.setItem('scores', JSON.stringify(highScores));
