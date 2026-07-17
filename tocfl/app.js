'use strict';

// ===== STORAGE =====
const STORAGE_KEY = 'tocfl_srs_v1';
const STREAK_KEY = 'tocfl_streak_v1';

function loadSRS() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
}
function saveSRS(data) { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }

function loadStreak() {
  try { return JSON.parse(localStorage.getItem(STREAK_KEY)) || { streak: 0, lastDate: null, totalCorrect: 0, totalAnswered: 0 }; }
  catch { return { streak: 0, lastDate: null, totalCorrect: 0, totalAnswered: 0 }; }
}
function saveStreak(data) { localStorage.setItem(STREAK_KEY, JSON.stringify(data)); }

// ===== SM2 ALGORITHM =====
function getDefaultCard() {
  return { interval: 1, repetitions: 0, easeFactor: 2.5, nextReview: Date.now(), learned: false, mastered: false };
}

function sm2Update(card, rating) {
  // rating: 1=again, 2=hard, 3=ok, 4=easy
  const q = rating; // 1-4
  let { interval, repetitions, easeFactor } = card;
  if (q < 2) {
    repetitions = 0; interval = 1;
  } else {
    if (repetitions === 0) interval = 1;
    else if (repetitions === 1) interval = 6;
    else interval = Math.round(interval * easeFactor);
    repetitions++;
  }
  easeFactor = Math.max(1.3, easeFactor + 0.1 - (4 - q) * (0.08 + (4 - q) * 0.02));
  const learned = repetitions >= 1;
  const mastered = repetitions >= 4 && interval >= 21;
  const nextReview = Date.now() + interval * 86400000;
  return { interval, repetitions, easeFactor, nextReview, learned, mastered };
}

function isDue(card) { return !card || card.nextReview <= Date.now(); }

// ===== PINYIN NORMALIZATION =====
function normalizePinyin(s) {
  if (!s) return '';
  // Map combining diacritics to tone numbers so both ǐ and i3 normalize identically
  const toneMap = { '\u0304': '1', '\u0301': '2', '\u030c': '3', '\u0300': '4' };
  return s.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, m => toneMap[m] || '')
    .replace(/\s+/g, '')
    .toLowerCase();
}

// ===== STATE =====
const state = {
  currentView: 'dashboard',
  srs: loadSRS(),
  streak: loadStreak(),
  study: {
    content: 'vocab',
    chapter: 'all',
    sort: 'chapter',
    selectedStars: 'all',
    deck: [],
    idx: 0,
    flipped: false,
    sessionStart: null,
    sessionCorrect: 0,
    sessionTotal: 0,
  },
  quiz: {
    content: 'vocab',
    type: 'meaning',
    chapter: 'all',
    count: 10,
    selectedStars: 'all',
    questions: [],
    idx: 0,
    correct: 0,
    wrong: 0,
    mistakes: [],
    active: false,
  },
  chars: { chapter: 'all' },
  vocab: { chapter: 'all', pos: 'all', search: '', sort: 'chapter', selectedStars: 'all' },
  grammar: { level: 'all' },
};

// ===== HELPERS =====
function getItems(content) {
  if (content === 'vocab') return VOCABULARY;
  if (content === 'chars') return CHARACTERS;
  if (content === 'grammar') return GRAMMAR;
  return [];
}

function filterByChapter(items, chapters) {
  if (chapters === 'all' || (Array.isArray(chapters) && chapters.length === 0)) return items;
  if (Array.isArray(chapters)) return items.filter(i => chapters.includes(i.chapter));
  return items.filter(i => i.chapter === Number(chapters));
}

function filterByStars(items, selectedStars, contentType) {
  if (selectedStars === 'all' || (Array.isArray(selectedStars) && selectedStars.length === 0)) return items;
  return items.filter(i => selectedStars.includes(getCardSRS(contentType, i.id).lastStars || 0));
}

function getCardSRS(type, id) {
  const key = `${type}_${id}`;
  return state.srs[key] || getDefaultCard();
}

function setCardSRS(type, id, card) {
  const key = `${type}_${id}`;
  state.srs[key] = card;
}

function countDue(type) {
  return getItems(type === 'vocab' ? 'vocab' : type === 'chars' ? 'chars' : 'grammar')
    .filter(i => isDue(getCardSRS(type, i.id))).length;
}

function countLearned(type) {
  return getItems(type === 'vocab' ? 'vocab' : type === 'chars' ? 'chars' : 'grammar')
    .filter(i => getCardSRS(type, i.id).learned).length;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getChapters(content) {
  const items = getItems(content);
  const chapters = [...new Set(items.map(i => i.chapter))].sort((a, b) => a - b);
  return chapters;
}

// ===== VIEW NAVIGATION =====
const viewLabels = {
  dashboard: '主頁', study: '學習', quiz: '測驗',
  chars: '漢字', vocab: '詞彙', grammar: '語法'
};

function showView(viewId) {
  document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
  const target = document.getElementById('view-' + viewId);
  if (target) target.classList.remove('hidden');

  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === viewId);
  });

  document.getElementById('currentViewLabel').textContent = viewLabels[viewId] || viewId;
  state.currentView = viewId;
  closeNav();

  if (viewId === 'dashboard') renderDashboard();
  else if (viewId === 'study') renderStudySetup();
  else if (viewId === 'chars') renderCharsGrid();
  else if (viewId === 'vocab') renderVocabList();
  else if (viewId === 'grammar') renderGrammarList();
}

// ===== NAV DROPDOWN =====
function openNav() {
  document.getElementById('navMenu').classList.add('open');
  document.getElementById('navToggle').setAttribute('aria-expanded', 'true');
}
function closeNav() {
  document.getElementById('navMenu').classList.remove('open');
  document.getElementById('navToggle').setAttribute('aria-expanded', 'false');
}

