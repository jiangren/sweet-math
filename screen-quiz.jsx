// ─── Quiz screen ──────────────────────────────────────────────────────────
function QuizScreen({ lang, theme, level, onExit, onComplete }) {
  const S = window.__SweetMath.STRINGS;
  const tx = window.__SweetMath.t;
  const T = window.__SweetMath.THEMES;
  const themeData = T[theme];
  const TOTAL = 5;

  const [questions] = React.useState(() => {
    const list = [];
    for (let i = 0; i < TOTAL; i++) {
      list.push(window.__SweetMath.makeQuestion(level, i, themeData.tokens));
    }
    return list;
  });

  const [qIdx, setQIdx] = React.useState(0);
  const [correctCount, setCorrectCount] = React.useState(0);
  const [feedback, setFeedback] = React.useState(null); // 'good' | 'bad' | null
  const [chosen, setChosen] = React.useState(null);
  const [dragValue, setDragValue] = React.useState(null);
  const [placed, setPlaced] = React.useState(false);
  const [dragGhost, setDragGhost] = React.useState(null); // {x,y,val}
  const [dragOver, setDragOver] = React.useState(false);
  const [streak, setStreak] = React.useState(0);
  const [bestStreak, setBestStreak] = React.useState(0);
  const [done, setDone] = React.useState(false);
  const [confetti, setConfetti] = React.useState([]);
  const blankRef = React.useRef(null);

  const q = questions[qIdx];

  function fireConfetti() {
    const tokens = themeData.tokens;
    const pieces = Array.from({ length: 22 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      delay: Math.random() * 0.3,
      icon: tokens[i % tokens.length],
    }));
    setConfetti(pieces);
    setTimeout(() => setConfetti([]), 1800);
  }

  function recordCorrect() {
    setCorrectCount(c => c + 1);
    setStreak(s => {
      const ns = s + 1;
      setBestStreak(b => Math.max(b, ns));
      return ns;
    });
  }

  function handleAnswer(val, isDrag = false) {
    if (chosen !== null || placed) return;
    const correct = Number(val) === q.answer;
    if (isDrag) setPlaced(true); else setChosen(val);
    if (correct) {
      window.__SweetMath.Sound.correct();
      setFeedback('good');
      recordCorrect();
    } else {
      window.__SweetMath.Sound.wrong();
      setFeedback('bad');
      setStreak(0);
    }
    setTimeout(() => {
      setFeedback(null);
      if (qIdx + 1 >= TOTAL) {
        // Finished
        const finalCorrect = correctCount + (correct ? 1 : 0);
        finish(finalCorrect);
      } else {
        setQIdx(qIdx + 1);
        setChosen(null);
        setPlaced(false);
        setDragValue(null);
      }
    }, correct ? 900 : 1100);
  }

  function finish(finalCorrect) {
    setDone(true);
    window.__SweetMath.Sound.levelUp();
    fireConfetti();
    let stars = 1;
    if (finalCorrect >= 4) stars = 2;
    if (finalCorrect === TOTAL) stars = 3;
    setTimeout(() => {
      onComplete({
        levelId: String(level.id),
        stars,
        correct: finalCorrect,
        total: TOTAL,
        perfect: finalCorrect === TOTAL,
        bestStreak,
      });
    }, 2200);
  }

  // Drag handlers (pointer events)
  function onTokenPointerDown(e, val) {
    if (placed) return;
    e.preventDefault();
    setDragValue(val);
    setDragGhost({ x: e.clientX, y: e.clientY, val });
    window.__SweetMath.Sound.drag();

    const move = (ev) => {
      setDragGhost({ x: ev.clientX, y: ev.clientY, val });
      const r = blankRef.current?.getBoundingClientRect();
      if (r) {
        const over = ev.clientX >= r.left && ev.clientX <= r.right
                  && ev.clientY >= r.top  && ev.clientY <= r.bottom;
        setDragOver(over);
      }
    };
    const up = (ev) => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      const r = blankRef.current?.getBoundingClientRect();
      const inside = r && ev.clientX >= r.left && ev.clientX <= r.right
                       && ev.clientY >= r.top  && ev.clientY <= r.bottom;
      setDragGhost(null);
      setDragOver(false);
      if (inside) handleAnswer(val, true);
      else { setDragValue(null); }
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  }

  // Render functions
  function renderObjects(count, op) {
    const items = [];
    const a = q.a, b = q.b;
    if (op === '+') {
      for (let i = 0; i < a; i++) items.push(<span key={'a'+i} className="obj" style={{ animationDelay: (i*0.05)+'s' }}>{q.token}</span>);
      items.push(<span key="op" className="op">+</span>);
      for (let i = 0; i < b; i++) items.push(<span key={'b'+i} className="obj" style={{ animationDelay: ((a+i)*0.05)+'s' }}>{q.token}</span>);
    } else if (op === '-') {
      for (let i = 0; i < a; i++) {
        items.push(<span key={'a'+i} className={`obj ${i >= a - b ? 'crossed' : ''}`} style={{ animationDelay: (i*0.05)+'s' }}>{q.token}</span>);
      }
    } else if (op === '×') {
      for (let i = 0; i < a; i++) {
        const grp = [];
        for (let j = 0; j < b; j++) grp.push(<span key={j} className="obj" style={{ animationDelay: ((i*b+j)*0.04)+'s' }}>{q.token}</span>);
        items.push(<span key={'g'+i} style={{ display: 'inline-flex', padding: '6px', background: 'var(--surface-2)', borderRadius: 18, gap: 4, margin: 2 }}>{grp}</span>);
      }
    } else if (op === '÷') {
      // Show as groups: a items split into b groups
      const per = q.answer;
      for (let i = 0; i < b; i++) {
        const grp = [];
        for (let j = 0; j < per; j++) grp.push(<span key={j} className="obj" style={{ animationDelay: ((i*per+j)*0.04)+'s' }}>{q.token}</span>);
        items.push(<span key={'g'+i} style={{ display: 'inline-flex', padding: '6px', background: 'var(--surface-2)', borderRadius: 18, gap: 4, margin: 2 }}>{grp}</span>);
      }
    }
    return items;
  }

  const opChar = q.op === '+' ? '+' : q.op === '-' ? '−' : q.op === '×' ? '×' : q.op === '÷' ? '÷' : '?';

  // Build equation display
  function renderEquation(showBlank) {
    return (
      <div className="equation">
        <span>{q.a}</span>
        <span className="op">{opChar}</span>
        <span>{q.b}</span>
        <span className="op">=</span>
        {showBlank ? (
          <span ref={blankRef}
                className={`blank ${placed || chosen != null ? 'filled' : ''} ${dragOver ? 'dragover' : ''}`}>
            {placed ? dragValue : (chosen != null ? chosen : '?')}
          </span>
        ) : (
          <span>{placed ? dragValue : chosen != null ? chosen : '?'}</span>
        )}
      </div>
    );
  }

  // Complete card
  if (done) {
    const stars = correctCount === TOTAL ? 3 : correctCount >= 4 ? 2 : 1;
    return (
      <>
        <Confetti pieces={confetti} />
        <div className="complete-card">
          <div className="award">{themeData.landIcons[Math.floor((level.id - 1) / 4)] || '🏆'}</div>
          <h2>{tx(S.levelDone, lang)}</h2>
          <p>
            {lang === 'zh' ? `${correctCount} / ${TOTAL} 题答对！` : `${correctCount} / ${TOTAL} correct!`}
          </p>
          <div className="complete-stars">
            {[1,2,3].map(i => <span key={i} className={stars >= i ? '' : 'empty'}>★</span>)}
          </div>
          <div className="complete-actions">
            <button className="bigbtn ghost" onClick={onExit}>
              <span className="icon">🗺️</span>{tx(S.backMap, lang)}
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="quiz-wrap">
      <Confetti pieces={confetti} />

      <div className="quiz-head">
        <button className="chip" onClick={onExit}>← {tx(S.backMap, lang)}</button>
        <div className="qprog">
          <div className="qprog-fill" style={{ transform: `scaleX(${(qIdx + (feedback ? 1 : 0)) / TOTAL})` }} />
          <div className="qprog-dots">
            {Array.from({ length: TOTAL }).map((_, i) =>
              <span key={i} className={i < qIdx || (i === qIdx && feedback === 'good') ? 'done' : ''} />
            )}
          </div>
        </div>
        <div className="chip">
          <span className="chip-icon chip-star">★</span>
          {correctCount}
        </div>
      </div>

      <div className="question-card">
        <div className="qprompt">{tx(S[q.prompt], lang)}</div>

        {q.mode === 'count' && (
          <>
            <div className="objects-row">{renderObjects(q.answer, q.op)}</div>
            {renderEquation(false)}
          </>
        )}
        {q.mode === 'solve' && (
          <>
            {renderEquation(false)}
            {/* show small visual hint for easier levels */}
            {q.a + q.b <= 10 && q.op !== '×' && q.op !== '÷' && (
              <div className="objects-row" style={{ fontSize: 32 }}>{renderObjects(q.answer, q.op)}</div>
            )}
          </>
        )}
        {q.mode === 'drag' && (
          <>
            {renderEquation(true)}
          </>
        )}

        {q.mode === 'solve' || q.mode === 'count' ? (
          <div className="choices">
            {q.choices.map(c => (
              <button key={c} className={`choice ${chosen === c ? (c === q.answer ? 'correct' : 'wrong') : ''}`}
                      disabled={chosen !== null}
                      onClick={() => handleAnswer(c)}>
                {c}
              </button>
            ))}
          </div>
        ) : (
          <div className="drag-tray">
            {q.choices.map(c => (
              <button key={c}
                      className={`drag-token ${placed && dragValue === c ? 'placed' : ''}`}
                      onPointerDown={(e) => onTokenPointerDown(e, c)}>
                {c}
              </button>
            ))}
          </div>
        )}
      </div>

      {feedback && (
        <div className={`feedback ${feedback}`}>
          {feedback === 'good'
            ? <>🎉 {tx(S.greatJob, lang)}</>
            : <>💭 {tx(S.almost, lang)} <small style={{ fontSize: 14, opacity: 0.7 }}>({q.a} {opChar} {q.b} = {q.answer})</small></>}
        </div>
      )}

      {dragGhost && (
        <div className="drag-ghost"
             style={{ left: dragGhost.x - 30, top: dragGhost.y - 30 }}>
          {dragGhost.val}
        </div>
      )}
    </div>
  );
}

function Confetti({ pieces }) {
  if (!pieces || !pieces.length) return null;
  return (
    <div className="confetti">
      {pieces.map(p => (
        <i key={p.id} style={{
          left: p.x + 'vw',
          animationDelay: p.delay + 's',
        }}>{p.icon}</i>
      ))}
    </div>
  );
}

Object.assign(window, { QuizScreen });
