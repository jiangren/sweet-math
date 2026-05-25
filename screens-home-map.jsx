// ─── Home screen ──────────────────────────────────────────────────────────
function HomeScreen({ lang, theme, setTheme, onStart, onBadges, hasProgress, progress, playerName, onSetName }) {
  const S = window.__SweetMath.STRINGS;
  const T = window.__SweetMath.THEMES;
  const tx = window.__SweetMath.t;
  const themeData = T[theme];

  const [editingName, setEditingName] = React.useState(false);
  const [draft, setDraft] = React.useState(playerName || '');
  const inputRef = React.useRef(null);
  React.useEffect(() => { setDraft(playerName || ''); }, [playerName]);
  React.useEffect(() => {
    if (editingName && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingName]);

  const commit = () => {
    const v = (draft || '').trim().slice(0, 16);
    onSetName(v);
    setEditingName(false);
    window.__SweetMath.Sound.pop();
  };
  const cancel = () => { setDraft(playerName || ''); setEditingName(false); };

  return (
    <div className="home-wrap">
      <span className="float-deco" style={{ top: '8%', left: '6%', transform: 'rotate(-12deg)' }}>{themeData.tokens[0]}</span>
      <span className="float-deco" style={{ top: '20%', right: '8%', transform: 'rotate(14deg)', fontSize: 72 }}>{themeData.tokens[1] || themeData.icon}</span>
      <span className="float-deco" style={{ bottom: '12%', left: '12%', transform: 'rotate(-8deg)' }}>{themeData.tokens[2] || themeData.icon}</span>
      <span className="float-deco" style={{ bottom: '6%', right: '14%', transform: 'rotate(18deg)', fontSize: 64 }}>{themeData.tokens[3] || themeData.icon}</span>

      <h1 className="home-hero">
        {lang === 'zh' ? <>甜甜<span className="home-hero-em">数学</span>乐园</>
                       : <>Sweet <span className="home-hero-em">Math</span> Land</>}
      </h1>
      <p className="home-sub">{tx(S.appTagline, lang)} · {tx(S.ageHint, lang)}</p>

      {/* Greeting / name editor */}
      <div className="hello-row">
        {editingName ? (
          <div className="hello-edit">
            <input ref={inputRef}
                   className="hello-input"
                   value={draft}
                   maxLength={16}
                   placeholder={tx(S.playerNamePh, lang)}
                   onChange={(e) => setDraft(e.target.value)}
                   onKeyDown={(e) => {
                     if (e.key === 'Enter') commit();
                     if (e.key === 'Escape') cancel();
                   }} />
            <button className="hello-btn primary" onClick={commit}>
              {tx(S.saveName, lang)}
            </button>
            <button className="hello-btn" onClick={cancel}>
              {tx(S.cancel, lang)}
            </button>
          </div>
        ) : playerName ? (
          <div className="hello-greet">
            <span className="hello-wave">👋</span>
            <span className="hello-text">
              {tx(hasProgress ? S.welcomeBack : S.hi, lang)}
              <b className="hello-name">{playerName}</b>
              <span>{lang === 'zh' ? '！' : '!'}</span>
            </span>
            <button className="hello-pencil"
                    title={tx(S.changeName, lang)}
                    onClick={() => { setEditingName(true); window.__SweetMath.Sound.tap(); }}>
              ✏️
            </button>
          </div>
        ) : (
          <button className="hello-setname"
                  onClick={() => { setEditingName(true); window.__SweetMath.Sound.tap(); }}>
            ✏️ {tx(S.setName, lang)}
          </button>
        )}
      </div>

      <div className="theme-picker">
        {Object.values(T).map(th => (
          <div key={th.key}
               className={`theme-card ${theme === th.key ? 'active' : ''}`}
               onClick={() => { setTheme(th.key); window.__SweetMath.Sound.pop(); }}>
            <div className="icon">{th.icon}</div>
            <div className="label">{lang === 'zh' ? th.nameZh : th.nameEn}</div>
            <div className="desc">{lang === 'zh' ? th.descZh : th.descEn}</div>
          </div>
        ))}
      </div>

      <div className="home-cta-row">
        <button className="bigbtn" onClick={() => { window.__SweetMath.Sound.pop(); onStart(); }}>
          <span className="icon">▶</span>
          {hasProgress ? tx(S.continue, lang) : tx(S.start, lang)}
        </button>
        <button className="bigbtn ghost" onClick={() => { window.__SweetMath.Sound.tap(); onBadges(); }}>
          <span className="icon">🏅</span>
          {tx(S.badges, lang)}
          <span style={{
            background: 'var(--primary)', color: '#fff', borderRadius: 999,
            fontSize: 14, padding: '2px 10px', fontWeight: 700,
          }}>{progress.badges.size}</span>
        </button>
      </div>

      <div className="parent-row">
        <span>⭐ {progress.stars}</span>
        <span>🏆 {progress.cleared.size} / {window.__SweetMath.LEVEL_COUNT}</span>
        <span>🏅 {progress.badges.size} / {window.__SweetMath.BADGES.length}</span>
      </div>
    </div>
  );
}

// ─── Level map screen ─────────────────────────────────────────────────────
function LevelMap({ lang, theme, progress, onPickLevel, lastTier, setLastTier }) {
  const S = window.__SweetMath.STRINGS;
  const tx = window.__SweetMath.t;
  const T = window.__SweetMath.THEMES;
  const themeData = T[theme];
  const LANDS = window.__SweetMath.LANDS;
  const TIERS = window.__SweetMath.TIERS;
  const isLevelUnlocked = window.__SweetMath.isLevelUnlocked;
  const firstPlayableInLand = window.__SweetMath.firstPlayableInLand;

  // For each land, what tier should be active by default?
  // Use the per-land lastTier override, or fall back to the tier of the
  // first playable level in that land.
  const [activeTiers, setActiveTiers] = React.useState(() => {
    const init = {};
    LANDS.forEach(land => {
      if (lastTier && lastTier[land.id]) {
        init[land.id] = lastTier[land.id];
      } else {
        const lvl = firstPlayableInLand(land.id, progress);
        init[land.id] = lvl ? lvl.tier : 10;
      }
    });
    return init;
  });

  const setLandTier = (landId, tier) => {
    setActiveTiers(prev => ({ ...prev, [landId]: tier }));
    setLastTier?.({ ...activeTiers, [landId]: tier });
  };

  return (
    <div className="map-wrap">
      <h2 className="map-title">
        <span>🗺️</span>
        {lang === 'zh' ? '甜蜜冒险地图' : 'Sweet Adventure Map'}
        <span style={{ marginLeft: 'auto', fontSize: 14, fontWeight: 600,
                       color: 'var(--ink-soft)' }}>
          {tx(S.tierTipFirst, lang)}
        </span>
      </h2>

      <div className="map-scroll">
        {LANDS.map((land, landIdx) => {
          const landColor = `var(--land-${land.colorIdx})`;
          const totalInLand = land.levels.length;
          const clearedInLand = land.levels.filter(l => progress.cleared.has(l.id)).length;
          const activeTier = activeTiers[land.id] || 10;
          const activeTierData = land.tiers.find(t => t.tier.id === activeTier);

          return (
            <div key={land.id} className="land" style={{ '--land-color': landColor }}>
              <div className="land-head">
                <div className="land-badge">{themeData.landIcons[landIdx] || themeData.icon}</div>
                <div className="land-head-text">
                  <h3 className="land-name">{tx(S[land.nameKey], lang)}</h3>
                  <p className="land-desc">{tx(S[land.descKey], lang)}</p>
                </div>
                <div className="land-progress">
                  <b>{clearedInLand}</b> / {totalInLand}
                </div>
              </div>

              {/* Tier tabs */}
              <div className="tier-tabs">
                {land.tiers.map(({ tier, levels }) => {
                  const someUnlocked = isLevelUnlocked(levels[0], progress);
                  const tierCleared = levels.filter(l => progress.cleared.has(l.id)).length;
                  const isActive = activeTier === tier.id;
                  return (
                    <button key={tier.id}
                            className={`tier-tab ${isActive ? 'active' : ''} ${someUnlocked ? '' : 'locked'}`}
                            disabled={!someUnlocked}
                            onClick={() => { window.__SweetMath.Sound.tap(); setLandTier(land.id, tier.id); }}>
                      <div className="tier-tab-name">{tx(S[tier.key], lang)}</div>
                      <div className="tier-tab-prog">
                        {someUnlocked
                          ? <><b>{tierCleared}</b>/{levels.length}</>
                          : <span>🔒</span>}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Levels grid */}
              <div className="levels-row">
                {activeTierData.levels.map((lvl) => {
                  const isCleared = progress.cleared.has(lvl.id);
                  const unlocked = isLevelUnlocked(lvl, progress);
                  const stars = progress.starsByLevel[lvl.id] || 0;
                  // Current: first unlocked uncleared in this tier
                  const isCurrent = unlocked && !isCleared &&
                    activeTierData.levels.findIndex(l =>
                      isLevelUnlocked(l, progress) && !progress.cleared.has(l.id)
                    ) === activeTierData.levels.indexOf(lvl);
                  return (
                    <button key={lvl.id}
                            className={`level-node ${unlocked ? '' : 'locked'} ${isCurrent ? 'current' : ''} ${isCleared ? 'cleared' : ''}`}
                            disabled={!unlocked}
                            onClick={() => { window.__SweetMath.Sound.pop(); onPickLevel(lvl); }}>
                      <div className="level-num">{lvl.index}</div>
                      <div className="level-icon" style={{
                        background: isCleared ? landColor : null,
                        color: isCleared ? '#fff' : null
                      }}>
                        <span>{themeData.landIcons[landIdx]}</span>
                      </div>
                      <div className="level-stars">
                        {[1,2,3].map(i =>
                          <span key={i} className={stars >= i ? '' : 'empty'}>★</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

Object.assign(window, { HomeScreen, LevelMap });