// ===== CHAPTER PILLS BUILDER (multi-select) =====
function buildChapterPills(containerId, content, currentChapters, onChange) {
  const old = document.getElementById(containerId);
  if (!old) return;
  // Clone to strip stale listeners
  const container = old.cloneNode(false);
  old.parentNode.replaceChild(container, old);

  const chapters = getChapters(content);
  const isAll = currentChapters === 'all' || (Array.isArray(currentChapters) && currentChapters.length === 0);

  const allBtn = document.createElement('button');
  allBtn.className = 'pill' + (isAll ? ' active' : '');
  allBtn.dataset.chapter = 'all';
  allBtn.textContent = '全部';
  container.appendChild(allBtn);

  chapters.forEach(ch => {
    const btn = document.createElement('button');
    const isActive = !isAll && Array.isArray(currentChapters) && currentChapters.includes(ch);
    btn.className = 'pill' + (isActive ? ' active' : '');
    btn.dataset.chapter = ch;
    btn.textContent = '第' + ch + '章';
    container.appendChild(btn);
  });

  container.addEventListener('click', e => {
    const btn = e.target.closest('.pill');
    if (!btn) return;
    if (btn.dataset.chapter === 'all') {
      container.querySelectorAll('.pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      onChange('all');
    } else {
      container.querySelector('[data-chapter="all"]').classList.remove('active');
      btn.classList.toggle('active');
      const selected = [...container.querySelectorAll('.pill.active')]
        .map(b => Number(b.dataset.chapter)).filter(n => !isNaN(n));
      if (selected.length === 0) {
        container.querySelector('[data-chapter="all"]').classList.add('active');
        onChange('all');
      } else {
        onChange(selected);
      }
    }
  });
}

// ===== STAR FILTER PILLS BUILDER (multi-select) =====
function buildStarFilterPills(containerId, currentSelected, onChange) {
  const old = document.getElementById(containerId);
  if (!old) return;
  const container = old.cloneNode(false);
  old.parentNode.replaceChild(container, old);

  const isAll = currentSelected === 'all' || (Array.isArray(currentSelected) && currentSelected.length === 0);

  const allBtn = document.createElement('button');
  allBtn.className = 'pill' + (isAll ? ' active' : '');
  allBtn.dataset.starVal = 'all';
  allBtn.textContent = '全部';
  container.appendChild(allBtn);

  [{ val: 0, label: '☆' }, { val: 1, label: '★' }, { val: 2, label: '★★' },
   { val: 3, label: '★★★' }, { val: 4, label: '★★★★' }, { val: 5, label: '★★★★★' }].forEach(({ val, label }) => {
    const btn = document.createElement('button');
    const isActive = !isAll && Array.isArray(currentSelected) && currentSelected.includes(val);
    btn.className = 'pill star-filter-pill' + (isActive ? ' active' : '');
    btn.dataset.starVal = val;
    btn.textContent = label;
    container.appendChild(btn);
  });

  container.addEventListener('click', e => {
    const btn = e.target.closest('.pill');
    if (!btn || btn.dataset.starVal === undefined) return;
    if (btn.dataset.starVal === 'all') {
      container.querySelectorAll('.pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      onChange('all');
    } else {
      container.querySelector('[data-star-val="all"]').classList.remove('active');
      btn.classList.toggle('active');
      const selected = [...container.querySelectorAll('.pill.active')]
        .map(b => Number(b.dataset.starVal)).filter(n => !isNaN(n));
      if (selected.length === 0) {
        container.querySelector('[data-star-val="all"]').classList.add('active');
        onChange('all');
      } else {
        onChange(selected);
      }
    }
  });
}

// ===== DASHBOARD =====
function renderDashboard() {
  const types = ['vocab', 'chars', 'grammar'];
  const contents = ['vocab', 'chars', 'grammar'];

  // Progress bars
  types.forEach((t, i) => {
    const total = getItems(contents[i]).length;
    const learned = countLearned(t);
    const pct = total ? (learned / total * 100) : 0;
    const fillEl = document.getElementById(t === 'vocab' ? 'vocabProgress' : t === 'chars' ? 'charsProgress' : 'grammarProgress');
    const countEl = document.getElementById(t === 'vocab' ? 'vocabCount' : t === 'chars' ? 'charsCount' : 'grammarCount');
    if (fillEl) fillEl.style.width = pct + '%';
    if (countEl) countEl.textContent = learned + '/' + total;
  });

  // Due counts
  ['vocab', 'chars', 'grammar'].forEach(t => {
    const due = countDue(t);
    const el = document.getElementById('due' + t.charAt(0).toUpperCase() + t.slice(1));
    if (el) el.querySelector('.review-num').textContent = due;
  });

  // Header due badge
  const totalDue = countDue('vocab') + countDue('chars') + countDue('grammar');
  document.getElementById('statsDue').textContent = totalDue + ' due';

  // Stats
  const streak = state.streak;
  const totalLearned = countLearned('vocab') + countLearned('chars') + countLearned('grammar');
  const totalMastered = ['vocab', 'chars', 'grammar'].reduce((s, t) =>
    s + getItems(t === 'vocab' ? 'vocab' : t === 'chars' ? 'chars' : 'grammar')
      .filter(i => getCardSRS(t, i.id).mastered).length, 0);
  const acc = streak.totalAnswered ? Math.round(streak.totalCorrect / streak.totalAnswered * 100) : 0;

  document.getElementById('statTotal').textContent = totalLearned;
  document.getElementById('statMastered').textContent = totalMastered;
  document.getElementById('statStreak').textContent = streak.streak;
  document.getElementById('statAccuracy').textContent = acc + '%';
  document.getElementById('statsStreak').textContent = '🔥 ' + streak.streak;
}

// ===== STUDY VIEW =====
function renderStudySetup() {
  document.getElementById('studySetup').classList.remove('hidden');
  document.getElementById('flashcardArea').classList.add('hidden');
  document.getElementById('sessionComplete').classList.add('hidden');

  // Sync content pills
  document.querySelectorAll('#studyContentPills .pill').forEach(b => {
    b.classList.toggle('active', b.dataset.content === state.study.content);
  });
  // Sync sort pills
  document.querySelectorAll('[data-sort]').forEach(b => {
    b.classList.toggle('active', b.dataset.sort === state.study.sort);
  });

  buildChapterPills('studyChapterPills', state.study.content, state.study.chapter, ch => {
    state.study.chapter = ch;
  });
  buildStarFilterPills('studyStarPills', state.study.selectedStars, sel => {
    state.study.selectedStars = sel;
  });
}

function startStudySession() {
  const { content, chapter, sort, selectedStars } = state.study;
  let items = filterByChapter(getItems(content), chapter);
  items = filterByStars(items, selectedStars, content);

  if (sort === 'due') {
    items = items.filter(i => isDue(getCardSRS(content, i.id)));
    items.sort((a, b) => getCardSRS(content, a.id).nextReview - getCardSRS(content, b.id).nextReview);
  } else if (sort === 'random') {
    items = shuffle(items);
  }

  state.study.deck = items;
  state.study.idx = 0;
  state.study.flipped = false;
  state.study.sessionStart = Date.now();
  state.study.sessionCorrect = 0;
  state.study.sessionTotal = 0;

  document.getElementById('studySetup').classList.add('hidden');
  document.getElementById('sessionComplete').classList.add('hidden');
  document.getElementById('flashcardArea').classList.remove('hidden');
  renderStudyCard();
}

function renderStudyCard() {
  const { deck, idx, content } = state.study;
  if (!deck.length) {
    showSessionComplete();
    return;
  }
  if (idx >= deck.length) {
    showSessionComplete();
    return;
  }

  const item = deck[idx];
  document.getElementById('cardCounter').textContent = (idx + 1) + ' / ' + deck.length;
  document.getElementById('prevBtn').disabled = idx === 0;
  document.getElementById('nextBtn').disabled = false;

  const cardInner = document.getElementById('cardInner');
  cardInner.classList.remove('flipped');
  state.study.flipped = false;

  document.getElementById('ratingRow').classList.remove('hidden');
  const lastStars = getCardSRS(content, deck[idx].id).lastStars || 0;
  document.querySelectorAll('.star-btn').forEach((b, i) => {
    b.classList.toggle('selected', i < lastStars);
    b.classList.remove('hovered');
  });
  const sh = document.getElementById('starHint');
  if (sh) sh.textContent = lastStars ? STAR_HINTS[lastStars - 1] : '';

  if (content === 'vocab') {
    document.getElementById('cardMain').textContent = item.word;
    document.getElementById('cardHint').textContent = '';
    document.getElementById('cardAnswer').textContent = item.meaning;
    document.getElementById('cardDetails').textContent = item.pinyin + ' · ' + item.pos + ' · Ch.' + item.chapter;
    document.getElementById('cardExample').innerHTML = item.example + '<br><em>' + item.exampleEn + '</em>';
  } else if (content === 'chars') {
    document.getElementById('cardMain').textContent = item.character;
    document.getElementById('cardHint').textContent = item.strokes + ' strokes';
    document.getElementById('cardAnswer').textContent = item.meaning;
    document.getElementById('cardDetails').textContent = item.pinyin + ' · Ch.' + item.chapter;
    const exStr = item.examples.map((e, i) => e + ' (' + item.examplesEn[i] + ')').join(' · ');
    document.getElementById('cardExample').textContent = exStr;
  } else if (content === 'grammar') {
    document.getElementById('cardMain').textContent = item.pattern;
    document.getElementById('cardHint').textContent = item.category;
    document.getElementById('cardAnswer').textContent = item.meaning;
    document.getElementById('cardDetails').textContent = item.level;
    document.getElementById('cardExample').innerHTML = item.example + '<br><em>' + item.exampleEn + '</em>';
  }
}

function shuffleRemaining() {
  const { deck, idx } = state.study;
  if (idx >= deck.length - 1) return;
  const done = deck.slice(0, idx);
  const remaining = shuffle(deck.slice(idx));
  state.study.deck = [...done, ...remaining];
  renderStudyCard();
}

function flipCard() {
  state.study.flipped = !state.study.flipped;
  document.getElementById('cardInner').classList.toggle('flipped', state.study.flipped);
}

function rateCard(rating, stars) {
  const { deck, idx, content } = state.study;
  const item = deck[idx];
  const oldCard = getCardSRS(content, item.id);
  const newCard = sm2Update(oldCard, rating);
  if (stars) newCard.lastStars = stars;
  setCardSRS(content, item.id, newCard);
  state.study.sessionTotal++;
  if (rating >= 3) state.study.sessionCorrect++;
  state.streak.totalAnswered++;
  if (rating >= 3) state.streak.totalCorrect++;
  saveSRS(state.srs);
  saveStreak(state.streak);
}

function nextCard() {
  state.study.idx++;
  if (state.study.idx >= state.study.deck.length) {
    showSessionComplete();
  } else {
    renderStudyCard();
  }
}

function prevCard() {
  if (state.study.idx > 0) {
    state.study.idx--;
    renderStudyCard();
  }
}

function showSessionComplete() {
  const elapsed = Math.round((Date.now() - state.study.sessionStart) / 60000);
  document.getElementById('studySetup').classList.add('hidden');
  document.getElementById('flashcardArea').classList.add('hidden');
  document.getElementById('sessionComplete').classList.remove('hidden');
  document.getElementById('csCards').textContent = state.study.sessionTotal;
  document.getElementById('csCorrect').textContent = state.study.sessionCorrect;
  document.getElementById('csTime').textContent = elapsed || '<1';
}

// ===== QUIZ VIEW =====
function buildQuizControls(content) {
  buildChapterPills('quizChapterPills', content, state.quiz.chapter, ch => {
    state.quiz.chapter = ch;
  });
  buildStarFilterPills('quizStarPills', state.quiz.selectedStars, sel => {
    state.quiz.selectedStars = sel;
  });
}

function startQuiz() {
  const { content, type, chapter, count, selectedStars } = state.quiz;
  let pool = filterByChapter(getItems(content), chapter);
  pool = filterByStars(pool, selectedStars, content);
  pool = shuffle(pool);
  if (count !== 'all') pool = pool.slice(0, Number(count));

  const fullPool = getItems(content);
  state.quiz.questions = pool.map(item => buildQuestion(item, content, type, pool, fullPool));
  state.quiz.idx = 0;
  state.quiz.correct = 0;
  state.quiz.wrong = 0;
  state.quiz.mistakes = [];
  state.quiz.active = true;

  document.getElementById('quizSetup').classList.add('hidden');
  document.getElementById('quizResults').classList.add('hidden');
  document.getElementById('quizActive').classList.remove('hidden');
  renderQuizQuestion();
}

function buildQuestion(item, content, type, pool, fullPool) {
  const q = { item, content, type, answered: false };
  if (type === 'type-meaning' || type === 'type-pinyin' || type === 'type-word') return q;

  // Draw distractors from the full content list for variety, one from each of
  // 3 different chapters (excluding the correct item's chapter where possible).
  const otherChapters = [...new Set(fullPool.map(i => i.chapter))].filter(ch => ch !== item.chapter);
  const wrongs = [];

  // One distractor per different chapter, shuffled
  const chapterPick = shuffle(otherChapters);
  for (const ch of chapterPick) {
    if (wrongs.length >= 3) break;
    const candidates = fullPool.filter(i => i.chapter === ch && i.id !== item.id);
    if (candidates.length) wrongs.push(candidates[Math.floor(Math.random() * candidates.length)]);
  }

  // Top up from full pool if we still need more (e.g. only one chapter exists)
  if (wrongs.length < 3) {
    const extra = shuffle(fullPool.filter(i => i.id !== item.id && !wrongs.find(w => w.id === i.id)));
    wrongs.push(...extra.slice(0, 3 - wrongs.length));
  }

  q.options = shuffle([item, ...wrongs.slice(0, 3)]);
  return q;
}

function renderQuizQuestion() {
  const { questions, idx } = state.quiz;
  if (idx >= questions.length) { showQuizResults(); return; }

  const q = questions[idx];
  const total = questions.length;
  const pct = (idx / total * 100) + '%';

  document.getElementById('quizProgressFill').style.width = pct;
  document.getElementById('quizNum').textContent = (idx + 1) + '/' + total;
  document.getElementById('quizScore').textContent = '✓ ' + state.quiz.correct + ' ✗ ' + state.quiz.wrong;
  document.getElementById('quizFeedback').classList.add('hidden');
  document.getElementById('typingArea').classList.add('hidden');
  document.getElementById('sentenceArea').classList.add('hidden');
  document.getElementById('quizChoices').classList.add('hidden');
  document.getElementById('quizChoices').innerHTML = '';
  document.getElementById('quizPrompt').classList.remove('sentence-prompt');
  document.getElementById('quizPrompt').textContent = '';

  const typingInput = document.getElementById('typingInput');
  typingInput.value = '';
  typingInput.className = 'typing-input';
  typingInput.disabled = false;

  const { item, content, type } = q;

  if (type === 'meaning') {
    // Show word/char, pick meaning
    document.getElementById('quizPrompt').textContent = content === 'grammar' ? item.pattern : (content === 'chars' ? item.character : item.word);
    document.getElementById('quizSub').textContent = '';
    renderMCChoices(q, opt => opt.meaning);
  } else if (type === 'word') {
    // Show meaning, pick word/char
    document.getElementById('quizPrompt').textContent = item.meaning;
    document.getElementById('quizSub').textContent = content === 'grammar' ? item.category : '';
    renderMCChoices(q, opt => content === 'chars' ? opt.character : (content === 'grammar' ? opt.pattern : opt.word));
  } else if (type === 'type-meaning') {
    document.getElementById('quizPrompt').textContent = content === 'grammar' ? item.pattern : (content === 'chars' ? item.character : item.word);
    document.getElementById('quizSub').textContent = content === 'grammar' ? item.category : '輸入英文意思';
    document.getElementById('typingArea').classList.remove('hidden');
    document.getElementById('typingInput').placeholder = 'type the meaning…';
    document.getElementById('typingInput').focus();
  } else if (type === 'type-pinyin') {
    document.getElementById('quizPrompt').textContent = content === 'chars' ? item.character : (content === 'vocab' ? item.word : item.pattern);
    document.getElementById('quizSub').textContent = content === 'vocab' ? item.meaning : '輸入拼音';
    document.getElementById('typingArea').classList.remove('hidden');
    document.getElementById('typingInput').placeholder = 'type pinyin…';
    document.getElementById('typingInput').focus();
  } else if (type === 'type-word') {
    const correctWord = (item.word || item.character || item.pattern || '').trim();
    const sentence = item.example || '';
    const idx = sentence.indexOf(correctWord);
    const sentenceInput = document.getElementById('sentenceInput');
    sentenceInput.value = '';
    sentenceInput.className = 'sentence-input';
    sentenceInput.disabled = false;
    sentenceInput.style.width = Math.max(2, correctWord.length + 1) + 'em';
    if (idx !== -1) {
      document.getElementById('sentenceBefore').textContent = sentence.slice(0, idx);
      document.getElementById('sentenceAfter').textContent = sentence.slice(idx + correctWord.length);
    } else {
      document.getElementById('sentenceBefore').textContent = sentence || item.meaning;
      document.getElementById('sentenceAfter').textContent = '';
    }
    document.getElementById('quizPrompt').textContent = '';
    document.getElementById('quizSub').textContent = '';
    document.getElementById('sentenceArea').classList.remove('hidden');
    sentenceInput.focus();
  } else if (type === 'sentence-mc') {
    const correctWord = (item.word || item.character || item.pattern || '').trim();
    const sentence = item.example || item.meaning;
    const idx = sentence.indexOf(correctWord);
    const promptEl = document.getElementById('quizPrompt');
    promptEl.classList.add('sentence-prompt');
    if (idx !== -1) {
      const before = document.createTextNode(sentence.slice(0, idx));
      const blank = document.createElement('span');
      blank.className = 'quiz-blank';
      const after = document.createTextNode(sentence.slice(idx + correctWord.length));
      promptEl.innerHTML = '';
      promptEl.append(before, blank, after);
    } else {
      promptEl.textContent = sentence;
    }
    document.getElementById('quizSub').textContent = '';
    renderMCChoices(q, opt => opt.word || opt.character || opt.pattern || '');
  }
}

function renderMCChoices(q, labelFn) {
  const container = document.getElementById('quizChoices');
  container.classList.remove('hidden');
  container.innerHTML = '';
  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = labelFn(opt);
    btn.addEventListener('click', () => handleMCAnswer(q, opt, btn));
    container.appendChild(btn);
  });
}

