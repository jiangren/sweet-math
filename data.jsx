// ─── Themes ───────────────────────────────────────────────────────────────
const THEMES = {
  icecream: {
    key: 'icecream',
    nameZh: '冰激凌', nameEn: 'Ice Cream',
    descZh: '清凉一夏', descEn: 'Cool & Sweet',
    icon: '🍦',
    tokens: ['🍦', '🍨', '🍧', '🍒', '🍓'],
    landIcons: ['🍓', '🍋', '🍃', '🫐', '🍇'],
    accent: '#FF8DA1',
  },
  lollipop: {
    key: 'lollipop',
    nameZh: '棒棒糖', nameEn: 'Lollipop',
    descZh: '甜甜旋转', descEn: 'Swirly Sweet',
    icon: '🍭',
    tokens: ['🍭', '🍬', '🌈', '⭐', '🎀'],
    landIcons: ['🍭', '🍬', '🌈', '⭐', '🎀'],
    accent: '#FF4D9D',
  },
  donut: {
    key: 'donut',
    nameZh: '甜甜圈', nameEn: 'Donut',
    descZh: '香甜可口', descEn: 'Yum Yum',
    icon: '🍩',
    tokens: ['🍩', '🥯', '🍪', '🧁', '🍫'],
    landIcons: ['🍩', '🧁', '🍪', '🍫', '🥐'],
    accent: '#FF6FA7',
  },
};

// ─── Bilingual dictionary ─────────────────────────────────────────────────
const STRINGS = {
  appName:        { zh: '甜甜数学乐园',     en: 'Sweet Math Land' },
  appTagline:     { zh: '陪宝贝吃糖学算数',   en: 'Math with sweets, made for tiny chefs' },
  start:          { zh: '开始玩',          en: "Let's Play" },
  continue:       { zh: '继续上次',         en: 'Continue' },
  badges:         { zh: '我的奖章',         en: 'My Badges' },
  pickTheme:      { zh: '选一个甜品世界',     en: 'Pick your sweet world' },
  parentTip1:     { zh: '👨‍👧 亲子提示',     en: '👨‍👧 Tip for grown-ups' },
  parentTipBody:  { zh: '建议每次玩 10 分钟，做完一关就鼓励宝宝说出题目。',
                    en: 'Play for 10 min, then ask your child to say the problem out loud.' },

  // Lands
  land1Name: { zh: '加法乐园',   en: 'Addition Park'    },
  land1Desc: { zh: '把好吃的加在一起', en: 'Put yummies together' },
  land2Name: { zh: '减法森林',   en: 'Subtraction Forest' },
  land2Desc: { zh: '吃掉一些，还剩多少', en: 'Eat some, count what is left' },
  land3Name: { zh: '综合大作战', en: 'Mixed Adventure' },
  land3Desc: { zh: '加加减减都难不倒你', en: 'Add and take away mixed' },
  land4Name: { zh: '乘法星球',   en: 'Times Planet' },
  land4Desc: { zh: '一组一组数数看',   en: 'Count by groups' },
  land5Name: { zh: '分享小岛',   en: 'Sharing Isle' },
  land5Desc: { zh: '平分给好朋友',     en: 'Share with friends' },

  // Tier labels
  tier10:  { zh: '10以内',  en: '≤ 10'  },
  tier20:  { zh: '20以内',  en: '≤ 20'  },
  tier50:  { zh: '50以内',  en: '≤ 50'  },
  tier80:  { zh: '80以内',  en: '≤ 80'  },
  tier100: { zh: '100以内', en: '≤ 100' },

  level:        { zh: '第 {n} 关', en: 'Level {n}' },
  levelShort:   { zh: '{n}', en: '{n}' },
  question:     { zh: '第 {n} / {t} 题', en: 'Q {n} / {t}' },
  prompt_count: { zh: '数一数有几个？', en: 'How many in total?' },
  prompt_solve: { zh: '算一算等于几？', en: "What's the answer?" },
  prompt_drag:  { zh: '把数字拖到方框里', en: 'Drag the number into the box' },
  prompt_take:  { zh: '减掉以后还剩几个？', en: 'How many are left?' },
  prompt_group: { zh: '一共有几个？',     en: 'How many altogether?' },
  prompt_share: { zh: '平分给小朋友，每人几个？', en: 'Share equally — each gets?' },
  greatJob:     { zh: '太棒了！', en: 'Great!' },
  almost:       { zh: '再想想~', en: 'Try again!' },
  tryAgain:     { zh: '再来一次', en: 'Try again' },
  next:         { zh: '下一关',   en: 'Next level' },
  backMap:      { zh: '回到地图', en: 'Back to map' },
  backHome:     { zh: '回到首页', en: 'Home' },
  levelDone:    { zh: '通关啦！', en: 'Level cleared!' },
  newBadge:     { zh: '新奖章！', en: 'New badge!' },
  yourBadges:   { zh: '你的奖章柜', en: 'Your trophy case' },
  yourProgress: { zh: '学习进度', en: 'Progress' },
  totalStars:   { zh: '总星星',   en: 'Total stars' },
  levelsClear:  { zh: '通关数',   en: 'Levels' },
  badgesEarned: { zh: '已得奖章', en: 'Badges' },
  locked:       { zh: '尚未解锁',  en: 'Not yet' },
  ageHint:      { zh: '适合 3 岁 +', en: 'Ages 3 +' },
  themeLabel:   { zh: '主题',      en: 'Theme' },
  langLabel:    { zh: '语言',      en: 'Language' },
  soundLabel:   { zh: '音效',      en: 'Sounds' },
  parentMode:   { zh: '家长模式',   en: 'Parent mode' },
  difficulty:   { zh: '难度自动调节', en: 'Auto difficulty' },
  tierTipFirst: { zh: '通过任意一关就解锁下一档难度', en: 'Clear any level to unlock the next tier' },
};

