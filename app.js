/* ===== State ===== */
const STORAGE_KEY = 'jpmaster_progress_v2';
const ACTIVITY_KEY = 'jpmaster_activity_v2';
const STREAK_KEY = 'jpmaster_streak_v2';

let state = loadState();
let activityLog = loadActivity();
let streakData = loadStreak();

/* ===== Persistence ===== */
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  const s = { vocab: {}, kanji: {}, xp: 0, totalStudied: 0 };
  VOCABULARY.forEach(v => { s.vocab[v.id] = createInitialProgress(v.id); });
  KANJI.forEach(k => { s.kanji[k.id] = createInitialProgress(k.id); });
  return s;
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadActivity() {
  try {
    const raw = localStorage.getItem(ACTIVITY_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return {};
}

function saveActivity() {
  localStorage.setItem(ACTIVITY_KEY, JSON.stringify(activityLog));
}

function loadStreak() {
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return { count: 0, lastDate: null };
}

function saveStreak() {
  localStorage.setItem(STREAK_KEY, JSON.stringify(streakData));
}

function recordActivity(count) {
  const today = new Date().toISOString().split('T')[0];
  activityLog[today] = (activityLog[today] || 0) + count;
  saveActivity();
  updateStreak();
}

function updateStreak() {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  if (streakData.lastDate === today) return;
  if (streakData.lastDate === yesterday) {
    streakData.count++;
  } else {
    streakData.count = 1;
  }
  streakData.lastDate = today;
  saveStreak();
  document.getElementById('streakCount').textContent = streakData.count;
}

/* ===== Navigation ===== */
const views = document.querySelectorAll('.view');
const navLinks = document.querySelectorAll('.nav-link');

function showView(name) {
  views.forEach(v => v.classList.remove('active'));
  navLinks.forEach(l => l.classList.remove('active'));
  document.getElementById('view-' + name).classList.add('active');
  document.querySelector(`[data-view="${name}"]`)?.classList.add('active');
  if (name === 'dashboard') renderDashboard();
  if (name === 'kanji') renderKanjiGrid();
  if (name === 'vocab') renderVocabTable();
  if (name === 'quiz') renderQuizSetup();
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    showView(link.dataset.view);
    document.getElementById('sidebar').classList.remove('open');
  });
});

document.getElementById('menuToggle').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('open');
});

