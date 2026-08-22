export function ContributorGuideSection() {
  return (
    <section id="contributors" className="doc-section">
      <h2>
        <a href="#contributors">#</a> Contributor guide
      </h2>
      <h3>Before changing the translation format</h3>
      <ul>
        <li>Preserve backward compatibility for projects with no translation file.</li>
        <li>Keep editor source data separate from generated application assets.</li>
        <li>
          Update the shared generator and both runtime loaders when the asset contract changes.
        </li>
        <li>Add positive and malformed-input coverage for new language-tag or schema forms.</li>
      </ul>
      <h3>Recommended verification</h3>
      <div className="code-block">
        <div>
          <span>Shell</span>
        </div>
        <pre>
          <code>{`git diff --check
ant tests
ant -f buildserver/build.xml tests

# Export a fresh AIA and confirm:
unzip -l test_app.aia | grep translations.json

# Inspect a compiled APK and confirm only generated assets:
unzip -l test_app.apk | grep 'assets/i18n/'`}</code>
        </pre>
      </div>
      <h3>Key invariants</h3>
      <div className="invariant-grid">
        <div>
          <strong>One source file</strong>
          <span>Project-level and platform-neutral</span>
        </div>
        <div>
          <strong>Stable keys</strong>
          <span>Renames must not lose translations</span>
        </div>
        <div>
          <strong>Versioned manifest</strong>
          <span>Runtime contract changes are explicit</span>
        </div>
        <div>
          <strong>Graceful fallback</strong>
          <span>Missing translations never block startup</span>
        </div>
      </div>
    </section>
  );
}
