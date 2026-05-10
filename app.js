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
    if (raw) {
      const s = JSON.parse(raw);
      if (!s.vocab) s.vocab = {};
      if (!s.kanji) s.kanji = {};
      if (!s.grammar) s.grammar = {};
      VOCABULARY.forEach(v => { if (!s.vocab[v.id]) s.vocab[v.id] = createInitialProgress(v.id); });
      KANJI.forEach(k => { if (!s.kanji[k.id]) s.kanji[k.id] = createInitialProgress(k.id); });
      GRAMMAR.forEach(g => { if (!s.grammar[g.id]) s.grammar[g.id] = createInitialProgress(g.id); });
      return s;
    }
  } catch (e) {}
  const s = { vocab: {}, kanji: {}, grammar: {}, xp: 0, totalStudied: 0 };
  VOCABULARY.forEach(v => { s.vocab[v.id] = createInitialProgress(v.id); });
  KANJI.forEach(k => { s.kanji[k.id] = createInitialProgress(k.id); });
  GRAMMAR.forEach(g => { s.grammar[g.id] = createInitialProgress(g.id); });
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
  if (name === 'grammar') renderGrammarGrid();
  if (name === 'study') { renderPicker(); document.getElementById('studySession').classList.remove('hidden'); document.getElementById('studyDone').classList.add('hidden'); openSetPanel(); }
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

/* ===== Study (Flashcard) ===== */
let studyQueue = [];
let studyIdx = 0;
let studyCorrect = 0;
let studyIncorrect = 0;
let cardFace = 0;
let studyStartFace = 0;
let badItems = [];
let currentSetItems = [];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ---- Picker ---- */
let pickerFilter = { type: 'chapter', chapters: [], tag: null };

const ALL_TAGS = [...new Set(VOCABULARY.flatMap(v => v.tags))].sort();
const ALL_CHAPTERS = [...new Set(VOCABULARY.map(v => v.chapter))].sort((a, b) => a - b);

function renderPicker() {
  const chapEl = document.getElementById('pickerChapters');
  chapEl.innerHTML = ALL_CHAPTERS.map(c =>
    `<button class="picker-val" data-val="${c}">Ch. ${c}</button>`
  ).join('');

  const tagEl = document.getElementById('pickerTags');
  tagEl.innerHTML = ALL_TAGS.map(t =>
    `<button class="picker-val" data-val="${t}">${t}</button>`
  ).join('');

  updatePickerCount();
}

function getFilteredVocab() {
  if (pickerFilter.type === 'chapter') {
    if (pickerFilter.chapters.length === 0) return [];
    return VOCABULARY.filter(v => pickerFilter.chapters.includes(v.chapter));
  }
  if (pickerFilter.type === 'tag') {
    if (!pickerFilter.tag) return [];
    return VOCABULARY.filter(v => v.tags.includes(pickerFilter.tag));
  }
  return [];
}

function updatePickerCount() {
  const n = getFilteredVocab().length;
  const noSelection = pickerFilter.type === 'chapter'
    ? pickerFilter.chapters.length === 0
    : !pickerFilter.tag;
  document.getElementById('pickerCount').textContent = noSelection
    ? 'Select one or more to continue'
    : `${n} word${n !== 1 ? 's' : ''} in this set`;
  document.getElementById('pickerStartBtn').disabled = n === 0;
}

function openSetPanel() {
  document.getElementById('setPanel').classList.remove('collapsed');
  document.getElementById('setToggle').classList.add('open');
}

function closeSetPanel() {
  document.getElementById('setPanel').classList.add('collapsed');
  document.getElementById('setToggle').classList.remove('open');
}

document.getElementById('setToggle').addEventListener('click', () => {
  document.getElementById('setPanel').classList.contains('collapsed') ? openSetPanel() : closeSetPanel();
});

document.getElementById('pickerTypeRow').addEventListener('click', e => {
  const btn = e.target.closest('.picker-type');
  if (!btn) return;
  pickerFilter.type = btn.dataset.type;
  pickerFilter.chapters = [];
  pickerFilter.tag = null;
  document.querySelectorAll('.picker-type').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.picker-val').forEach(b => b.classList.remove('active'));
  document.getElementById('pickerChapters').classList.toggle('hidden', pickerFilter.type !== 'chapter');
  document.getElementById('pickerTags').classList.toggle('hidden', pickerFilter.type !== 'tag');
  updatePickerCount();
});

document.getElementById('pickerChapters').addEventListener('click', e => {
  const btn = e.target.closest('.picker-val');
  if (!btn) return;
  const ch = parseInt(btn.dataset.val);
  const idx = pickerFilter.chapters.indexOf(ch);
  if (idx === -1) { pickerFilter.chapters.push(ch); btn.classList.add('active'); }
  else { pickerFilter.chapters.splice(idx, 1); btn.classList.remove('active'); }
  updatePickerCount();
});

document.getElementById('pickerTags').addEventListener('click', e => {
  const btn = e.target.closest('.picker-val');
  if (!btn) return;
  pickerFilter.tag = btn.dataset.val;
  document.querySelectorAll('#pickerTags .picker-val').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  updatePickerCount();
});

document.getElementById('pickerStartBtn').addEventListener('click', () => {
  const vocab = getFilteredVocab();
  if (!vocab.length) return;
  startStudy(vocab);
});

/* ---- Session ---- */
document.getElementById('startStudyBtn').addEventListener('click', () => {
  showView('study');
});

document.getElementById('studyBackBtn').addEventListener('click', () => {
  showView('dashboard');
});

function startStudy(vocabItems) {
  currentSetItems = vocabItems;
  studyQueue = shuffle(vocabItems).map(v => ({ id: v.id, data: v }));
  studyIdx = 0;
  studyCorrect = 0;
  studyIncorrect = 0;
  badItems = [];

  document.getElementById('studyDone').classList.add('hidden');
  document.getElementById('studySession').classList.remove('hidden');
  document.getElementById('cardArea').classList.remove('hidden');
  closeSetPanel();

  showCard(0);
}