function handleMCAnswer(q, chosen, btn) {
  if (q.answered) return;
  q.answered = true;

  const correct = chosen.id === q.item.id;
  const allBtns = document.querySelectorAll('.choice-btn');

  allBtns.forEach(b => {
    b.disabled = true;
    if (b.textContent === getMCCorrectLabel(q)) b.classList.add('correct');
  });

  if (correct) {
    btn.classList.add('correct');
    state.quiz.correct++;
  } else {
    btn.classList.add('wrong');
    state.quiz.wrong++;
    state.quiz.mistakes.push(q.item);
  }

  state.streak.totalAnswered++;
  if (correct) state.streak.totalCorrect++;
  saveSRS(state.srs);
  saveStreak(state.streak);

  showQuizFeedback(correct, q.item);
}

function getMCCorrectLabel(q) {
  const { item, content, type } = q;
  if (type === 'meaning') return item.meaning;
  if (type === 'word') return content === 'chars' ? item.character : (content === 'grammar' ? item.pattern : item.word);
  if (type === 'sentence-mc') return item.word || item.character || item.pattern || '';
  return item.meaning;
}

function checkTypingAnswer() {
  const q = state.quiz.questions[state.quiz.idx];
  if (!q || q.answered) return;
  q.answered = true;

  const { item, type } = q;
  const isSentenceMode = type === 'type-word';
  const input = document.getElementById(isSentenceMode ? 'sentenceInput' : 'typingInput');
  const userRaw = input.value.trim();

  let correct = false;
  let correctAnswer = '';

  if (type === 'type-meaning') {
    const user = userRaw.toLowerCase().trim();
    const ans = item.meaning.toLowerCase().trim();
    correct = user === ans || ans.split(',').map(s => s.trim()).includes(user) || ans.split('/').map(s => s.trim()).includes(user);
    correctAnswer = item.meaning;
  } else if (type === 'type-pinyin') {
    const userNorm = normalizePinyin(userRaw);
    const answerPin = item.pinyin || '';
    const ansNorm = normalizePinyin(answerPin);
    correct = userNorm === ansNorm;
    correctAnswer = answerPin;
  } else if (type === 'type-word') {
    const correctWord = (item.word || item.character || item.pattern || '').trim();
    correct = userRaw === correctWord;
    correctAnswer = correctWord;
  }

  input.className = (isSentenceMode ? 'sentence-input' : 'typing-input') + ' ' + (correct ? 'correct' : 'wrong');
  input.disabled = true;

  if (correct) state.quiz.correct++;
  else { state.quiz.wrong++; state.quiz.mistakes.push(item); }

  state.streak.totalAnswered++;
  if (correct) state.streak.totalCorrect++;
  saveSRS(state.srs);
  saveStreak(state.streak);

  showQuizFeedback(correct, item, correctAnswer);
}

