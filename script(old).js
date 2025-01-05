findFiles();

function findFiles() {
  fetch('fileNames.json')
    .then(response => response.text())
    .then(json => {
      processFiles(JSON.parse(json));
    });
}

function processFiles(json) {
  doc = document.getElementById('quiz');

  subtitle = document.getElementById('subtitle');
  subObj = document.createElement('div');
  subText = document.createTextNode('Select year');
  subObj.append(subText);
  subtitle.append(subObj);

  main = document.createElement('div');
  main.setAttribute('class', 'centered');
  doc.append(main);

  json.years.forEach(year => {
    let button = document.createElement('button');
    let text = document.createTextNode(year.year);
    button.setAttribute('class', 'unit');
    button.appendChild(text);
    button.onclick = function () {
      doc.innerHTML = '';
      mainMenu(year);
    };
    main.appendChild(button);
  });
}

function process(year, unit) {
  fetch('JSON/' + year + '/' + unit + '.json')
    .then(response => response.text())
    .then(json => {
      quiz(JSON.parse(json));
    });
}

function mainMenu(json) {
  let doc = document.getElementById('quiz');

  let extra = document.getElementById('extra');
  extra.innerHTML = '';

  let subtitle = document.getElementById('subtitle');
  let subObj = document.createElement('div');
  let subtitleText = document.createTextNode('Select a quiz');
  subtitle.innerHTML = '';
  subObj.append(subtitleText);
  subtitle.append(subObj);

  let unitPara = document.createElement('div');
  unitPara.setAttribute('class', 'centered');
  units = json.units;
  units.forEach(unit => {
    let button = document.createElement('button');
    let text = document.createTextNode(unit);
    button.setAttribute('class', 'unit');
    button.appendChild(text);
    button.onclick = function () {
      doc.innerHTML = '';
      process(json.year, unit);
    };
    unitPara.appendChild(button);
  });
  doc.append(unitPara);
}

function quiz(quiz) {
  let dom = document.getElementById('quiz');
  let subtitle = document.getElementById('subtitle');
  let extra = document.getElementById('extra');

  dom.innerHTML = '';
  subtitle.innerHTML = '';
  let div = document.createElement('div');
  div.setAttribute('id', 'questions');
  let questions = shuffle(quiz.vocab);
  let stats = {
    index: questions.length - 1,
    correct: 0,
  };

  let title = document.createElement('div');
  title.setAttribute('class', 'unit');
  let titleText = document.createTextNode(quiz.unit);
  title.append(titleText);
  subtitle.append(title);

  let progress = document.createElement('progress');
  progress.setAttribute('id', 'progress');
  progress.setAttribute('max', questions.length);
  progress.setAttribute('value', 0);
  subtitle.append(progress);

  dom.append(div);
  generateQuestion(questions, stats);
}

function generateQuestion(quiz, stats) {
  if (stats.index === -1) endQuiz(quiz.length, stats);

  let wrong = shuffle([...quiz]);
  let options = [wrong[0], wrong[1], wrong[2], wrong[3]];
  let answer = quiz[stats.index];
  if (options.indexOf(answer) === -1) {
    let rand = Math.trunc(Math.random() * 4);
    options[rand] = answer;
  }

  let rand = Math.random() >= 0.5;
  let japanese = answer.kana;
  if (answer.kanji !== '') japanese = answer.kanji;
  let question =
    '#' +
    (quiz.length - stats.index) +
    ' Translate: ' +
    (rand ? japanese : answer.english);

  let div = document.getElementById('questions');
  let questionObj = document.createElement('div');
  questionObj.setAttribute('class', 'centered');
  let questionText = document.createTextNode(question);
  questionObj.append(questionText);
  div.append(questionObj);
  options.forEach(option => {
    let button = document.createElement('button');
    button.setAttribute('class', 'option');
    japanese = option.kana;
    if (option.kanji !== '') japanese = option.kanji;
    let opTxt = rand ? option.english : japanese;
    let text = document.createTextNode(opTxt);
    button.appendChild(text);
    button.onclick = function () {
      checkAnswer(option === answer, quiz, stats);
    };
    div.appendChild(button);

    let progress = document.getElementById('progress');
    progress.setAttribute('value', quiz.length - stats.index - 1);
  });

  let extra = document.getElementById('extra');
  let button = document.createElement('button');
  button.setAttribute('class', 'small');
  let buttonText = document.createTextNode('End quiz');
  button.append(buttonText);
  button.onclick = function () {
    div.innerHTML = '';
    extra.innerHTML = '';
    endQuiz(quiz.length - stats.index - 1, stats);
  };
  extra.append(button);
}

function endQuiz(total, stats) {
  let quiz = document.getElementById('quiz');
  let subtitle = document.getElementById('subtitle');
  quiz.innerHTML = '';

  let end = document.createElement('div');
  end.setAttribute('class', 'large');
  let endText = document.createTextNode('Congratulations!');
  end.append(endText);
  quiz.append(end);

  let statsObj = document.createElement('div');
  let endStats = document.createTextNode(
    'Your score is: ' +
      stats.correct +
      '/' +
      total +
      ' (' +
      (total !== 0 ? (stats.correct / total) * 100 : 0) +
      '%)'
  );
  statsObj.append(endStats);
  quiz.append(statsObj);

  let mainMenu = document.createElement('button');
  let menuTxt = document.createTextNode('Main menu');
  mainMenu.onclick = function () {
    quiz.innerHTML = '';
    subtitle.innerHTML = '';
    findFiles();
  };
  mainMenu.append(menuTxt);
  quiz.append(mainMenu);
}

function checkAnswer(isCorrect, quiz, stats) {
  let div = document.getElementById('questions');
  let extra = document.getElementById('extra');
  div.innerHTML = '';
  extra.innerHTML = '';
  transition = document.createElement('div');
  transition.setAttribute('class', 'centered');
  div.append(transition);

  let title = document.createElement('div');
  title.setAttribute('class', 'unit');
  let answer = quiz[stats.index];
  stats.index--;
  if (isCorrect) {
    div.style.color = 'green';
    let titleTxt = document.createTextNode('Correct');
    title.append(titleTxt);
    stats.correct++;
  } else {
    div.style.color = 'red';
    let titleTxt = document.createTextNode('Wrong');
    title.append(titleTxt);
  }
  let answerTxt = document.createElement('ruby');
  if (answer.kanji !== '') {
    answerTxt.append(document.createTextNode(answer.kanji));
    let ruby = document.createElement('rt');
    ruby.append(document.createTextNode(answer.kana));
    answerTxt.append(ruby);
  } else {
    answerTxt.append(document.createTextNode(answer.kana));
  }
  let answerObj = document.createElement('div');
  answerObj.append(answerTxt);
  transition.append(title);
  transition.append(answerObj);

  let cont = document.createElement('button');
  let text = document.createTextNode('Continue');
  cont.onclick = function () {
    div.style.color = 'black';
    div.innerHTML = '';
    generateQuestion(quiz, stats);
  };
  cont.append(text);
  transition.append(cont);
}

function shuffle(array) {
  let curIndex = array.length;
  let arr = [...array];

  while (curIndex !== 0) {
    let randIndex = Math.floor(Math.random() * curIndex);
    curIndex--;
    [arr[curIndex], arr[randIndex]] = [arr[randIndex], arr[curIndex]];
  }
  return arr;
}

function CreateButton(text, buttonClass, onClick) {
  let button = document.createElement('button');
  let buttonText = document.createTextNode(text);
  button.onClick = onClick;
  button.setAttribute('class', buttonClass);
  button.append(buttonText);
  return button;
}