function t(str, lang, vars) {
  let s = typeof str === 'object' ? (str[lang] || str.en || '') : String(str);
  if (vars) Object.keys(vars).forEach(k => { s = s.replace(`{${k}}`, vars[k]); });
  return s;
}

// ─── Tier and Land definitions ────────────────────────────────────────────
const TIERS = [
  { id: 10,  key: 'tier10'  },
  { id: 20,  key: 'tier20'  },
  { id: 50,  key: 'tier50'  },
  { id: 80,  key: 'tier80'  },
  { id: 100, key: 'tier100' },
];
const LEVELS_PER_TIER = 20;
const LANDS_DEF = [
  { id: 'add', op: '+', nameKey: 'land1Name', descKey: 'land1Desc', colorIdx: 1 },
  { id: 'sub', op: '-', nameKey: 'land2Name', descKey: 'land2Desc', colorIdx: 2 },
  { id: 'mix', op: '±', nameKey: 'land3Name', descKey: 'land3Desc', colorIdx: 3 },
  { id: 'mul', op: '×', nameKey: 'land4Name', descKey: 'land4Desc', colorIdx: 4 },
  { id: 'div', op: '÷', nameKey: 'land5Name', descKey: 'land5Desc', colorIdx: 5 },
];

// Tier-relative ranges per operation.
// For +/-/±: [lo, hi] — the result (for +) or minuend (for −) stays within the tier.
// For ×/÷: [[a-lo, a-hi], [b-lo, b-hi]] — factors chosen so product/dividend ≤ tier.
function tierRange(op, tier) {
  if (op === '+' || op === '-' || op === '±') {
    return [1, tier];
  }
  // ×/÷  — keep product within tier
  if (tier <= 10) return [[1, 3], [1, 3]];   // up to 3×3=9
  if (tier <= 20) return [[2, 4], [1, 5]];   // up to 4×5=20
  if (tier <= 50) return [[2, 7], [2, 7]];   // up to 7×7=49
  if (tier <= 80) return [[2, 9], [2, 8]];   // up to 9×8=72
  return [[2, 10], [2, 10]];                  // up to 10×10=100
}

// Each level rotates through 5 question modes. Smaller tiers get more
// counting visuals; larger tiers lean on equations + drag.
function tierModes(op, tier, levelIdx) {
  // levelIdx 1..20: cycle a couple of mode patterns so feel varies
  const patterns = (() => {
    if (tier <= 10) return [
      ['count', 'count', 'solve', 'drag', 'solve'],
      ['count', 'solve', 'count', 'solve', 'drag'],
      ['count', 'solve', 'drag', 'solve', 'count'],
      ['solve', 'count', 'drag', 'count', 'solve'],
    ];
    if (tier <= 20) return [
      ['solve', 'count', 'solve', 'drag', 'drag'],
      ['count', 'solve', 'drag', 'solve', 'drag'],
      ['solve', 'drag', 'count', 'solve', 'drag'],
      ['drag', 'solve', 'solve', 'count', 'drag'],
    ];
    return [
      ['solve', 'solve', 'drag', 'solve', 'drag'],
      ['solve', 'drag', 'solve', 'drag', 'solve'],
      ['drag', 'solve', 'drag', 'solve', 'solve'],
      ['solve', 'drag', 'solve', 'solve', 'drag'],
    ];
  })();
  return patterns[(levelIdx - 1) % patterns.length];
}