function showQuizFeedback(correct, item, correctAnswer) {
  const feedbackEl = document.getElementById('quizFeedback');
  const textEl = document.getElementById('feedbackText');
  const detailEl = document.getElementById('feedbackDetail');

  const activeType = state.quiz.questions[state.quiz.idx] && state.quiz.questions[state.quiz.idx].type;
  if (activeType === 'type-word') {
    // Restore the correct word in the inline input and reveal meaning + pinyin
    const word = item.word || item.character || item.pattern || '';
    document.getElementById('sentenceInput').value = word;
    document.getElementById('quizSub').textContent = word + (item.pinyin ? '  ' + item.pinyin : '') + '  —  ' + item.meaning;
  } else if (activeType === 'sentence-mc') {
    // Fill the blank with the correct word and reveal meaning
    document.getElementById('quizPrompt').textContent = item.example || '';
    document.getElementById('quizSub').textContent = (item.word || item.character || item.pattern || '') + (item.pinyin ? '  ' + item.pinyin : '') + '  —  ' + item.meaning;
  } else if (item.pinyin) {
    document.getElementById('quizSub').textContent = item.pinyin;
  }

  feedbackEl.classList.remove('hidden');
  textEl.className = 'feedback-text ' + (correct ? 'correct-text' : 'wrong-text');
  textEl.textContent = correct ? '正確！✓' : '錯誤 ✗';

  if (!correct && correctAnswer) {
    detailEl.textContent = '正確答案：' + correctAnswer + (item.exampleEn ? '  —  ' + item.exampleEn : '');
  } else if (item.exampleEn) {
    detailEl.textContent = item.exampleEn;
  } else {
    detailEl.textContent = '';
  }
}