/* ===== Dashboard ===== */
function renderDashboard() {
  const now = Date.now();
  const today = new Date().toISOString().split('T')[0];

  // XP and studied
  document.getElementById('totalXP').textContent = state.xp + ' XP';
  document.getElementById('totalStudied').textContent = state.totalStudied + ' studied';
  document.getElementById('streakCount').textContent = streakData.count;

  // Due counts
  const due = getDueItems();
  document.getElementById('dueCount').textContent = due.length;
  const newItems = Object.values(state.vocab).filter(p => p.correct === 0 && p.incorrect === 0).slice(0, 10);
  const reviewItems = due.filter(d => {
    const p = state.vocab[d.id] || state.kanji[d.id];
    return p && (p.correct > 0 || p.incorrect > 0);
  });
  document.getElementById('newCount').textContent = newItems.length + ' new';
  document.getElementById('reviewCount').textContent = reviewItems.length + ' review';

  // Daily progress
  const sessionProgress = Math.min(100, (activityLog[today] || 0) / 20 * 100);
  document.getElementById('dailyProgress').style.width = sessionProgress + '%';

  // Mastery ring
  const totalVocab = VOCABULARY.length;
  const masteredVocab = Object.values(state.vocab).filter(p => p.correct >= 3 && p.interval >= 6).length;
  const masteryPct = Math.round(masteredVocab / totalVocab * 100);
  document.getElementById('masteryPct').textContent = masteryPct + '%';
  document.getElementById('masterySubtext').textContent = `${masteredVocab} / ${totalVocab} words mastered`;
  const circumference = 251.2;
  const offset = circumference - (masteryPct / 100) * circumference;
  document.getElementById('masteryRingPath').style.strokeDashoffset = offset;

  // Kanji dots
  const grid = document.getElementById('kanjiProgressGrid');
  grid.innerHTML = '';
  KANJI.forEach(k => {
    const p = state.kanji[k.id];
    const dot = document.createElement('div');
    dot.className = 'kanji-dot';
    if (p.correct >= 3 && p.interval >= 6) dot.classList.add('mastered');
    else if (p.correct >= 1) dot.classList.add('learned');
    dot.title = k.character + ' — ' + k.meaning;
    grid.appendChild(dot);
  });
  const kanjiLearned = Object.values(state.kanji).filter(p => p.correct >= 1).length;
  document.querySelector('.dash-card:nth-child(3) .card-sub').textContent = `${kanjiLearned} / ${KANJI.length} kanji learned`;

  // Activity heatmap (last 70 days)
  const heatmap = document.getElementById('activityHeatmap');
  heatmap.innerHTML = '';
  for (let i = 69; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000).toISOString().split('T')[0];
    const count = activityLog[d] || 0;
    const cell = document.createElement('div');
    cell.className = 'heat-cell';
    if (count >= 30) cell.classList.add('h4');
    else if (count >= 20) cell.classList.add('h3');
    else if (count >= 10) cell.classList.add('h2');
    else if (count >= 1) cell.classList.add('h1');
    cell.title = d + ': ' + count + ' studied';
    heatmap.appendChild(cell);
  }

  // Accuracy
  const allVocab = Object.values(state.vocab);
  const totalCorrect = allVocab.reduce((a, p) => a + p.correct, 0);
  const totalAttempts = allVocab.reduce((a, p) => a + p.correct + p.incorrect, 0);
  const accuracy = totalAttempts ? Math.round(totalCorrect / totalAttempts * 100) : null;
  document.getElementById('accuracyPct').textContent = accuracy !== null ? accuracy + '%' : '—';

  // Accuracy bars by tag
  const accBars = document.getElementById('accuracyBars');
  accBars.innerHTML = '';
  const tagGroups = { daily: [], school: [], work: [], society: [], culture: [] };
  VOCABULARY.forEach(v => {
    v.tags.forEach(t => {
      if (tagGroups[t]) tagGroups[t].push(state.vocab[v.id]);
    });
  });
  Object.entries(tagGroups).forEach(([tag, items]) => {
    const c = items.reduce((a, p) => a + p.correct, 0);
    const tot = items.reduce((a, p) => a + p.correct + p.incorrect, 0);
    const pct = tot ? Math.round(c / tot * 100) : 0;
    const colorMap = { daily: '#4f46e5', school: '#10b981', work: '#f59e0b', society: '#ef4444', culture: '#8b5cf6' };
    accBars.innerHTML += `<div class="acc-bar-row">
      <span class="acc-bar-label">${tag}</span>
      <div class="acc-bar-track"><div class="acc-bar-fill" style="width:${pct}%;background:${colorMap[tag]}"></div></div>
      <span style="font-size:0.72rem;color:#6b7280;width:28px;text-align:right">${tot ? pct + '%' : '—'}</span>
    </div>`;
  });

  // Chapter list
  const chapters = {};
  VOCABULARY.forEach(v => {
    if (!chapters[v.chapter]) chapters[v.chapter] = { total: 0, correct: 0 };
    chapters[v.chapter].total++;
    const p = state.vocab[v.id];
    if (p.correct >= 3) chapters[v.chapter].correct++;
  });
  const chList = document.getElementById('chapterList');
  chList.innerHTML = '';
  Object.entries(chapters).sort((a, b) => +a[0] - +b[0]).forEach(([ch, data]) => {
    const pct = Math.round(data.correct / data.total * 100);
    chList.innerHTML += `<div class="chapter-item">
      <div class="ch-num">${ch}</div>
      <div class="ch-bar-track"><div class="ch-bar-fill" style="width:${pct}%"></div></div>
      <span class="ch-pct">${pct}%</span>
    </div>`;
  });
}

