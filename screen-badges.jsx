// ─── Badges screen ────────────────────────────────────────────────────────
function BadgesScreen({ lang, theme, progress, onHome }) {
  const S = window.__SweetMath.STRINGS;
  const tx = window.__SweetMath.t;
  const BADGES = window.__SweetMath.BADGES;
  const LEVEL_COUNT = window.__SweetMath.LEVEL_COUNT;

  return (
    <div className="badge-wrap">
      <div className="badge-stats">
        <div className="stat-card">
          <div className="ico">⭐</div>
          <div>
            <div className="num">{progress.stars}</div>
            <div className="lbl">{tx(S.totalStars, lang)}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="ico">🏆</div>
          <div>
            <div className="num">{progress.cleared.size} / {LEVEL_COUNT}</div>
            <div className="lbl">{tx(S.levelsClear, lang)}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="ico">🏅</div>
          <div>
            <div className="num">{progress.badges.size} / {BADGES.length}</div>
            <div className="lbl">{tx(S.badgesEarned, lang)}</div>
          </div>
        </div>
      </div>

      <div className="badge-grid">
        {BADGES.map(b => {
          const earned = progress.badges.has(b.id);
          return (
            <div key={b.id} className={`badge-card ${earned ? '' : 'locked'}`}>
              {earned && progress.newBadges.has(b.id) && (
                <div className="badge-new">NEW</div>
              )}
              <div className="badge-medal"><span>{b.icon}</span></div>
              <div className="badge-name">{lang === 'zh' ? b.nameZh : b.nameEn}</div>
              <div className="badge-desc">{lang === 'zh' ? b.descZh : b.descEn}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

Object.assign(window, { BadgesScreen });