function nextQuizQuestion() {
  state.quiz.idx++;
  renderQuizQuestion();
}

function showQuizResults() {
  document.getElementById('quizActive').classList.add('hidden');
  document.getElementById('quizResults').classList.remove('hidden');

  const total = state.quiz.questions.length;
  const correct = state.quiz.correct;
  const pct = total ? Math.round(correct / total * 100) : 0;

  document.getElementById('resultsScore').textContent = correct + ' / ' + total;
  document.getElementById('resultsGrade').textContent = pct + '%  ' + getGrade(pct);

  const breakdownEl = document.getElementById('resultsBreakdown');
  breakdownEl.textContent = '正確 ' + correct + ' · 錯誤 ' + state.quiz.wrong;

  const mistakesEl = document.getElementById('resultsMistakes');
  if (state.quiz.mistakes.length) {
    mistakesEl.innerHTML = '<div class="mistakes-title">需要複習</div>';
    state.quiz.mistakes.slice(0, 8).forEach(item => {
      const d = document.createElement('div');
      d.className = 'mistake-item';
      const word = item.word || item.character || item.pattern;
      const pin = item.pinyin || '';
      d.innerHTML = '<span class="mistake-word">' + word + '</span><span class="mistake-info">' + pin + (pin ? ' · ' : '') + item.meaning + '</span>';
      mistakesEl.appendChild(d);
    });
  } else {
    mistakesEl.innerHTML = '<div style="color:var(--correct);text-align:center;padding:12px;">完美！🎉</div>';
  }
}