/* ===== Study (Flashcard/SRS) ===== */
let studyQueue = [];
let studyIdx = 0;
let studyCorrect = 0;
let studyIncorrect = 0;
let cardFlipped = false;

function getDueItems() {
  const now = Date.now();
  const due = [];
  VOCABULARY.forEach(v => {
    const p = state.vocab[v.id];
    if (p.nextReview <= now) due.push({ type: 'vocab', id: v.id, data: v });
  });
  return due;
}

function buildStudyQueue() {
  const now = Date.now();
  const due = [];
  VOCABULARY.forEach(v => {
    const p = state.vocab[v.id];
    if (p.nextReview <= now) due.push({ type: 'vocab', id: v.id, data: v });
  });
  // Prioritize unseen, then due
  due.sort((a, b) => {
    const pa = state.vocab[a.id], pb = state.vocab[b.id];
    if ((pa.correct + pa.incorrect) === 0) return -1;
    if ((pb.correct + pb.incorrect) === 0) return 1;
    return pa.nextReview - pb.nextReview;
  });
  return due.slice(0, 20);
}

document.getElementById('startStudyBtn').addEventListener('click', () => {
  startStudy();
  showView('study');
});

document.getElementById('studyBackBtn').addEventListener('click', () => {
  showView('dashboard');
});

document.getElementById('doneBackBtn').addEventListener('click', () => {
  showView('dashboard');
});

function startStudy() {
  studyQueue = buildStudyQueue();
  studyIdx = 0;
  studyCorrect = 0;
  studyIncorrect = 0;
  cardFlipped = false;

  document.getElementById('studyDone').classList.add('hidden');
  document.getElementById('cardScene').style.display = '';
  document.getElementById('answerBtns').classList.add('hidden');
  document.getElementById('flashCard').classList.remove('flipped');

  if (studyQueue.length === 0) {
    showStudyDone();
    return;
  }
  showCard(0);
}

function showCard(idx) {
  if (idx >= studyQueue.length) {
    showStudyDone();
    return;
  }
  cardFlipped = false;
  const item = studyQueue[idx];
  const v = item.data;
  document.getElementById('flashCard').classList.remove('flipped');
  document.getElementById('answerBtns').classList.add('hidden');

  document.getElementById('cardJP').textContent = v.word;
  document.getElementById('cardReading').textContent = v.reading !== v.word ? v.reading : '';
  document.getElementById('cardChapterBadge').textContent = 'Chapter ' + v.chapter;
  document.getElementById('cardMeaning').textContent = v.meaning;
  document.getElementById('cardExample').textContent = v.example;
  document.getElementById('cardExampleEn').textContent = v.exampleEn;
  document.getElementById('cardTags').innerHTML = v.tags.map(t => `<span class="tag-chip">${t}</span>`).join('');

  const pct = Math.round((idx / studyQueue.length) * 100);
  document.getElementById('studyProgressBar').style.width = pct + '%';
  document.getElementById('studyCounter').textContent = `${idx + 1} / ${studyQueue.length}`;
}

document.getElementById('flashCard').addEventListener('click', () => {
  if (cardFlipped) return;
  cardFlipped = true;
  document.getElementById('flashCard').classList.add('flipped');
  document.getElementById('answerBtns').classList.remove('hidden');
});

document.getElementById('answerBtns').addEventListener('click', e => {
  const btn = e.target.closest('[data-quality]');
  if (!btn) return;
  const quality = parseInt(btn.dataset.quality);
  const item = studyQueue[studyIdx];
  const oldProgress = state.vocab[item.id];
  state.vocab[item.id] = updateSM2(oldProgress, quality);
  state.xp += quality >= 3 ? 10 : 2;
  state.totalStudied++;
  if (quality >= 3) studyCorrect++;
  else studyIncorrect++;
  saveState();
  recordActivity(1);
  studyIdx++;
  showCard(studyIdx);
});