function updateFaceNav(face) {
  document.querySelectorAll('.face-nav-btn').forEach((b, i) => b.classList.toggle('active', i === face));
}

function setupFaces(startFace) {
  const flashCard = document.getElementById('flashCard');
  flashCard.classList.add('no-transition');
  for (let i = 0; i < 4; i++) {
    const el = document.getElementById('cardFace' + i);
    el.classList.remove('face-active', 'face-prev');
    if (i < startFace) el.classList.add('face-prev');
    else if (i === startFace) el.classList.add('face-active');
  }
  cardFace = startFace;
  document.getElementById('answerBtns').classList.remove('hidden');
  document.getElementById('faceNavRow').classList.remove('hidden');
  updateFaceNav(startFace);
  requestAnimationFrame(() => flashCard.classList.remove('no-transition'));
}

function showCard(idx) {
  if (idx >= studyQueue.length) {
    showStudyDone();
    return;
  }
  const item = studyQueue[idx];
  const v = item.data;

  document.getElementById('cardJP').textContent = v.word;
  document.getElementById('cardReading').textContent = v.reading;
  document.getElementById('cardChapterBadge').textContent = 'Chapter ' + v.chapter;
  document.getElementById('cardMeaning').textContent = v.meaning;
  document.getElementById('cardExample').textContent = v.example;
  document.getElementById('cardExampleEn').textContent = v.exampleEn;
  document.getElementById('cardPos').textContent = posLabel(v.pos);
  document.getElementById('cardTags').innerHTML = v.tags.map(t => `<span class="tag-chip">${t}</span>`).join('');

  setupFaces(studyStartFace);

  const pct = Math.round((idx / studyQueue.length) * 100);
  document.getElementById('studyProgressBar').style.width = pct + '%';
  document.getElementById('studyCounter').textContent = `${idx + 1} / ${studyQueue.length}`;
}

document.getElementById('flashCard').addEventListener('click', () => {
  if (cardFace >= 3) return;
  document.getElementById('cardFace' + cardFace).classList.remove('face-active');
  document.getElementById('cardFace' + cardFace).classList.add('face-prev');
  cardFace++;
  document.getElementById('cardFace' + cardFace).classList.add('face-active');
  updateFaceNav(cardFace);
});

document.getElementById('startFaceBtns').addEventListener('click', e => {
  const btn = e.target.closest('.sfs-btn');
  if (!btn) return;
  studyStartFace = parseInt(btn.dataset.face);
  document.querySelectorAll('.sfs-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
});

document.getElementById('faceNavBtns').addEventListener('click', e => {
  const btn = e.target.closest('.face-nav-btn');
  if (!btn) return;
  const target = parseInt(btn.dataset.face);
  if (target === cardFace) return;
  for (let i = 0; i < 4; i++) {
    const el = document.getElementById('cardFace' + i);
    el.classList.remove('face-active', 'face-prev');
    if (i < target) el.classList.add('face-prev');
    else if (i === target) el.classList.add('face-active');
  }
  cardFace = target;
  updateFaceNav(target);
});

document.getElementById('answerBtns').addEventListener('click', e => {
  const btn = e.target.closest('[data-quality]');
  if (!btn) return;
  const quality = parseInt(btn.dataset.quality);
  const item = studyQueue[studyIdx];
  if (!item) return;
  const oldProgress = state.vocab[item.id];
  state.vocab[item.id] = updateSM2(oldProgress, quality);
  state.xp += quality >= 3 ? 10 : 2;
  state.totalStudied++;
  if (quality >= 3) studyCorrect++;
  else { studyIncorrect++; badItems.push(item); }
  saveState();
  recordActivity(1);
  studyIdx++;
  showCard(studyIdx);
});

function showStudyDone() {
  document.getElementById('studySession').classList.add('hidden');
  document.getElementById('studyDone').classList.remove('hidden');
  document.getElementById('cardArea').classList.add('hidden');
  const total = studyCorrect + studyIncorrect;
  const pct = total ? Math.round(studyCorrect / total * 100) : 0;
  document.getElementById('doneStats').innerHTML = `
    <div class="done-stat"><div class="done-stat-num">${studyCorrect}</div><div class="done-stat-label">Good</div></div>
    <div class="done-stat"><div class="done-stat-num">${studyIncorrect}</div><div class="done-stat-label">Bad</div></div>
    <div class="done-stat"><div class="done-stat-num">${pct}%</div><div class="done-stat-label">Accuracy</div></div>
  `;
  const badBtn = document.getElementById('doneReviewBadBtn');
  document.getElementById('doneBadCount').textContent = badItems.length;
  badBtn.classList.toggle('hidden', badItems.length === 0);
}

document.getElementById('doneAgainBtn').addEventListener('click', () => {
  startStudy(currentSetItems);
});

document.getElementById('doneReviewBadBtn').addEventListener('click', () => {
  startStudy(badItems.map(item => item.data));
});

document.getElementById('doneNewSetBtn').addEventListener('click', () => {
  document.getElementById('studyDone').classList.add('hidden');
  document.getElementById('studySession').classList.remove('hidden');
  document.getElementById('cardArea').classList.add('hidden');
  openSetPanel();
});

/* ===== Quiz ===== */
let quizSettings = { type: ['mc-meaning'], content: ['vocab'], chapter: ['all'], count: 10 };
let quizItems = [];
let quizIdx = 0;
let quizCorrectCount = 0;
let quizIncorrectCount = 0;

function renderQuizSetup() {
  const pills = document.getElementById('quizChapterPills');
  const chapters = [...new Set(VOCABULARY.map(v => v.chapter))].sort((a, b) => a - b);
  pills.innerHTML = '<button class="option-pill active" data-chapter="all">All</button>';
  chapters.forEach(ch => {
    pills.innerHTML += `<button class="option-pill" data-chapter="${ch}">Ch ${ch}</button>`;
  });
}

// Multi-select toggle helper: at least one must remain active
function toggleMultiPill(allBtns, clicked, settingArr, value) {
  const isActive = clicked.classList.contains('active');
  const activeCount = [...allBtns].filter(b => b.classList.contains('active')).length;
  if (isActive && activeCount === 1) return; // keep at least one
  clicked.classList.toggle('active', !isActive);
  if (!isActive) settingArr.push(value);
  else { const i = settingArr.indexOf(value); if (i !== -1) settingArr.splice(i, 1); }
}

// Quiz Type pills (multi-select)
document.querySelectorAll('[data-quiz]').forEach(btn => {
  btn.addEventListener('click', () => {
    const all = document.querySelectorAll('[data-quiz]');
    toggleMultiPill(all, btn, quizSettings.type, btn.dataset.quiz);
  });
});

// Content pills (multi-select)
document.querySelectorAll('[data-content]').forEach(btn => {
  btn.addEventListener('click', () => {
    const all = document.querySelectorAll('[data-content]');
    toggleMultiPill(all, btn, quizSettings.content, btn.dataset.content);
  });
});

// Count pills (single-select, unchanged)
document.querySelectorAll('[data-count]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-count]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    quizSettings.count = parseInt(btn.dataset.count);
  });
});