// Build the full level structure.
const LANDS = (() => {
  return LANDS_DEF.map((def) => {
    const tiers = TIERS.map(tier => {
      const levels = [];
      for (let i = 1; i <= LEVELS_PER_TIER; i++) {
        levels.push({
          id: `${def.id}-${tier.id}-${i}`,
          landId: def.id,
          op: def.op,
          tier: tier.id,
          tierKey: tier.key,
          index: i,
          range: tierRange(def.op, tier.id),
          modes: tierModes(def.op, tier.id, i),
        });
      }
      return { tier, levels };
    });
    return { ...def, tiers, levels: tiers.flatMap(t => t.levels) };
  });
})();
const ALL_LEVELS = LANDS.flatMap(l => l.levels);
const LEVEL_COUNT = ALL_LEVELS.length;        // = 500

// Helpers
function findLevel(id) {
  return ALL_LEVELS.find(l => l.id === id);
}
function levelLandId(id) { return id.split('-')[0]; }
function levelTier(id)   { return Number(id.split('-')[1]); }

function isLevelUnlocked(level, progress) {
  // First level of tier 10 in any land: always unlocked.
  if (level.tier === 10 && level.index === 1) return true;

  // First level of higher tier: requires any clear in same land's previous tier.
  if (level.index === 1) {
    const tierOrder = TIERS.map(t => t.id);
    const prevTier = tierOrder[tierOrder.indexOf(level.tier) - 1];
    if (!prevTier) return true;
    return Array.from(progress.cleared).some(id =>
      id.startsWith(`${level.landId}-${prevTier}-`)
    );
  }

  // Subsequent levels within a tier: previous-index in same tier cleared.
  const prevId = `${level.landId}-${level.tier}-${level.index - 1}`;
  return progress.cleared.has(prevId);
}

function firstPlayableInLand(landId, progress) {
  const land = LANDS.find(l => l.id === landId);
  if (!land) return null;
  for (const lvl of land.levels) {
    if (!progress.cleared.has(lvl.id) && isLevelUnlocked(lvl, progress)) return lvl;
  }
  // All cleared — return last
  return land.levels[land.levels.length - 1];
}

// ─── Question generator ───────────────────────────────────────────────────
function randInt(lo, hi) { return lo + Math.floor(Math.random() * (hi - lo + 1)); }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function makeQuestion(level, qIndex, seedTokens) {
  const mode = level.modes[qIndex % level.modes.length];
  let op = level.op;
  if (op === '±') op = Math.random() < 0.5 ? '+' : '-';

  let a, b, answer, prompt;

  if (op === '+') {
    const [, hi] = level.range;
    // Bias toward the upper portion of the tier so harder tiers feel different.
    const lo = Math.max(1, Math.floor(hi * 0.3));
    answer = randInt(lo, hi);
    a = randInt(0, answer);
    b = answer - a;
    prompt = 'prompt_solve';
  } else if (op === '-') {
    const [, hi] = level.range;
    const lo = Math.max(1, Math.floor(hi * 0.4));
    a = randInt(lo, hi);
    b = randInt(0, a);
    answer = a - b;
    prompt = 'prompt_take';
  } else if (op === '×') {
    const [ra, rb] = level.range;
    a = randInt(ra[0], ra[1]);
    b = randInt(rb[0], rb[1]);
    answer = a * b;
    prompt = 'prompt_group';
  } else if (op === '÷') {
    const [ra, rb] = level.range;
    const divisor = randInt(ra[0], ra[1]);
    const quotient = randInt(rb[0], rb[1]);
    a = divisor * quotient;
    b = divisor;
    answer = quotient;
    prompt = 'prompt_share';
  }

  // Build 4 distinct choices around the answer (no negatives).
  const choices = [answer];
  const guard = 50;
  let tries = 0;
  while (choices.length < 4 && tries++ < guard) {
    const spread = Math.max(2, Math.ceil(answer * 0.4));
    const delta = randInt(1, spread);
    const cand = Math.random() < 0.5 ? answer + delta : answer - delta;
    if (cand >= 0 && !choices.includes(cand)) choices.push(cand);
  }
  // Fallback fill (small numbers can run out of candidates).
  let f = 0;
  while (choices.length < 4) { if (!choices.includes(f)) choices.push(f); f++; }

  // Shuffle
  for (let i = choices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [choices[i], choices[j]] = [choices[j], choices[i]];
  }

  const token = pick(seedTokens);
  return { mode, op, a, b, answer, choices, prompt, token, id: `${level.id}-${qIndex}` };
}