function showStudyDone() {
  document.getElementById('cardScene').style.display = 'none';
  document.getElementById('answerBtns').classList.add('hidden');
  document.getElementById('studyDone').classList.remove('hidden');
  const total = studyCorrect + studyIncorrect;
  const pct = total ? Math.round(studyCorrect / total * 100) : 0;
  document.getElementById('doneStats').innerHTML = `
    <div class="done-stat"><div class="done-stat-num">${studyCorrect}</div><div class="done-stat-label">Correct</div></div>
    <div class="done-stat"><div class="done-stat-num">${studyIncorrect}</div><div class="done-stat-label">Incorrect</div></div>
    <div class="done-stat"><div class="done-stat-num">${pct}%</div><div class="done-stat-label">Accuracy</div></div>
  `;
}

/* ===== Quiz ===== */
let quizSettings = { type: 'mc-meaning', content: 'vocab', chapter: 'all', count: 10 };
let quizItems = [];
let quizIdx = 0;
let quizCorrectCount = 0;
let quizIncorrectCount = 0;

function renderQuizSetup() {
  const sel = document.getElementById('quizChapterSelect');
  sel.innerHTML = '<option value="all">All Chapters</option>';
  const chapters = [...new Set(VOCABULARY.map(v => v.chapter))].sort((a, b) => a - b);
  chapters.forEach(ch => {
    sel.innerHTML += `<option value="${ch}">Chapter ${ch}</option>`;
  });
}

// Quiz option pills
document.querySelectorAll('[data-quiz]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-quiz]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    quizSettings.type = btn.dataset.quiz;
  });
});
document.querySelectorAll('[data-content]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-content]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    quizSettings.content = btn.dataset.content;
  });
});
document.querySelectorAll('[data-count]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-count]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    quizSettings.count = parseInt(btn.dataset.count);
  });
});
document.getElementById('quizChapterSelect').addEventListener('change', e => {
  quizSettings.chapter = e.target.value;
});

document.getElementById('startQuizBtn').addEventListener('click', startQuiz);
document.getElementById('quizBackBtn').addEventListener('click', () => {
  document.getElementById('quizGame').classList.add('hidden');
  document.getElementById('quizSetup').style.display = '';
  document.getElementById('quizResults').classList.add('hidden');
});
document.getElementById('retryQuizBtn').addEventListener('click', startQuiz);
document.getElementById('quizDoneBtn').addEventListener('click', () => showView('dashboard'));

function startQuiz() {
  const isFillBlank = quizSettings.type === 'fill-blank';
  const pool = (quizSettings.content === 'vocab' || isFillBlank) ? VOCABULARY : KANJI;
  let filtered = pool;
  if ((quizSettings.content === 'vocab' || isFillBlank) && quizSettings.chapter !== 'all') {
    filtered = pool.filter(v => v.chapter == quizSettings.chapter);
  }
  if (filtered.length < 4) { alert('Not enough items for a quiz in this selection.'); return; }

  quizItems = shuffle([...filtered]).slice(0, quizSettings.count);
  quizIdx = 0;
  quizCorrectCount = 0;
  quizIncorrectCount = 0;

  document.getElementById('quizSetup').style.display = 'none';
  document.getElementById('quizGame').classList.remove('hidden');
  document.getElementById('quizResults').classList.add('hidden');

  showQuizQuestion(0);
}

