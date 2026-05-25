// ─── Main App ─────────────────────────────────────────────────────────────
const { useState, useEffect, useCallback, useMemo } = React;

const STORAGE_KEY = 'sweetmath.progress.v1';

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const j = JSON.parse(raw);
    return {
      stars: j.stars || 0,
      cleared: new Set(j.cleared || []),
      perfects: new Set(j.perfects || []),
      starsByLevel: j.starsByLevel || {},
      bestStreak: j.bestStreak || 0,
      themesTried: new Set(j.themesTried || []),
      badges: new Set(j.badges || []),
      newBadges: new Set(j.newBadges || []),
    };
  } catch (e) { return null; }
}
function saveProgress(p) {
  const j = {
    stars: p.stars,
    cleared: Array.from(p.cleared),
    perfects: Array.from(p.perfects),
    starsByLevel: p.starsByLevel,
    bestStreak: p.bestStreak,
    themesTried: Array.from(p.themesTried),
    badges: Array.from(p.badges),
    newBadges: Array.from(p.newBadges),
  };
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(j)); } catch (e) {}
}
function freshProgress() {
  return {
    stars: 0, cleared: new Set(), perfects: new Set(),
    starsByLevel: {}, bestStreak: 0, themesTried: new Set(),
    badges: new Set(), newBadges: new Set(),
  };
}

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "icecream",
  "lang": "zh",
  "soundOn": true,
  "parentMode": false,
  "device": "auto"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [screen, setScreen] = useState('home');   // home | map | quiz | badges
  const [currentLevel, setCurrentLevel] = useState(null);
  const [progress, setProgress] = useState(() => loadProgress() || freshProgress());

  // Persist on change
  useEffect(() => { saveProgress(progress); }, [progress]);
  // Sync sound preference
  useEffect(() => { window.__SweetMath.Sound.setEnabled(!!t.soundOn); }, [t.soundOn]);

  // Track themes tried
  useEffect(() => {
    if (!progress.themesTried.has(t.theme)) {
      setProgress(p => ({ ...p, themesTried: new Set([...p.themesTried, t.theme]) }));
    }
  }, [t.theme]);

  // Apply theme attr to body
  useEffect(() => {
    document.body.setAttribute('data-theme', t.theme);
  }, [t.theme]);

  // Apply device simulator attr to body
  useEffect(() => {
    if (t.device && t.device !== 'auto') {
      document.body.setAttribute('data-device', t.device);
    } else {
      document.body.removeAttribute('data-device');
    }
    return () => document.body.removeAttribute('data-device');
  }, [t.device]);

  // Check badges after every progress change
  useEffect(() => {
    const BADGES = window.__SweetMath.BADGES;
    const newlyEarned = [];
    BADGES.forEach(b => {
      if (!progress.badges.has(b.id) && b.check(progress)) {
        newlyEarned.push(b.id);
      }
    });
    if (newlyEarned.length) {
      window.__SweetMath.Sound.badge();
      setProgress(p => ({
        ...p,
        badges: new Set([...p.badges, ...newlyEarned]),
        newBadges: new Set([...p.newBadges, ...newlyEarned]),
      }));
    }
  }, [progress.cleared, progress.stars, progress.bestStreak, progress.perfects, progress.themesTried]);

  const onComplete = useCallback((result) => {
    setProgress(prev => {
      const next = { ...prev };
      const prevStars = prev.starsByLevel[result.levelId] || 0;
      const gainedStars = Math.max(0, result.stars - prevStars);
      next.stars = prev.stars + gainedStars;
      next.cleared = new Set([...prev.cleared, result.levelId]);
      next.starsByLevel = { ...prev.starsByLevel, [result.levelId]: Math.max(prevStars, result.stars) };
      if (result.perfect) next.perfects = new Set([...prev.perfects, result.levelId]);
      next.bestStreak = Math.max(prev.bestStreak, result.bestStreak || 0);
      return next;
    });
    setScreen('map');
    setCurrentLevel(null);
  }, []);

  const onStartFromHome = useCallback(() => {
    setScreen('map');
  }, []);

  const onPickLevel = useCallback((lvl) => {
    setCurrentLevel(lvl);
    setScreen('quiz');
  }, []);

  const onResetProgress = () => {
    if (confirm(t.lang === 'zh' ? '确定要清空学习进度吗？' : 'Clear all progress?')) {
      const p = freshProgress();
      setProgress(p);
      saveProgress(p);
    }
  };

  // Clear new-badge markers when entering badges screen
  useEffect(() => {
    if (screen === 'badges' && progress.newBadges.size) {
      const timer = setTimeout(() => {
        setProgress(p => ({ ...p, newBadges: new Set() }));
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  const S = window.__SweetMath.STRINGS;
  const tx = window.__SweetMath.t;
  const hasProgress = progress.cleared.size > 0;

  return (
    <>
      <div className="app-bg" />

      {/* Topbar */}
      <div className="topbar">
        <div className="topbar-left">
          {screen !== 'home' && (
            <button className="chip" onClick={() => { window.__SweetMath.Sound.tap(); setScreen('home'); }}>
              <span className="chip-icon">🏠</span>
              {tx(S.backHome, t.lang)}
            </button>
          )}
          {screen === 'home' && (
            <div className="brand">
              <div className="brand-mark">{window.__SweetMath.THEMES[t.theme].icon}</div>
              <span>{tx(S.appName, t.lang)}</span>
            </div>
          )}
        </div>

        <div className="topbar-right">
          {(screen === 'map' || screen === 'badges') && (
            <div className="chip">
              <span className="chip-icon chip-star">★</span>
              {progress.stars}
            </div>
          )}
          {screen === 'map' && (
            <button className="chip" onClick={() => { window.__SweetMath.Sound.tap(); setScreen('badges'); }}>
              <span className="chip-icon">🏅</span>
              {progress.badges.size}
            </button>
          )}
          <button className="chip" onClick={() => {
            setTweak('lang', t.lang === 'zh' ? 'en' : 'zh');
            window.__SweetMath.Sound.tap();
          }}>
            🌐 {t.lang === 'zh' ? '中 / EN' : 'EN / 中'}
          </button>
          <button className="chip" onClick={() => {
            setTweak('soundOn', !t.soundOn);
            if (!t.soundOn) window.__SweetMath.Sound.pop();
          }}>
            {t.soundOn ? '🔔' : '🔕'}
          </button>
        </div>
      </div>

      <div className="canvas">
        {screen === 'home' && (
          <HomeScreen lang={t.lang} theme={t.theme}
                      setTheme={(th) => setTweak('theme', th)}
                      onStart={onStartFromHome}
                      onBadges={() => setScreen('badges')}
                      hasProgress={hasProgress}
                      progress={progress} />
        )}
        {screen === 'map' && (
          <LevelMap lang={t.lang} theme={t.theme}
                    progress={progress}
                    onPickLevel={onPickLevel}
                    onHome={() => setScreen('home')} />
        )}
        {screen === 'quiz' && currentLevel && (
          <QuizScreen lang={t.lang} theme={t.theme} level={currentLevel}
                      onExit={() => { setScreen('map'); setCurrentLevel(null); }}
                      onComplete={onComplete} />
        )}
        {screen === 'badges' && (
          <BadgesScreen lang={t.lang} theme={t.theme} progress={progress}
                        onHome={() => setScreen('home')} />
        )}
      </div>

      {/* Tweaks panel */}
      <TweaksPanel title={t.lang === 'zh' ? '设置 Tweaks' : 'Tweaks'}>
        <TweakSection label={tx(S.themeLabel, t.lang)}>
          <TweakRadio label={tx(S.themeLabel, t.lang)}
                      value={t.theme}
                      options={[
                        { value: 'icecream', label: '🍦' },
                        { value: 'lollipop', label: '🍭' },
                        { value: 'donut',    label: '🍩' },
                      ]}
                      onChange={(v) => setTweak('theme', v)} />
        </TweakSection>
        <TweakSection label={tx(S.langLabel, t.lang)}>
          <TweakRadio label={tx(S.langLabel, t.lang)}
                      value={t.lang}
                      options={[
                        { value: 'zh', label: '中文' },
                        { value: 'en', label: 'EN' },
                      ]}
                      onChange={(v) => setTweak('lang', v)} />
        </TweakSection>
        <TweakSection label={tx(S.soundLabel, t.lang)}>
          <TweakToggle label={t.lang === 'zh' ? '音效开关' : 'Sound effects'}
                       value={t.soundOn}
                       onChange={(v) => setTweak('soundOn', v)} />
        </TweakSection>
        <TweakSection label={t.lang === 'zh' ? '模拟设备' : 'Simulate device'}>
          <TweakRadio label={t.lang === 'zh' ? '设备预览' : 'Device preview'}
                      value={t.device || 'auto'}
                      options={[
                        { value: 'auto',   label: t.lang === 'zh' ? '自适应' : 'Auto' },
                        { value: 'iphone', label: 'iPhone' },
                        { value: 'pc',     label: t.lang === 'zh' ? '电脑' : 'PC' },
                      ]}
                      onChange={(v) => setTweak('device', v)} />
        </TweakSection>
        <TweakSection label={t.lang === 'zh' ? '家长' : 'Parent'}>
          <TweakToggle label={tx(S.parentMode, t.lang)}
                       value={t.parentMode}
                       onChange={(v) => setTweak('parentMode', v)} />
          <TweakButton label={t.lang === 'zh' ? '🗑️ 清空进度' : '🗑️ Reset progress'}
                       secondary
                       onClick={onResetProgress} />
        </TweakSection>
      </TweaksPanel>

      {/* Parent mode panel */}
      {t.parentMode && (
        <div style={{
          position: 'fixed', top: 86, right: 20, zIndex: 2147483645,
          background: 'var(--surface)', borderRadius: 20, padding: 18,
          boxShadow: 'var(--shadow)', width: 260, fontWeight: 600,
          fontSize: 13, color: 'var(--ink)',
        }}>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 10,
                        color: 'var(--primary-deep)' }}>
            👨‍👧 {tx(S.parentTip1, t.lang)}
          </div>
          <div style={{ marginBottom: 12, color: 'var(--ink-soft)' }}>
            {tx(S.parentTipBody, t.lang)}
          </div>
          <div style={{ display: 'grid', gap: 6 }}>
            <div>⭐ {tx(S.totalStars, t.lang)}: <b>{progress.stars}</b></div>
            <div>🏆 {tx(S.levelsClear, t.lang)}: <b>{progress.cleared.size}/{window.__SweetMath.LEVEL_COUNT}</b></div>
            <div>🏅 {tx(S.badgesEarned, t.lang)}: <b>{progress.badges.size}/{window.__SweetMath.BADGES.length}</b></div>
            <div>🔥 Best streak: <b>{progress.bestStreak}</b></div>
          </div>
        </div>
      )}
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