// ─── Badges ───────────────────────────────────────────────────────────────
// Helpers that operate on the cleared-id Set.
function clearedInLand(s, landId) {
  let n = 0;
  s.cleared.forEach(id => { if (id.startsWith(landId + '-')) n++; });
  return n;
}
function clearedInTier(s, tier) {
  let n = 0;
  s.cleared.forEach(id => { if (levelTier(id) === tier) n++; });
  return n;
}
function hasClearedTier(s, tier) {
  for (const id of s.cleared) if (levelTier(id) === tier) return true;
  return false;
}

const BADGES = [
  { id: 'first',       nameZh: '第一步',     nameEn: 'First Step',
    descZh: '完成第一关',  descEn: 'Finish your first level',  icon: '🥇',
    check: (s) => s.cleared.size >= 1 },
  { id: 'cleared5',    nameZh: '5 关达人',   nameEn: '5 Cleared',
    descZh: '通关 5 关',    descEn: 'Clear 5 levels',         icon: '🍪',
    check: (s) => s.cleared.size >= 5 },
  { id: 'cleared25',   nameZh: '25 关高手', nameEn: '25 Cleared',
    descZh: '通关 25 关',   descEn: 'Clear 25 levels',        icon: '🍰',
    check: (s) => s.cleared.size >= 25 },
  { id: 'cleared100',  nameZh: '100 关大侠', nameEn: '100 Cleared',
    descZh: '通关 100 关',  descEn: 'Clear 100 levels',       icon: '🎂',
    check: (s) => s.cleared.size >= 100 },
  { id: 'cleared250',  nameZh: '250 关传奇', nameEn: '250 Cleared',
    descZh: '通关 250 关',  descEn: 'Clear 250 levels',       icon: '👑',
    check: (s) => s.cleared.size >= 250 },
  { id: 'cleared500',  nameZh: '500 关甜品博士', nameEn: 'Sweet PhD',
    descZh: '通关全部 500 关', descEn: 'Clear all 500 levels', icon: '🎓',
    check: (s) => s.cleared.size >= 500 },

  { id: 'addmaster',   nameZh: '加法乐园',   nameEn: 'Add Park',
    descZh: '加法关通 20',  descEn: 'Clear 20 add levels',    icon: '➕',
    check: (s) => clearedInLand(s, 'add') >= 20 },
  { id: 'submaster',   nameZh: '减法森林',   nameEn: 'Sub Forest',
    descZh: '减法关通 20',  descEn: 'Clear 20 sub levels',    icon: '➖',
    check: (s) => clearedInLand(s, 'sub') >= 20 },
  { id: 'mixmaster',   nameZh: '加减综合',   nameEn: 'Mix Master',
    descZh: '综合关通 20',  descEn: 'Clear 20 mix levels',    icon: '🌟',
    check: (s) => clearedInLand(s, 'mix') >= 20 },
  { id: 'timesnova',   nameZh: '乘法新星',   nameEn: 'Times Nova',
    descZh: '通过乘法第一关', descEn: 'Unlock Times Planet',    icon: '✖',
    check: (s) => clearedInLand(s, 'mul') >= 1 },
  { id: 'sharestar',   nameZh: '分享之星',   nameEn: 'Sharing Star',
    descZh: '通过分享岛第一关', descEn: 'Unlock Sharing Isle',  icon: '💖',
    check: (s) => clearedInLand(s, 'div') >= 1 },

  { id: 'tier20',      nameZh: '20 俱乐部',  nameEn: '20 Club',
    descZh: '挑战 20 以内一关', descEn: 'Clear a Within-20 level',  icon: '🌈',
    check: (s) => hasClearedTier(s, 20) },
  { id: 'tier50',      nameZh: '50 俱乐部',  nameEn: '50 Club',
    descZh: '挑战 50 以内一关', descEn: 'Clear a Within-50 level',  icon: '🚀',
    check: (s) => hasClearedTier(s, 50) },
  { id: 'tier80',      nameZh: '80 俱乐部',  nameEn: '80 Club',
    descZh: '挑战 80 以内一关', descEn: 'Clear a Within-80 level',  icon: '🦄',
    check: (s) => hasClearedTier(s, 80) },
  { id: 'tier100',     nameZh: '100 俱乐部', nameEn: '100 Club',
    descZh: '挑战 100 以内一关', descEn: 'Clear a Within-100 level', icon: '💎',
    check: (s) => hasClearedTier(s, 100) },

  { id: 'perfect',     nameZh: '满分小神童', nameEn: 'Perfect Score',
    descZh: '一关全部答对',   descEn: 'Get a perfect level',    icon: '🏆',
    check: (s) => s.perfects.size >= 1 },
  { id: 'perfect10',   nameZh: '10 次满分',  nameEn: '10 Perfects',
    descZh: '满分通关 10 次', descEn: 'Clear 10 levels perfect',icon: '🌠',
    check: (s) => s.perfects.size >= 10 },
  { id: 'streak3',     nameZh: '甜蜜三连击', nameEn: 'Sweet Streak',
    descZh: '连续答对 3 题', descEn: 'Get 3 right in a row',   icon: '🔥',
    check: (s) => s.bestStreak >= 3 },
  { id: 'streak10',    nameZh: '十连甜美',   nameEn: 'Sugar Combo',
    descZh: '连续答对 10 题', descEn: 'Get 10 right in a row', icon: '⚡',
    check: (s) => s.bestStreak >= 10 },

  { id: 'star50',      nameZh: '50 颗星星',  nameEn: '50 Stars',
    descZh: '收集 50 颗星星', descEn: 'Collect 50 stars',       icon: '⭐',
    check: (s) => s.stars >= 50 },
  { id: 'star200',     nameZh: '星星大王',   nameEn: 'Star King',
    descZh: '收集 200 颗星星', descEn: 'Collect 200 stars',     icon: '🌟',
    check: (s) => s.stars >= 200 },
  { id: 'sweetheart',  nameZh: '甜心达人',   nameEn: 'Sweetheart',
    descZh: '玩遍三种主题',   descEn: 'Try all 3 themes',       icon: '💝',
    check: (s) => s.themesTried.size >= 3 },
];