// Chapter pills (multi-select with "All" logic), delegated since pills are rendered by JS
document.getElementById('quizChapterPills').addEventListener('click', e => {
  const btn = e.target.closest('.option-pill');
  if (!btn) return;
  const val = btn.dataset.chapter;
  const allBtns = document.querySelectorAll('#quizChapterPills .option-pill');
  if (val === 'all') {
    allBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    quizSettings.chapter = ['all'];
    return;
  }
  // Deactivate "All" when a specific chapter is chosen
  const allBtn = document.querySelector('#quizChapterPills [data-chapter="all"]');
  const wasAll = allBtn && allBtn.classList.contains('active');
  if (wasAll) {
    allBtn.classList.remove('active');
    quizSettings.chapter = [];
  }
  const isActive = btn.classList.contains('active');
  const specificBtns = [...allBtns].filter(b => b.dataset.chapter !== 'all');
  const activeSpecific = specificBtns.filter(b => b.classList.contains('active'));
  if (isActive && activeSpecific.length === 1) {
    // Last specific chapter — revert to All
    btn.classList.remove('active');
    allBtn.classList.add('active');
    quizSettings.chapter = ['all'];
    return;
  }
  btn.classList.toggle('active', !isActive);
  if (!isActive) quizSettings.chapter.push(String(val));
  else { const i = quizSettings.chapter.indexOf(String(val)); if (i !== -1) quizSettings.chapter.splice(i, 1); }
});

document.getElementById('startQuizBtn').addEventListener('click', startQuiz);
document.getElementById('quizBackBtn').addEventListener('click', () => {
  document.getElementById('quizGame').classList.add('hidden');
  document.getElementById('quizSetup').style.display = '';
  document.getElementById('quizResults').classList.add('hidden');
});
document.getElementById('retryQuizBtn').addEventListener('click', startQuiz);
document.getElementById('newQuizBtn').addEventListener('click', () => {
  document.getElementById('quizResults').classList.add('hidden');
  document.getElementById('quizGame').classList.add('hidden');
  document.getElementById('quizSetup').style.display = '';
});
document.getElementById('quizDoneBtn').addEventListener('click', () => showView('dashboard'));

function poolForType(poolType) {
  if (poolType === 'grammar') return GRAMMAR;
  if (poolType === 'kanji') return KANJI;
  return VOCABULARY;
}