function getGrade(pct) {
  if (pct >= 90) return '優秀 🌟';
  if (pct >= 75) return '良好 👍';
  if (pct >= 60) return '及格 📚';
  return '繼續加油 💪';
}

// ===== CHARACTERS =====
function renderCharsGrid() {
  buildChapterPills('charsChapterPills', 'chars', state.chars.chapter, ch => {
    state.chars.chapter = ch;
    renderCharsGrid();
  });

  const items = filterByChapter(CHARACTERS, state.chars.chapter);
  const grid = document.getElementById('charsGrid');
  grid.innerHTML = '';
  items.forEach(item => {
    const card = document.createElement('div');
    const srs = getCardSRS('chars', item.id);
    let srsClass = srs.mastered ? ' srs-mastered' : srs.learned ? ' srs-learned' : '';
    card.className = 'char-card' + srsClass;
    card.innerHTML = '<span class="ch-char">' + item.character + '</span><div class="ch-pin">' + item.pinyin + '</div><div class="ch-num">' + item.strokes + ' 劃</div>';
    card.addEventListener('click', () => openCharModal(item));
    grid.appendChild(card);
  });
}

function openCharModal(item) {
  document.getElementById('charDisplay').textContent = item.character;
  document.getElementById('charPinyin').textContent = item.pinyin;
  document.getElementById('charMeaning').textContent = item.meaning;
  document.getElementById('charStrokes').textContent = item.strokes + ' strokes';
  document.getElementById('charChapter').textContent = 'Ch. ' + item.chapter;
  const exEl = document.getElementById('charExamples');
  exEl.innerHTML = '';
  item.examples.forEach((ex, i) => {
    const tag = document.createElement('span');
    tag.className = 'char-ex-tag';
    tag.title = item.examplesEn[i] || '';
    tag.textContent = ex;
    exEl.appendChild(tag);
  });
  document.getElementById('charModal').classList.remove('hidden');
}