// ─── Sound effects via Web Audio ──────────────────────────────────────────
const Sound = (() => {
  let ctx = null;
  let enabled = true;
  function ensure() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }
  function tone(freq, duration, type = 'sine', vol = 0.18, delay = 0) {
    if (!enabled) return;
    const c = ensure();
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type; o.frequency.value = freq;
    o.connect(g); g.connect(c.destination);
    const t0 = c.currentTime + delay;
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(vol, t0 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + duration);
    o.start(t0); o.stop(t0 + duration + 0.02);
  }
  return {
    setEnabled(v) { enabled = v; },
    correct() {
      tone(660, 0.12, 'triangle', 0.15, 0);
      tone(880, 0.16, 'triangle', 0.15, 0.09);
      tone(1320, 0.22, 'triangle', 0.13, 0.18);
    },
    wrong() {
      tone(280, 0.18, 'square', 0.10, 0);
      tone(200, 0.22, 'square', 0.10, 0.10);
    },
    tap() { tone(540, 0.08, 'sine', 0.10); },
    pop() {
      tone(700, 0.07, 'triangle', 0.10);
      tone(1100, 0.07, 'triangle', 0.10, 0.05);
    },
    levelUp() {
      const notes = [523, 659, 784, 1047];
      notes.forEach((n, i) => tone(n, 0.18, 'triangle', 0.15, i * 0.08));
      tone(1568, 0.4, 'triangle', 0.12, 0.4);
    },
    badge() {
      const notes = [659, 880, 1175, 1568];
      notes.forEach((n, i) => tone(n, 0.22, 'sine', 0.15, i * 0.12));
    },
    drag() { tone(420, 0.06, 'triangle', 0.08); },
  };
})();

window.__SweetMath = {
  THEMES, STRINGS, t,
  TIERS, LEVELS_PER_TIER, LANDS, ALL_LEVELS, LEVEL_COUNT,
  findLevel, levelLandId, levelTier, isLevelUnlocked, firstPlayableInLand,
  makeQuestion, BADGES, Sound, randInt, pick,
};