function startQuiz() {
  let pool = [];
  if (quizSettings.content.includes('vocab'))   pool = pool.concat(VOCABULARY.map(v => Object.assign({}, v, { _poolType: 'vocab' })));
  if (quizSettings.content.includes('kanji'))   pool = pool.concat(KANJI.map(v => Object.assign({}, v, { _poolType: 'kanji' })));
  if (quizSettings.content.includes('grammar')) pool = pool.concat(GRAMMAR.map(v => Object.assign({}, v, { _poolType: 'grammar' })));

  if (!quizSettings.chapter.includes('all')) {
    pool = pool.filter(v => v.chapter !== undefined && quizSettings.chapter.includes(String(v.chapter)));
  }
  if (pool.length < 4) { alert('Not enough items for a quiz in this selection.'); return; }

  quizItems = shuffle([...pool]).slice(0, quizSettings.count).map(item => {
    let types = quizSettings.type.filter(t =>
      t !== 'fill-blank' ||
      (item._poolType === 'vocab' && item.example && findConjugatedForm(item.word, item.pos, item.example) !== null)
    );
    if (types.length === 0) types = ['mc-meaning'];
    return Object.assign({}, item, { _quizType: types[Math.floor(Math.random() * types.length)] });
  });
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
  const isFillBlank = item._quizType === 'fill-blank';
  const isGrammar = item._poolType === 'grammar';
  const pool = poolForType(item._poolType);

  document.getElementById('quizProgressBar').style.width = (idx / quizItems.length * 100) + '%';
  document.getElementById('quizCounter').textContent = `${idx + 1} / ${quizItems.length}`;
  document.getElementById('quizCorrect').textContent = `✓ ${quizCorrectCount}`;
  document.getElementById('quizIncorrect').textContent = `✗ ${quizIncorrectCount}`;
  document.getElementById('quizFeedback').classList.add('hidden');

  const qWordEl = document.getElementById('questionWord');
  qWordEl.classList.toggle('is-sentence', isFillBlank);

  let correctAnswer, questionLabel;

  if (isFillBlank) {
    questionLabel = 'Fill in the blank:';
    const surface    = findConjugatedForm(item.word, item.pos, item.example) || item.word;
    const conjType   = detectConjType(item.word, item.pos, surface);
    correctAnswer    = surface;

    const blankHtml  = item.example.replace(surface, '<span class="blank-token">＿＿＿</span>');
    qWordEl.innerHTML = blankHtml;
    document.getElementById('questionReading').textContent = '';

    // Wrong answers: same POS first, conjugated to the same form
    const wrongPool  = VOCABULARY.filter(p => p.id !== item.id);
    const itemGroup  = getVocabPOS(item);
    const samePos    = shuffle(wrongPool.filter(p => getVocabPOS(p) === itemGroup));
    const rest       = shuffle(wrongPool.filter(p => getVocabPOS(p) !== itemGroup));
    const wrongItems = [...samePos, ...rest].slice(0, 3);

    const wrongs = wrongItems.map(w => {
      if (conjType && (w.pos === 'v1' || w.pos === 'v2' || w.pos === 'v3' || w.pos === 'i-adj')) {
        return conjugateVerb(w.word, w.pos, conjType);
      }
      // For phrase/template words: find their own surface from their example
      const wSurface = findConjugatedForm(w.word, w.pos, w.example);
      if (wSurface && wSurface !== w.word) return wSurface;
      return w.word;
    });

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
  } else {
    const { questionText, questionReading, correctAnswer: ca, questionLabel: ql } = buildQuestion(item, item._quizType, item._poolType);
    correctAnswer = ca;
    questionLabel = ql;
    qWordEl.textContent = questionText;
    document.getElementById('questionReading').textContent = questionReading;

    // Wrong answers — same POS first, fill remainder from any POS / any chapter
    const wrongPool = pool.filter(p => p.id !== item.id);
    let wrongs;
    if (!isGrammar && item._poolType !== 'kanji') {
      const pos = getVocabPOS(item);
      const samePos = shuffle(wrongPool.filter(p => getVocabPOS(p) === pos));
      const rest    = shuffle(wrongPool.filter(p => getVocabPOS(p) !== pos));
      wrongs = [...samePos, ...rest].slice(0, 3).map(p => buildAnswer(p, item._quizType, item._poolType));
    } else {
      wrongs = shuffle(wrongPool).slice(0, 3).map(p => buildAnswer(p, item._quizType, item._poolType));
    }
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

  document.getElementById('questionLabel').textContent = questionLabel;
}

// Hiragana range for trailing inflection capture
const HIRAGANA = /^[\u3040-\u309F]$/;

// Full V1 godan conjugation table: finalKana → { masu-stem, te-form, ta-form, nai-stem, ba-stem }
const V1_TABLE = {
  'う': { masu:'い',  te:'って',  ta:'った',  nai:'わ',  ba:'え' },
  'く': { masu:'き',  te:'いて',  ta:'いた',  nai:'か',  ba:'け' },
  'ぐ': { masu:'ぎ',  te:'いで',  ta:'いだ',  nai:'が',  ba:'げ' },
  'す': { masu:'し',  te:'して',  ta:'した',  nai:'さ',  ba:'せ' },
  'つ': { masu:'ち',  te:'って',  ta:'った',  nai:'た',  ba:'て' },
  'ぬ': { masu:'に',  te:'んで',  ta:'んだ',  nai:'な',  ba:'ね' },
  'ぶ': { masu:'び',  te:'んで',  ta:'んだ',  nai:'ば',  ba:'べ' },
  'む': { masu:'み',  te:'んで',  ta:'んだ',  nai:'ま',  ba:'め' },
  'る': { masu:'り',  te:'って',  ta:'った',  nai:'ら',  ba:'れ' },
};

// Ordered suffix → conjugation-type pairs (longest first to avoid partial matches)
const V2_SUFFIX_DETECT = [
  ['なければならない','nakereba_naranai'], ['なければいけない','nakereba_ikenai'],
  ['なくてはならない','nakutewa_naranai'], ['なくてはいけない','nakutewa_ikenai'],
  ['ながら','nagara'],
  ['ていません','teimasen'], ['ています','teimasu'], ['ていた','teita'],
  ['ていない','teinai'],    ['ている','teiru'],
  ['てしまいました','teshimaimashita'], ['てしまった','teshimatta'], ['てしまう','teshimau'],
  ['てから','tekara'], ['てもいい','temoii'], ['てもよい','temoii'],
  ['てもらいました','temoraimashita'], ['てもらう','temorau'],
  ['てくれました','tekuremashita'], ['てくれる','tekureru'],
  ['てください','tekudasai'],
  ['ませんでした','masendeshita'], ['ました','mashita'], ['ません','masen'], ['ます','masu'],
  ['なかった','nakatta'], ['ない','nai'],
  ['た','ta'], ['て','te'], ['れば','ba'],
  ['','plain'],
];

function detectConjType(word, pos, surface) {
  if (!surface || surface === word) return null;

  const cleanWord = word.replace(/^[（(][^）)]*[）)]\s*/, '');

  if (pos === 'v2') {
    const stem = cleanWord.replace(/る$/, '');
    if (!surface.startsWith(stem)) return null;
    const suf = surface.slice(stem.length);
    for (const [ending, type] of V2_SUFFIX_DETECT) {
      if (suf === ending || suf.startsWith(ending)) return type;
    }
    return null;
  }

  if (pos === 'v3') {
    let base = cleanWord.replace(/する$/, '').replace(/くる$/, '');
    if (base === cleanWord && cleanWord.endsWith('る')) base = cleanWord.slice(0, -1);
    if (!surface.startsWith(base)) return null;
    const suf = surface.slice(base.length);
    // Pure kuru (来る): uses V2-like written suffixes (来て, 来た, 来ます…)
    if (cleanWord === '来る' || cleanWord === 'くる') {
      for (const [ending, type] of V2_SUFFIX_DETECT) {
        if (suf === ending || suf.startsWith(ending)) return type;
      }
      return null;
    }
    // Suru conjugation: map し+V2_suffix or する → type
    if (suf.startsWith('する') || suf === 'する') return 'plain';
    if (suf.startsWith('し')) {
      const v2suf = suf.slice(1); // remove し
      for (const [ending, type] of V2_SUFFIX_DETECT) {
        if (v2suf === ending || v2suf.startsWith(ending)) return type;
      }
    }
    if (suf.startsWith('すれば')) return 'ba';
    if (suf.startsWith('でき')) return 'potential';
    return null;
  }

  if (pos === 'v1') {
    const finalKana = cleanWord.slice(-1);
    const kanjiStem = cleanWord.slice(0, -1);
    const t = V1_TABLE[finalKana];
    if (!t || !surface.startsWith(kanjiStem)) return null;
    const suf = surface.slice(kanjiStem.length);

    // Build ordered candidates (longest first)
    const candidates = [
      [t.nai + 'なければならない', 'nakereba_naranai'],
      [t.nai + 'なければいけない', 'nakereba_ikenai'],
      [t.nai + 'なくてはならない', 'nakutewa_naranai'],
      [t.nai + 'なくてはいけない', 'nakutewa_ikenai'],
      [t.masu + 'ながら', 'nagara'],
      [t.masu + 'ません',  'masen'],
      [t.masu + 'ました',  'mashita'],
      [t.masu + 'ます',    'masu'],
      [t.te + 'しまいました', 'teshimaimashita'],
      [t.te + 'しまった',   'teshimatta'],
      [t.te + 'しまう',     'teshimau'],
      [t.te + 'いません',   'teimasen'],
      [t.te + 'います',     'teimasu'],
      [t.te + 'いた',       'teita'],
      [t.te + 'いない',     'teinai'],
      [t.te + 'いる',       'teiru'],
      [t.te + 'から',       'tekara'],
      [t.te + 'もいい',     'temoii'],
      [t.te + 'もらいました','temoraimashita'],
      [t.te + 'もらう',     'temorau'],
      [t.te + 'くれました', 'tekuremashita'],
      [t.te + 'くれる',     'tekureru'],
      [t.te + 'ください',   'tekudasai'],
      [t.te,                'te'],
      [t.ta,                'ta'],
      [t.nai + 'なかった',  'nakatta'],
      [t.nai + 'ない',      'nai'],
      [t.ba + 'ば',         'ba'],
      [finalKana,           'plain'],
    ];
    for (const [pattern, type] of candidates) {
      if (suf === pattern || suf.startsWith(pattern)) return type;
    }
    return null;
  }

  if (pos === 'i-adj') {
    const stem = cleanWord.replace(/い$/, '');
    if (!surface.startsWith(stem)) return null;
    const suf = surface.slice(stem.length);
    const cands = [
      ['くなければならない', 'i_nakereba_naranai'], ['くなければいけない', 'i_nakereba_ikenai'],
      ['くなかった', 'i_nakatta'], ['くてもいい', 'i_temoii'],
      ['くなる', 'i_naru'], ['くない', 'i_nai'], ['くて', 'i_te'],
      ['かった', 'i_ta'], ['そうな', 'i_sou_na'], ['そう', 'i_sou'],
      ['さ', 'i_sa'], ['く', 'i_adv'], ['い', 'plain'],
    ];
    for (const [p, t] of cands) { if (suf === p || suf.startsWith(p)) return t; }
    return null;
  }

  return null;
}