function showQuizQuestion(idx) {
  if (idx >= quizItems.length) {
    showQuizResults();
    return;
  }
  const item = quizItems[idx];
  const isFillBlank = quizSettings.type === 'fill-blank';
  const pool = (quizSettings.content === 'vocab' || isFillBlank) ? VOCABULARY : KANJI;

  document.getElementById('quizProgressBar').style.width = (idx / quizItems.length * 100) + '%';
  document.getElementById('quizCounter').textContent = `${idx + 1} / ${quizItems.length}`;
  document.getElementById('quizCorrect').textContent = `✓ ${quizCorrectCount}`;
  document.getElementById('quizIncorrect').textContent = `✗ ${quizIncorrectCount}`;
  document.getElementById('quizFeedback').classList.add('hidden');

  const { questionText, questionReading, correctAnswer, questionLabel } = buildQuestion(item);
  document.getElementById('questionLabel').textContent = questionLabel;

  const qWordEl = document.getElementById('questionWord');
  qWordEl.classList.toggle('is-sentence', isFillBlank);
  if (isFillBlank) {
    const blankHtml = item.example.replace(item.word, '<span class="blank-token">＿＿＿</span>');
    qWordEl.innerHTML = blankHtml;
  } else {
    qWordEl.textContent = questionText;
  }
  document.getElementById('questionReading').textContent = questionReading;

  // Wrong answers
  const wrongPool = (isFillBlank ? VOCABULARY : pool).filter(p => p.id !== item.id);
  const wrongs = shuffle(wrongPool).slice(0, 3).map(p => buildAnswer(p));
  const choices = shuffle([correctAnswer, ...wrongs]);

  const choicesEl = document.getElementById('quizChoices');
  choicesEl.innerHTML = '';
  choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = choice;
    btn.addEventListener('click', () => handleQuizAnswer(btn, choice, correctAnswer, item));
    choicesEl.appendChild(btn);
  });
}

function buildQuestion(item) {
  const type = quizSettings.type;
  const isVocab = quizSettings.content === 'vocab';
  let questionText, questionReading = '', correctAnswer, questionLabel;

  if (type === 'mc-meaning') {
    questionLabel = 'What is the meaning of:';
    questionText = isVocab ? item.word : item.character;
    questionReading = isVocab ? item.reading : item.onyomi;
    correctAnswer = isVocab ? item.meaning : item.meaning;
  } else if (type === 'mc-reading') {
    questionLabel = 'What is the reading of:';
    questionText = isVocab ? item.word : item.character;
    questionReading = '';
    correctAnswer = isVocab ? item.reading : item.onyomi;
  } else if (type === 'fill-blank') {
    questionLabel = 'Fill in the blank:';
    questionText = item.example;
    questionReading = '';
    correctAnswer = item.word;
  } else {
    questionLabel = 'Which word means:';
    questionText = isVocab ? item.meaning : item.meaning;
    questionReading = '';
    correctAnswer = isVocab ? item.word : item.character;
  }
  return { questionText, questionReading, correctAnswer, questionLabel };
}

function buildAnswer(item) {
  const type = quizSettings.type;
  const isVocab = quizSettings.content === 'vocab' || type === 'fill-blank';
  if (type === 'mc-meaning') return isVocab ? item.meaning : item.meaning;
  if (type === 'mc-reading') return isVocab ? item.reading : item.onyomi;
  if (type === 'fill-blank') return item.word;
  return isVocab ? item.word : item.character;
}

function handleQuizAnswer(btn, choice, correct, item) {
  const allBtns = document.querySelectorAll('.choice-btn');
  allBtns.forEach(b => {
    b.disabled = true;
    if (b.textContent === correct) b.classList.add('correct');
  });

  const isCorrect = choice === correct;
  const useVocab = quizSettings.content === 'vocab' || quizSettings.type === 'fill-blank';
  if (!isCorrect) {
    btn.classList.add('wrong');
    quizIncorrectCount++;
    if (useVocab) {
      state.vocab[item.id] = updateSM2(state.vocab[item.id], 1);
    } else {
      state.kanji[item.id] = updateSM2(state.kanji[item.id], 1);
    }
  } else {
    quizCorrectCount++;
    state.xp += 5;
    if (useVocab) {
      state.vocab[item.id] = updateSM2(state.vocab[item.id], 4);
    } else {
      state.kanji[item.id] = updateSM2(state.kanji[item.id], 4);
    }
  }
  state.totalStudied++;
  saveState();
  recordActivity(1);

  const feedback = document.getElementById('quizFeedback');
  document.getElementById('feedbackIcon').textContent = isCorrect ? '✓' : '✗';
  feedback.style.borderColor = isCorrect ? 'var(--success)' : 'var(--danger)';
  document.getElementById('feedbackText').textContent = isCorrect
    ? 'Correct!'
    : `Correct answer: ${correct}`;
  feedback.classList.remove('hidden');

  document.getElementById('quizCorrect').textContent = `✓ ${quizCorrectCount}`;
  document.getElementById('quizIncorrect').textContent = `✗ ${quizIncorrectCount}`;
}

