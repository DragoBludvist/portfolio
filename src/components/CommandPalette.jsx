import { useEffect, useMemo, useRef, useState } from 'react';

const MAX_QUERY = 60;

// Raycast-style command menu: ⌘K / Ctrl+K or "/" on desktop, the console
// button on phones. The query is only used to filter a fixed list of actions,
// is length-capped, and is rendered by React (escaped), so it can't inject anything.
export default function CommandPalette({ open, onClose, actions }) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const returnFocus = useRef(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((a) => `${a.label} ${a.group} ${a.keywords || ''}`.toLowerCase().includes(q));
  }, [query, actions]);

  useEffect(() => {
    if (!open) return;
    returnFocus.current = document.activeElement;
    setQuery('');
    setActive(0);
    document.body.classList.add('no-scroll');
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      cancelAnimationFrame(id);
      document.body.classList.remove('no-scroll');
      returnFocus.current?.focus?.();
    };
  }, [open]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  if (!open) return null;

  const run = (action) => {
    onClose();
    // Let the dialog close (and focus return) before the action scrolls or opens a tab.
    requestAnimationFrame(() => action.run());
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[active]) run(results[active]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'Tab') {
      e.preventDefault(); // keep focus inside the dialog
    }
  };

  let lastGroup = '';
  return (
    <div className="palette-backdrop" onMouseDown={onClose}>
      <div className="palette" role="dialog" aria-modal="true" aria-label="Command menu" onMouseDown={(e) => e.stopPropagation()}>
        <div className="palette-input">
          <span className="palette-prompt" aria-hidden="true">
            &gt;
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value.slice(0, MAX_QUERY))}
            onKeyDown={onKeyDown}
            maxLength={MAX_QUERY}
            placeholder="Search or run a command"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={results[active] ? `cmd-${results[active].id}` : undefined}
            aria-autocomplete="list"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            enterKeyHint="go"
          />
          <button type="button" className="palette-esc" onClick={onClose}>
            esc
          </button>
        </div>
        <ul id="palette-list" ref={listRef} role="listbox" aria-label="Commands" className="palette-list">
          {results.map((a, i) => {
            const header = a.group !== lastGroup ? a.group : null;
            lastGroup = a.group;
            return (
              <li key={a.id} role="presentation">
                {header && <p className="palette-group">{header}</p>}
                <div
                  id={`cmd-${a.id}`}
                  role="option"
                  aria-selected={i === active}
                  className="palette-item"
                  onMouseMove={() => setActive(i)}
                  onClick={() => run(a)}
                >
                  <span>{a.label}</span>
                  {a.hint && <kbd>{a.hint}</kbd>}
                </div>
              </li>
            );
          })}
          {results.length === 0 && <li className="palette-empty">No matching commands.</li>}
        </ul>
      </div>
    </div>
  );
}