function conjugateVerb(word, pos, conjType) {
  if (!conjType || conjType === 'plain') return word;
  const cleanWord = word.replace(/^[（(][^）)]*[）)]\s*/, '');

  if (pos === 'v2') {
    const stem = cleanWord.replace(/る$/, '');
    if (stem === cleanWord) return word;
    const V2_MAP = {
      masu:'ます', mashita:'ました', masen:'ません', masendeshita:'ませんでした',
      te:'て', ta:'た', nai:'ない', nakatta:'なかった',
      teiru:'ている', teita:'ていた', teimasu:'ています', teimasen:'ていません', teinai:'ていない',
      teshimau:'てしまう', teshimatta:'てしまった', teshimaimashita:'てしまいました',
      tekara:'てから', nagara:'ながら', temoii:'てもいい',
      temorau:'てもらう', temoraimashita:'てもらいました',
      tekureru:'てくれる', tekuremashita:'てくれました', tekudasai:'てください',
      nakereba_naranai:'なければならない', nakereba_ikenai:'なければいけない',
      nakutewa_naranai:'なくてはならない', nakutewa_ikenai:'なくてはいけない',
      ba:'れば', potential:'られる',
    };
    return V2_MAP[conjType] !== undefined ? stem + V2_MAP[conjType] : word;
  }

  if (pos === 'i-adj') {
    const stem = cleanWord.replace(/い$/, '');
    const IADJ_MAP = {
      i_adv: 'く', i_te: 'くて', i_nai: 'くない', i_nakatta: 'くなかった',
      i_ta: 'かった', i_sou: 'そう', i_sou_na: 'そうな', i_sa: 'さ',
      i_naru: 'くなる', i_temoii: 'くてもいい',
      i_nakereba_naranai: 'くなければならない', i_nakereba_ikenai: 'くなければいけない',
    };
    return IADJ_MAP[conjType] !== undefined ? stem + IADJ_MAP[conjType] : word;
  }

  if (pos === 'v3') {
    let base = cleanWord.replace(/する$/, '').replace(/くる$/, '');
    if (base === cleanWord && cleanWord.endsWith('る')) base = cleanWord.slice(0, -1);
    // Pure kuru (来る / くる): written conjugation looks like ichidan (来て, 来た, 来ます…)
    if (cleanWord === '来る' || cleanWord === 'くる') {
      const KURU_MAP = {
        masu:'ます', mashita:'ました', masen:'ません', masendeshita:'ませんでした',
        te:'て', ta:'た', nai:'ない', nakatta:'なかった',
        teiru:'ている', teita:'ていた', teimasu:'ています', teimasen:'ていません', teinai:'ていない',
        teshimau:'てしまう', teshimatta:'てしまった', teshimaimashita:'てしまいました',
        tekara:'てから', nagara:'ながら', temoii:'てもいい',
        temorau:'てもらう', temoraimashita:'てもらいました',
        tekureru:'てくれる', tekuremashita:'てくれました', tekudasai:'てください',
        nakereba_naranai:'なければならない', nakereba_ikenai:'なければいけない',
        nakutewa_naranai:'なくてはならない', nakutewa_ikenai:'なくてはいけない',
        ba:'れば',
      };
      return KURU_MAP[conjType] !== undefined ? base + KURU_MAP[conjType] : word;
    }
    const SURU_MAP = {
      masu:'します', mashita:'しました', masen:'しません', masendeshita:'しませんでした',
      te:'して', ta:'した', nai:'しない', nakatta:'しなかった',
      teiru:'している', teita:'していた', teimasu:'しています', teimasen:'していません', teinai:'していない',
      teshimau:'してしまう', teshimatta:'してしまった', teshimaimashita:'してしまいました',
      tekara:'してから', nagara:'しながら', temoii:'してもいい',
      temorau:'してもらう', temoraimashita:'してもらいました',
      tekureru:'してくれる', tekuremashita:'してくれました', tekudasai:'してください',
      nakereba_naranai:'しなければならない', nakereba_ikenai:'しなければいけない',
      nakutewa_naranai:'しなくてはならない', nakutewa_ikenai:'しなくてはいけない',
      ba:'すれば', potential:'できる',
    };
    return SURU_MAP[conjType] !== undefined ? base + SURU_MAP[conjType] : word;
  }

  if (pos === 'v1') {
    const finalKana = cleanWord.slice(-1);
    const kanjiStem = cleanWord.slice(0, -1);
    const t = V1_TABLE[finalKana];
    if (!t) return word;
    const suf = {
      masu: t.masu+'ます', mashita: t.masu+'ました', masen: t.masu+'ません',
      masendeshita: t.masu+'ませんでした',
      te: t.te, ta: t.ta,
      nai: t.nai+'ない', nakatta: t.nai+'なかった',
      teiru: t.te+'いる', teita: t.te+'いた', teimasu: t.te+'います',
      teimasen: t.te+'いません', teinai: t.te+'いない',
      teshimau: t.te+'しまう', teshimatta: t.te+'しまった', teshimaimashita: t.te+'しまいました',
      tekara: t.te+'から', nagara: t.masu+'ながら', temoii: t.te+'もいい',
      temorau: t.te+'もらう', temoraimashita: t.te+'もらいました',
      tekureru: t.te+'くれる', tekuremashita: t.te+'くれました', tekudasai: t.te+'ください',
      nakereba_naranai: t.nai+'なければならない', nakereba_ikenai: t.nai+'なければいけない',
      nakutewa_naranai: t.te+'はならない', nakutewa_ikenai: t.te+'はいけない',
      ba: t.ba+'ば', potential: t.ba+'る',
    };
    return suf[conjType] !== undefined ? kanjiStem + suf[conjType] : word;
  }

  return word;
}