document.getElementById('nextQuestionBtn').addEventListener('click', () => {
  quizIdx++;
  showQuizQuestion(quizIdx);
});

function showQuizResults() {
  document.getElementById('quizGame').classList.add('hidden');
  document.getElementById('quizResults').classList.remove('hidden');

  const total = quizCorrectCount + quizIncorrectCount;
  const pct = total ? Math.round(quizCorrectCount / total * 100) : 0;
  const grade = pct >= 90 ? 'A' : pct >= 80 ? 'B' : pct >= 70 ? 'C' : pct >= 60 ? 'D' : 'F';
  const titles = { A: 'Excellent!', B: 'Great Job!', C: 'Good Work!', D: 'Keep Practicing', F: 'Don\'t Give Up!' };

  document.getElementById('resultsGrade').textContent = grade;
  document.getElementById('resultsTitle').textContent = titles[grade];
  document.getElementById('resultsSubtitle').textContent = `You scored ${pct}% on this quiz.`;
  document.getElementById('resCorrect').textContent = quizCorrectCount;
  document.getElementById('resIncorrect').textContent = quizIncorrectCount;
  document.getElementById('resPct').textContent = pct + '%';
}

/* ===== Kanji View ===== */
let kanjiFilter = { level: 'all', search: '' };

function renderKanjiGrid() {
  const grid = document.getElementById('kanjiGrid');
  grid.innerHTML = '';
  const filtered = KANJI.filter(k => {
    const matchLevel = kanjiFilter.level === 'all' || k.level === kanjiFilter.level;
    const q = kanjiFilter.search.toLowerCase();
    const matchSearch = !q || k.character.includes(q) || k.meaning.toLowerCase().includes(q) || k.onyomi.includes(q);
    return matchLevel && matchSearch;
  });
  filtered.forEach(k => {
    const p = state.kanji[k.id];
    const card = document.createElement('div');
    card.className = 'kanji-card';
    if (p.correct >= 3 && p.interval >= 6) card.classList.add('mastered');
    else if (p.correct >= 1) card.classList.add('learned');
    card.innerHTML = `
      <span class="kanji-level-tag">${k.level}</span>
      <div class="kanji-char-big">${k.character}</div>
      <div class="kanji-meaning-sm">${k.meaning}</div>
      <div class="kanji-onyomi-sm">${k.onyomi}</div>
    `;
    card.addEventListener('click', () => openKanjiModal(k));
    grid.appendChild(card);
  });
}

document.querySelectorAll('[data-level]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-level]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    kanjiFilter.level = btn.dataset.level;
    renderKanjiGrid();
  });
});

document.getElementById('kanjiSearch').addEventListener('input', e => {
  kanjiFilter.search = e.target.value;
  renderKanjiGrid();
});

function openKanjiModal(k) {
  document.getElementById('modalKanjiChar').textContent = k.character;
  document.getElementById('modalOnyomi').textContent = k.onyomi;
  document.getElementById('modalKunyomi').textContent = k.kunyomi;
  document.getElementById('modalMeaning').textContent = k.meaning;
  document.getElementById('modalStrokes').textContent = k.strokes;
  document.getElementById('modalLevel').textContent = k.level;
  const exEl = document.getElementById('modalExamples');
  exEl.innerHTML = k.examples.map((ex, i) => `
    <div class="example-item">
      <span class="ex-jp">${ex}</span>
      <span class="ex-en">— ${k.examplesEn[i]}</span>
    </div>`).join('');

  // Mark kanji as seen
  const p = state.kanji[k.id];
  if (p.correct === 0 && p.incorrect === 0) {
    state.kanji[k.id] = updateSM2(p, 3);
    state.totalStudied++;
    saveState();
  }

  document.getElementById('kanjiModal').classList.remove('hidden');
}