// ===== VOCABULARY =====
function renderVocabList() {
  buildChapterPills('vocabChapterPills', 'vocab', state.vocab.chapter, ch => {
    state.vocab.chapter = ch;
    renderVocabList();
  });
  buildStarFilterPills('vocabStarPills', state.vocab.selectedStars, sel => {
    state.vocab.selectedStars = sel;
    renderVocabList();
  });

  const search = state.vocab.search.toLowerCase();
  let items = filterByChapter(VOCABULARY, state.vocab.chapter);
  items = filterByStars(items, state.vocab.selectedStars, 'vocab');
  if (search) items = items.filter(i =>
    i.word.includes(search) || i.pinyin.toLowerCase().includes(search) ||
    i.meaning.toLowerCase().includes(search)
  );

  if (state.vocab.sort === 'stars-desc') {
    items = [...items].sort((a, b) => (getCardSRS('vocab', b.id).lastStars || 0) - (getCardSRS('vocab', a.id).lastStars || 0));
  } else if (state.vocab.sort === 'stars-asc') {
    items = [...items].sort((a, b) => (getCardSRS('vocab', a.id).lastStars || 0) - (getCardSRS('vocab', b.id).lastStars || 0));
  }

  const list = document.getElementById('vocabList');
  list.innerHTML = '';
  items.forEach(item => {
    const srs = getCardSRS('vocab', item.id);
    let srsClass = srs.mastered ? ' srs-mastered' : srs.learned ? ' srs-learned' : '';
    const stars = srs.lastStars || 0;
    const starsHtml = Array.from({length: 5}, (_, i) =>
      `<span class="vocab-star${i < stars ? ' filled' : ''}">★</span>`
    ).join('');
    const row = document.createElement('div');
    row.className = 'vocab-item' + srsClass;
    row.innerHTML = `
      <div>
        <div class="vocab-word">${item.word}</div>
        <div class="vocab-pin">${item.pinyin}</div>
      </div>
      <div class="vocab-mid">
        <div class="vocab-meaning">${item.meaning}</div>
        <div class="vocab-pos">${item.pos}</div>
      </div>
      <div class="vocab-stars">${starsHtml}</div>
      <div class="vocab-chapter-badge">Ch.${item.chapter}</div>
    `;
    // Toggle example on click
    row.addEventListener('click', () => {
      const existing = row.nextElementSibling;
      if (existing && existing.classList.contains('vocab-expanded')) {
        existing.remove();
      } else {
        const exp = document.createElement('div');
        exp.className = 'vocab-expanded';
        exp.innerHTML = '<div class="vocab-ex-zh">' + (item.example || '') + '</div><div class="vocab-ex-en">' + (item.exampleEn || '') + '</div>';
        row.insertAdjacentElement('afterend', exp);
      }
    });
    list.appendChild(row);
  });
}

// ===== GRAMMAR =====
function renderGrammarList() {
  let items = GRAMMAR;
  if (state.grammar.level !== 'all') items = items.filter(i => i.level === state.grammar.level);

  const list = document.getElementById('grammarList');
  list.innerHTML = '';
  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'grammar-item';
    div.innerHTML = `
      <div class="grammar-pattern">${item.pattern}</div>
      <div class="grammar-meaning">${item.meaning}</div>
      <div class="grammar-example">${item.example}</div>
      <span class="grammar-level-badge level-${item.level}">${getLevelZh(item.level)}</span>
    `;
    div.addEventListener('click', () => openGrammarModal(item));
    list.appendChild(div);
  });
}

function getLevelZh(level) {
  if (level === 'beginner') return '初級';
  if (level === 'intermediate') return '中級';
  if (level === 'advanced') return '高級';
  return level;
}

function openGrammarModal(item) {
  document.getElementById('gmPattern').textContent = item.pattern;
  document.getElementById('gmMeaning').textContent = item.meaning;
  document.getElementById('gmUsage').textContent = item.usage;
  document.getElementById('gmExZh').textContent = item.example;
  document.getElementById('gmExEn').textContent = item.exampleEn;
  document.getElementById('gmMeta').textContent = item.category + ' · ' + getLevelZh(item.level);
  document.getElementById('grammarModal').classList.remove('hidden');
}

// ===== SAVE / STREAK =====
function updateDailyStreak() {
  const today = new Date().toDateString();
  const s = state.streak;
  if (s.lastDate === today) return;
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  if (s.lastDate === yesterday) s.streak++;
  else if (s.lastDate !== today) s.streak = 1;
  s.lastDate = today;
  saveStreak(s);
}

// ===== STAR RATING CONSTANTS =====
const STAR_HINTS = ['完全不記得', '很困難', '還可以', '有把握', '非常熟悉'];
const STAR_TO_SM2 = [1, 2, 3, 4, 4]; // 1-5 stars → SM2 1-4