// Japanese character test (hiragana + katakana + CJK)
const IS_JAPANESE = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/;
// Standalone particles/punctuation that mark phrase boundaries
const STOP_CHARS = /^[はがをへとでも、。「」]$/;

// For 〜-template phrase words: find where the invariant Japanese part appears in
// the example, then extend backward/forward using particle boundary heuristics.
function findTemplateSurface(word, example) {
  const segs = word.split(/[〜～]/)
    .map(s => s.replace(/[^\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/g, ''))
    .filter(s => s.length > 0);
  if (segs.length === 0) return null;

  const sorted = [...new Set(segs)].sort((a, b) => b.length - a.length);
  for (const seg of sorted) {
    for (let len = seg.length; len >= 1; len--) {
      const query = seg.slice(0, len);
      const idx = example.indexOf(query);
      if (idx === -1) continue;
      let start = idx;
      while (start > 0 && IS_JAPANESE.test(example[start - 1]) && !STOP_CHARS.test(example[start - 1])) start--;
      let end = idx + query.length;
      while (end < example.length && HIRAGANA.test(example[end]) && !STOP_CHARS.test(example[end])) end++;
      const match = example.slice(start, end);
      return match || null;
    }
  }
  return null;
}

function findConjugatedForm(word, pos, example) {
  if (!example) return null;
  // 1. Direct match — word is already the surface form in the sentence
  if (example.includes(word)) return word;

  // Strip parenthetical prefixes like （病気に） before stem extraction
  const cleanWord = word.replace(/^[（(][^）)]*[）)]\s*/, '');
  if (cleanWord !== word && example.includes(cleanWord)) return cleanWord;

  // Template phrase words containing 〜 (e.g. 〜展, 〜が中止になる)
  if (cleanWord.includes('〜') || cleanWord.includes('～')) {
    return findTemplateSurface(cleanWord, example);
  }

  let stem = '';
  const w = cleanWord;
  if (pos === 'v3') {
    stem = w.replace(/する$/, '').replace(/くる$/, '');
    if (stem === w && w.endsWith('る')) stem = w.slice(0, -1);
  } else if (pos === 'v2') {
    stem = w.replace(/る$/, '');
  } else if (pos === 'v1') {
    stem = w.replace(/[うくぐすつぬぶむる]$/, '');
  } else if (pos === 'i-adj') {
    stem = w.replace(/い$/, '');
  }

  if (!stem) return null;

  const idx = example.indexOf(stem);
  if (idx === -1) return null;

  let end = idx + stem.length;
  while (end < example.length && HIRAGANA.test(example[end])) end++;

  const match = example.slice(idx, end);
  return match || null;
}

function posLabel(pos) {
  const labels = {
    'v1': 'Godan [V1]', 'v2': 'Ichidan [V2]', 'v3': 'Irregular [V3]',
    'noun': 'Noun', 'i-adj': 'I-Adjective', 'na-adj': 'Na-Adjective',
    'adjective': 'Adjective', 'adverb': 'Adverb',
    'phrase': 'Expression', 'conjunction': 'Conjunction',
  };
  return labels[pos] || (pos || '');
}

function getVocabPOS(item) {
  const pos = item.pos;
  if (pos === 'v1' || pos === 'v2' || pos === 'v3') return 'verb';
  return pos || 'noun';
}