document.getElementById('kanjiModalClose').addEventListener('click', () => {
  document.getElementById('kanjiModal').classList.add('hidden');
});
document.getElementById('kanjiModal').addEventListener('click', e => {
  if (e.target === document.getElementById('kanjiModal')) {
    document.getElementById('kanjiModal').classList.add('hidden');
  }
});

/* ===== Vocab View ===== */
let vocabFilter = { tag: 'all', search: '' };

function renderVocabTable() {
  const tbody = document.getElementById('vocabTableBody');
  tbody.innerHTML = '';
  const filtered = VOCABULARY.filter(v => {
    const matchTag = vocabFilter.tag === 'all' || v.tags.includes(vocabFilter.tag);
    const q = vocabFilter.search.toLowerCase();
    const matchSearch = !q || v.word.includes(q) || v.reading.includes(q) || v.meaning.toLowerCase().includes(q) || v.romaji.includes(q);
    return matchTag && matchSearch;
  });
  filtered.forEach(v => {
    const p = state.vocab[v.id];
    let statusClass = 'status-new', statusText = 'New';
    if (p.correct >= 3 && p.interval >= 6) { statusClass = 'status-mastered'; statusText = 'Mastered'; }
    else if (p.correct >= 1) { statusClass = 'status-learning'; statusText = 'Learning'; }
    tbody.innerHTML += `<tr>
      <td><span class="vocab-word-jp">${v.word}</span></td>
      <td><span class="vocab-reading">${v.reading}</span></td>
      <td>${v.meaning}</td>
      <td>Ch. ${v.chapter}</td>
      <td><span class="status-badge ${statusClass}">${statusText}</span></td>
    </tr>`;
  });
}

document.querySelectorAll('#vocabTagFilters .filter-pill').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#vocabTagFilters .filter-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    vocabFilter.tag = btn.dataset.tag;
    renderVocabTable();
  });
});

document.getElementById('vocabSearch').addEventListener('input', e => {
  vocabFilter.search = e.target.value;
  renderVocabTable();
});

/* ===== Export / Import ===== */
document.getElementById('exportBtn').addEventListener('click', () => {
  const bundle = { state, activityLog, streakData, exportedAt: new Date().toISOString() };
  const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const date = new Date().toISOString().split('T')[0];
  a.href = url;
  a.download = `jpmaster-progress-${date}.json`;
  a.click();
  URL.revokeObjectURL(url);
});

document.getElementById('importFile').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = evt => {
    try {
      const bundle = JSON.parse(evt.target.result);
      if (!bundle.state || !bundle.state.vocab) throw new Error('Invalid file');
      state = bundle.state;
      activityLog = bundle.activityLog || {};
      streakData = bundle.streakData || { count: 0, lastDate: null };
      saveState();
      saveActivity();
      saveStreak();
      document.getElementById('streakCount').textContent = streakData.count;
      document.getElementById('totalXP').textContent = state.xp + ' XP';
      document.getElementById('totalStudied').textContent = state.totalStudied + ' studied';
      renderDashboard();
      alert('Progress loaded successfully!');
    } catch {
      alert('Could not load file — make sure it is a valid progress export.');
    }
    e.target.value = '';
  };
  reader.readAsText(file);
});

/* ===== Utilities ===== */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ===== Init ===== */
document.getElementById('streakCount').textContent = streakData.count;
document.getElementById('totalXP').textContent = state.xp + ' XP';
document.getElementById('totalStudied').textContent = state.totalStudied + ' studied';
renderDashboard();
renderQuizSetup();