// ===== INIT =====
function init() {
  updateDailyStreak();

  // Nav toggle
  document.getElementById('navToggle').addEventListener('click', e => {
    e.stopPropagation();
    const menu = document.getElementById('navMenu');
    if (menu.classList.contains('open')) closeNav(); else openNav();
  });
  document.addEventListener('click', e => {
    if (!document.getElementById('navDropdown').contains(e.target)) closeNav();
  });

  // Nav items
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => showView(btn.dataset.view));
  });

  // Save button
  document.getElementById('saveBtn').addEventListener('click', () => {
    saveSRS(state.srs);
    saveStreak(state.streak);
    document.getElementById('saveBtn').textContent = '✅';
    setTimeout(() => { document.getElementById('saveBtn').textContent = '💾'; }, 1200);
  });

  // Dashboard buttons
  document.getElementById('startReviewBtn').addEventListener('click', () => {
    state.study.sort = 'due';
    showView('study');
  });
  document.querySelectorAll('.quick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      if (action === 'study-vocab') { state.study.content = 'vocab'; showView('study'); }
      else if (action === 'study-chars') { state.study.content = 'chars'; showView('study'); }
      else if (action === 'quiz-mc') { state.quiz.type = 'meaning'; showView('quiz'); }
      else if (action === 'quiz-type') { state.quiz.type = 'type-pinyin'; showView('quiz'); }
    });
  });

  // Study controls
  document.getElementById('studyContentPills').addEventListener('click', e => {
    const btn = e.target.closest('.pill');
    if (!btn || !btn.dataset.content) return;
    document.querySelectorAll('#studyContentPills .pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.study.content = btn.dataset.content;
    state.study.chapter = 'all';
    state.study.selectedStars = 'all';
    buildChapterPills('studyChapterPills', state.study.content, 'all', ch => { state.study.chapter = ch; });
    buildStarFilterPills('studyStarPills', 'all', sel => { state.study.selectedStars = sel; });
  });

  document.querySelectorAll('[data-sort]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-sort]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.study.sort = btn.dataset.sort;
    });
  });

  document.getElementById('flashcard').addEventListener('click', flipCard);
  document.getElementById('flashcard').addEventListener('keydown', e => {
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flipCard(); }
  });
  document.getElementById('shuffleBtn').addEventListener('click', e => { e.stopPropagation(); shuffleRemaining(); });
  document.getElementById('prevBtn').addEventListener('click', prevCard);
  document.getElementById('nextBtn').addEventListener('click', nextCard);

  const starGroup = document.getElementById('starGroup');
  const starHintEl = document.getElementById('starHint');

  starGroup.addEventListener('mouseover', e => {
    const btn = e.target.closest('.star-btn');
    if (!btn) return;
    const n = Number(btn.dataset.stars);
    starGroup.querySelectorAll('.star-btn').forEach((b, i) => {
      b.classList.toggle('hovered', i < n);
    });
    starHintEl.textContent = STAR_HINTS[n - 1];
  });

  starGroup.addEventListener('mouseleave', () => {
    starGroup.querySelectorAll('.star-btn').forEach(b => b.classList.remove('hovered'));
    starHintEl.textContent = '';
  });

  starGroup.addEventListener('click', e => {
    const btn = e.target.closest('.star-btn');
    if (!btn) return;
    const stars = Number(btn.dataset.stars);
    starGroup.querySelectorAll('.star-btn').forEach((b, i) => {
      b.classList.toggle('selected', i < stars);
      b.classList.remove('hovered');
    });
    starHintEl.textContent = STAR_HINTS[stars - 1];
    rateCard(STAR_TO_SM2[stars - 1], stars);
  });
  document.getElementById('startStudyBtn').addEventListener('click', startStudySession);
  document.getElementById('quitStudyBtn').addEventListener('click', renderStudySetup);
  document.getElementById('studyAgainBtn').addEventListener('click', startStudySession);
  document.getElementById('newStudyBtn').addEventListener('click', renderStudySetup);

  // Quiz setup
  document.getElementById('quizContentPills').addEventListener('click', e => {
    const btn = e.target.closest('.pill');
    if (!btn || !btn.dataset.content) return;
    document.querySelectorAll('#quizContentPills .pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.quiz.content = btn.dataset.content;
    state.quiz.chapter = 'all';
    state.quiz.selectedStars = 'all';
    buildQuizControls(state.quiz.content);
  });

  document.getElementById('quizTypePills').addEventListener('click', e => {
    const btn = e.target.closest('.pill');
    if (!btn || !btn.dataset.type) return;
    document.querySelectorAll('#quizTypePills .pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.quiz.type = btn.dataset.type;
  });

  document.querySelectorAll('[data-count]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-count]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.quiz.count = btn.dataset.count === 'all' ? 'all' : Number(btn.dataset.count);
    });
  });

  document.getElementById('startQuizBtn').addEventListener('click', startQuiz);

  // Quiz active
  document.getElementById('checkTypingBtn').addEventListener('click', checkTypingAnswer);
  document.getElementById('checkSentenceBtn').addEventListener('click', checkTypingAnswer);
  document.getElementById('typingInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const q = state.quiz.questions[state.quiz.idx];
      if (q && q.answered) nextQuizQuestion();
      else checkTypingAnswer();
    }
  });
  document.getElementById('sentenceInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const q = state.quiz.questions[state.quiz.idx];
      if (q && q.answered) nextQuizQuestion();
      else checkTypingAnswer();
    }
  });
  document.getElementById('nextQuizBtn').addEventListener('click', nextQuizQuestion);
  document.getElementById('quitQuizBtn').addEventListener('click', () => {
    document.getElementById('quizActive').classList.add('hidden');
    document.getElementById('quizResults').classList.add('hidden');
    document.getElementById('quizSetup').classList.remove('hidden');
    buildQuizControls(state.quiz.content);
  });
  document.getElementById('retryQuizBtn').addEventListener('click', startQuiz);
  document.getElementById('newQuizBtn').addEventListener('click', () => {
    document.getElementById('quizResults').classList.add('hidden');
    document.getElementById('quizSetup').classList.remove('hidden');
    buildQuizControls(state.quiz.content);
  });

  // Chars modal
  document.getElementById('charModalClose').addEventListener('click', () => {
    document.getElementById('charModal').classList.add('hidden');
  });
  document.getElementById('charModal').addEventListener('click', e => {
    if (e.target === document.getElementById('charModal')) document.getElementById('charModal').classList.add('hidden');
  });

  // Grammar modal
  document.getElementById('grammarModalClose').addEventListener('click', () => {
    document.getElementById('grammarModal').classList.add('hidden');
  });
  document.getElementById('grammarModal').addEventListener('click', e => {
    if (e.target === document.getElementById('grammarModal')) document.getElementById('grammarModal').classList.add('hidden');
  });

  // Vocab search & filters
  document.getElementById('vocabSearch').addEventListener('input', e => {
    state.vocab.search = e.target.value;
    renderVocabList();
  });

  document.getElementById('vocabSortPills').addEventListener('click', e => {
    const btn = e.target.closest('.pill');
    if (!btn || !btn.dataset.vocabSort) return;
    document.querySelectorAll('#vocabSortPills .pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.vocab.sort = btn.dataset.vocabSort;
    renderVocabList();
  });

  // Grammar level filter
  document.getElementById('grammarLevelPills').addEventListener('click', e => {
    const btn = e.target.closest('.pill');
    if (!btn || !btn.dataset.level) return;
    document.querySelectorAll('#grammarLevelPills .pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.grammar.level = btn.dataset.level;
    renderGrammarList();
  });

  // Build initial quiz chapter pills
  buildQuizControls(state.quiz.content);

  // Show dashboard
  showView('dashboard');
}

document.addEventListener('DOMContentLoaded', init);