function buildQuestion(item, type, poolType) {
  const isVocab = poolType === 'vocab';
  const isGrammar = poolType === 'grammar';
  let questionText, questionReading = '', correctAnswer, questionLabel;

  if (isGrammar) {
    if (type === 'mc-word') {
      questionLabel = 'Which pattern means:';
      questionText = item.meaning;
      correctAnswer = item.pattern;
    } else {
      questionLabel = 'What does this grammar pattern mean?';
      questionText = item.pattern;
      correctAnswer = item.meaning;
    }
  } else if (type === 'mc-meaning') {
    questionLabel = 'What is the meaning of:';
    questionText = isVocab ? item.word : item.character;
    questionReading = isVocab ? '' : item.onyomi;
    correctAnswer = item.meaning;
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
    questionText = item.meaning;
    questionReading = '';
    correctAnswer = isVocab ? item.word : item.character;
  }
  return { questionText, questionReading, correctAnswer, questionLabel };
}

function buildAnswer(item, type, poolType) {
  const isGrammar = poolType === 'grammar';
  const isVocab = poolType === 'vocab' || type === 'fill-blank';
  if (isGrammar) return type === 'mc-word' ? item.pattern : item.meaning;
  if (type === 'mc-meaning') return item.meaning;
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
  const isGrammar = item._poolType === 'grammar';
  const useVocab = !isGrammar && item._poolType === 'vocab';
  if (!isCorrect) {
    btn.classList.add('wrong');
    quizIncorrectCount++;
    if (isGrammar) state.grammar[item.id] = updateSM2(state.grammar[item.id], 1);
    else if (useVocab) state.vocab[item.id] = updateSM2(state.vocab[item.id], 1);
    else state.kanji[item.id] = updateSM2(state.kanji[item.id], 1);
  } else {
    quizCorrectCount++;
    state.xp += 5;
    if (isGrammar) state.grammar[item.id] = updateSM2(state.grammar[item.id], 4);
    else if (useVocab) state.vocab[item.id] = updateSM2(state.vocab[item.id], 4);
    else state.kanji[item.id] = updateSM2(state.kanji[item.id], 4);
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

  const reasoningEl = document.getElementById('feedbackReasoning');
  let html = '';
  if (isGrammar) {
    html = `<div class="reasoning-pattern">${item.pattern}</div>
            <div class="reasoning-meaning">${item.meaning}</div>
            ${item.usage ? `<div class="reasoning-usage">${item.usage}</div>` : ''}
            ${item.example ? `<div class="reasoning-example">${item.example}</div><div class="reasoning-example-en">${item.exampleEn}</div>` : ''}`;
  } else {
    if (useVocab) {
      html = `<div class="reasoning-word">${item.word} <span class="reasoning-reading">${item.reading !== item.word ? item.reading : ''}</span>${item.pos ? `<span class="reasoning-pos">${posLabel(item.pos)}</span>` : ''}</div>
              <div class="reasoning-meaning">${item.meaning}</div>
              <div class="reasoning-example">${item.example}</div>
              <div class="reasoning-example-en">${item.exampleEn}</div>`;
    } else {
      html = `<div class="reasoning-word">${item.character}</div>
              <div class="reasoning-meaning">${item.meaning}</div>
              <div class="reasoning-usage">On: ${item.onyomi} &nbsp;|&nbsp; Kun: ${item.kunyomi}</div>`;
    }
  }
  if (html) {
    reasoningEl.innerHTML = html;
    reasoningEl.style.borderLeftColor = isCorrect ? 'var(--success)' : 'var(--danger)';
    reasoningEl.classList.remove('hidden');
  } else {
    reasoningEl.classList.add('hidden');
  }

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
    const matchLevel = kanjiFilter.level === 'all' || k.chapter === Number(kanjiFilter.level);
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
      <span class="kanji-level-tag">Ch.${k.chapter}</span>
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
  document.getElementById('modalLevel').textContent = 'Chapter ' + k.chapter;
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
const VOCAB_PAGE_SIZE = 50;
let vocabFilter = { tag: 'all', pos: 'all', search: '' };
let vocabSort = { key: 'chapter', dir: 1 };
let vocabFiltered = [];
let vocabLoaded = 0;
let vocabObserver = null;

const STATUS_ORDER = { 'New': 0, 'Learning': 1, 'Mastered': 2 };
const POS_ORDER = { noun: 0, 'na-adj': 1, 'i-adj': 2, adjective: 3, v1: 4, v2: 5, v3: 6, adverb: 7, phrase: 8, conjunction: 9 };

function getVocabStatus(v) {
  const p = state.vocab[v.id];
  if (p && p.correct >= 3 && p.interval >= 6) return 'Mastered';
  if (p && p.correct >= 1) return 'Learning';
  return 'New';
}

function getVocabFiltered() {
  let list = VOCABULARY.filter(v => {
    const matchTag = vocabFilter.tag === 'all' || v.tags.includes(vocabFilter.tag);
    const matchPos = vocabFilter.pos === 'all' || v.pos === vocabFilter.pos;
    const q = vocabFilter.search.toLowerCase();
    const matchSearch = !q || v.word.includes(q) || v.reading.includes(q) || v.meaning.toLowerCase().includes(q) || v.romaji.includes(q);
    return matchTag && matchPos && matchSearch;
  });

  const { key, dir } = vocabSort;
  list.sort((a, b) => {
    let av, bv;
    if (key === 'word')    { av = a.word;    bv = b.word; }
    else if (key === 'pos')    { av = (POS_ORDER[a.pos] !== undefined ? POS_ORDER[a.pos] : 99); bv = (POS_ORDER[b.pos] !== undefined ? POS_ORDER[b.pos] : 99); return (av - bv) * dir; }
    else if (key === 'chapter'){ av = a.chapter; bv = b.chapter; return (av - bv) * dir; }
    else if (key === 'status') { av = STATUS_ORDER[getVocabStatus(a)]; bv = STATUS_ORDER[getVocabStatus(b)]; return (av - bv) * dir; }
    else return 0;
    return av < bv ? -dir : av > bv ? dir : 0;
  });
  return list;
}

function renderVocabRows(items) {
  const tbody = document.getElementById('vocabTableBody');
  const frag = document.createDocumentFragment();
  items.forEach(v => {
    const status = getVocabStatus(v);
    const statusClass = status === 'Mastered' ? 'status-mastered' : status === 'Learning' ? 'status-learning' : 'status-new';
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><span class="vocab-word-jp">${v.word}</span></td>
      <td><span class="vocab-reading">${v.reading}</span></td>
      <td>${v.meaning}</td>
      <td>${v.pos ? `<span class="pos-chip">${posLabel(v.pos)}</span>` : ''}</td>
      <td>Ch. ${v.chapter}</td>
      <td><span class="status-badge ${statusClass}">${status}</span></td>`;
    frag.appendChild(tr);
  });
  tbody.appendChild(frag);
}

function vocabLoadNextPage() {
  const nextItems = vocabFiltered.slice(vocabLoaded, vocabLoaded + VOCAB_PAGE_SIZE);
  if (nextItems.length === 0) return;
  renderVocabRows(nextItems);
  vocabLoaded += nextItems.length;
  const loadMore = document.getElementById('vocabLoadMore');
  if (vocabLoaded >= vocabFiltered.length) {
    loadMore.classList.add('hidden');
  } else {
    loadMore.classList.remove('hidden');
  }
}

function renderVocabTable() {
  document.getElementById('vocabTableBody').innerHTML = '';
  vocabFiltered = getVocabFiltered();
  vocabLoaded = 0;
  // Sync sort header indicators
  document.querySelectorAll('.th-sortable').forEach(el => {
    const icon = el.querySelector('.sort-icon');
    if (el.dataset.sort === vocabSort.key) {
      el.classList.add('sort-active');
      icon.textContent = vocabSort.dir === 1 ? '↑' : '↓';
    } else {
      el.classList.remove('sort-active');
      icon.textContent = '↕';
    }
  });
  vocabLoadNextPage();
}

// IntersectionObserver for auto-loading when sentinel enters view
vocabObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) vocabLoadNextPage();
}, { threshold: 0 });
vocabObserver.observe(document.getElementById('vocabScrollSentinel'));

document.getElementById('vocabLoadMoreBtn').addEventListener('click', vocabLoadNextPage);

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

document.getElementById('vocabPosFilters').addEventListener('click', e => {
  const btn = e.target.closest('.filter-pill');
  if (!btn) return;
  document.querySelectorAll('#vocabPosFilters .filter-pill').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  vocabFilter.pos = btn.dataset.pos;
  renderVocabTable();
});

document.querySelector('.vocab-table thead').addEventListener('click', e => {
  const th = e.target.closest('.th-sortable');
  if (!th) return;
  const key = th.dataset.sort;
  if (vocabSort.key === key) {
    vocabSort.dir *= -1;
  } else {
    vocabSort.key = key;
    vocabSort.dir = 1;
  }
  // Update header indicators
  document.querySelectorAll('.th-sortable').forEach(el => {
    const icon = el.querySelector('.sort-icon');
    if (el.dataset.sort === vocabSort.key) {
      el.classList.add('sort-active');
      icon.textContent = vocabSort.dir === 1 ? '↑' : '↓';
    } else {
      el.classList.remove('sort-active');
      icon.textContent = '↕';
    }
  });
  renderVocabTable();
});

/* ===== Grammar View ===== */
let grammarFilter = { cat: 'all', search: '' };

function renderGrammarGrid() {
  if (!state.grammar) {
    state.grammar = {};
    GRAMMAR.forEach(g => { state.grammar[g.id] = createInitialProgress(g.id); });
  }
  const grid = document.getElementById('grammarGrid');
  grid.innerHTML = '';
  const filtered = GRAMMAR.filter(g => {
    const matchCat = grammarFilter.cat === 'all' || g.category === grammarFilter.cat;
    const q = grammarFilter.search.toLowerCase();
    const matchSearch = !q || g.pattern.includes(q) || g.meaning.toLowerCase().includes(q) || g.usage.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });
  filtered.forEach(g => {
    const p = state.grammar[g.id] || createInitialProgress(g.id);
    const card = document.createElement('div');
    card.className = 'grammar-card';
    if (p.correct >= 3 && p.interval >= 6) card.classList.add('mastered');
    else if (p.correct >= 1) card.classList.add('learned');
    card.innerHTML = `
      <span class="grammar-level-tag level-${g.level}">${g.level}</span>
      <div class="grammar-pattern">${g.pattern}</div>
      <div class="grammar-meaning-sm">${g.meaning}</div>
      <div class="grammar-cat-sm">${g.category}</div>
    `;
    card.addEventListener('click', () => openGrammarModal(g));
    grid.appendChild(card);
  });
}

function openGrammarModal(g) {
  document.getElementById('grammarModalPattern').textContent = g.pattern;
  document.getElementById('grammarModalMeaning').textContent = g.meaning;
  document.getElementById('grammarModalUsage').textContent = g.usage;
  document.getElementById('grammarModalExample').textContent = g.example;
  document.getElementById('grammarModalExampleEn').textContent = g.exampleEn;

  if (!state.grammar) state.grammar = {};
  if (!state.grammar[g.id]) state.grammar[g.id] = createInitialProgress(g.id);
  const p = state.grammar[g.id];
  if (p.correct === 0 && p.incorrect === 0) {
    state.grammar[g.id] = updateSM2(p, 3);
    state.totalStudied++;
    saveState();
  }
  document.getElementById('grammarModal').classList.remove('hidden');
}

document.getElementById('grammarModalClose').addEventListener('click', () => {
  document.getElementById('grammarModal').classList.add('hidden');
});
document.getElementById('grammarModal').addEventListener('click', e => {
  if (e.target === document.getElementById('grammarModal')) {
    document.getElementById('grammarModal').classList.add('hidden');
  }
});

document.querySelectorAll('#grammarCatFilters .filter-pill').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#grammarCatFilters .filter-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    grammarFilter.cat = btn.dataset.cat;
    renderGrammarGrid();
  });
});

document.getElementById('grammarSearch').addEventListener('input', e => {
  grammarFilter.search = e.target.value;
  renderGrammarGrid();
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
