// ─── Sync Modal ──────────────────────────────────────────────────────────
// Manual cross-device sync: export progress as a copy-paste code,
// or paste a code from another device to import.

function SyncModal({ lang, mode, code, onImport, onClose }) {
  const S = window.__SweetMath.STRINGS;
  const tx = window.__SweetMath.t;

  const [copied, setCopied] = React.useState(false);
  const [pasteVal, setPasteVal] = React.useState('');
  const [importMsg, setImportMsg] = React.useState(null);  // 'ok' | 'bad' | null
  const taRef = React.useRef(null);

  // Select all on open for easy copy
  React.useEffect(() => {
    if (mode === 'export' && taRef.current) {
      taRef.current.focus();
      taRef.current.select();
    }
  }, [mode]);

  const doCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(code);
      } else {
        taRef.current.select();
        document.execCommand('copy');
      }
      setCopied(true);
      window.__SweetMath.Sound.pop();
      setTimeout(() => setCopied(false), 1600);
    } catch (e) {
      try {
        taRef.current.select();
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      } catch (_) {}
    }
  };

  const doImport = () => {
    if (!pasteVal.trim()) return;
    if (!confirm(tx(S.importConfirm, lang))) return;
    const ok = onImport(pasteVal);
    if (ok) {
      window.__SweetMath.Sound.levelUp();
      setImportMsg('ok');
      setTimeout(() => { onClose(); }, 1300);
    } else {
      window.__SweetMath.Sound.wrong();
      setImportMsg('bad');
    }
  };

  const isExport = mode === 'export';

  return (
    <div className="sync-overlay" onClick={onClose}>
      <div className="sync-modal" onClick={(e) => e.stopPropagation()}>
        <button className="sync-close" onClick={onClose} aria-label="close">✕</button>

        <h3 className="sync-title">
          {isExport ? tx(S.exportTitle, lang) : tx(S.importTitle, lang)}
        </h3>
        <p className="sync-hint">
          {isExport ? tx(S.exportHint, lang) : tx(S.importHint, lang)}
        </p>

        {isExport ? (
          <>
            <textarea ref={taRef}
                      className="sync-textarea"
                      readOnly
                      value={code}
                      onClick={(e) => e.currentTarget.select()} />
            <div className="sync-row">
              <button className={`sync-btn primary ${copied ? 'ok' : ''}`} onClick={doCopy}>
                {copied ? tx(S.copied, lang) : tx(S.copyCode, lang)}
              </button>
              <button className="sync-btn" onClick={onClose}>
                {tx(S.close, lang)}
              </button>
            </div>
            <div className="sync-steps">
              <div><b>1.</b> {lang === 'zh' ? '在本设备点"复制密码"' : 'Copy the code here'}</div>
              <div><b>2.</b> {lang === 'zh' ? '在另一设备打开本网站 → "导入进度"' : 'On the other device, open this site → "Import progress"'}</div>
              <div><b>3.</b> {lang === 'zh' ? '粘贴 → 点"导入"' : 'Paste → click "Import"'}</div>
            </div>
          </>
        ) : (
          <>
            <textarea ref={taRef}
                      className="sync-textarea"
                      placeholder={tx(S.pasteHere, lang)}
                      value={pasteVal}
                      onChange={(e) => { setPasteVal(e.target.value); setImportMsg(null); }} />
            {importMsg === 'ok' && (
              <div className="sync-msg ok">{tx(S.importOk, lang)}</div>
            )}
            {importMsg === 'bad' && (
              <div className="sync-msg bad">{tx(S.importBad, lang)}</div>
            )}
            <div className="sync-row">
              <button className="sync-btn primary"
                      disabled={!pasteVal.trim()}
                      onClick={doImport}>
                {tx(S.doImport, lang)}
              </button>
              <button className="sync-btn" onClick={onClose}>
                {tx(S.close, lang)}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { SyncModal });
