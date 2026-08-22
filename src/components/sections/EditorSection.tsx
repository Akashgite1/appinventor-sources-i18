import { Icon } from "../ui/Icon";

export function EditorSection() {
  return (
    <section id="editor" className="doc-section">
      <h2>
        <a href="#editor">#</a> Translation editor
      </h2>
      <p>
        The translation workspace is a project-level editor. It stays synchronized with Designer
        changes and makes persistence feel native to the rest of App Inventor.
      </p>
      <ul className="check-list">
        <li>
          <Icon name="check" />
          <span>
            <strong>Autosave:</strong> marks the translation file dirty through{" "}
            <code>EditorManager.scheduleAutoSave(...)</code>.
          </span>
        </li>
        <li>
          <Icon name="check" />
          <span>
            <strong>Designer synchronization:</strong> refreshes discovered translatable properties
            when forms change.
          </span>
        </li>
        <li>
          <Icon name="check" />
          <span>
            <strong>Rename safety:</strong> updates source locators without discarding translation
            keys or values.
          </span>
        </li>
        <li>
          <Icon name="check" />
          <span>
            <strong>Deletion cleanup:</strong> removes entries whose components were permanently
            deleted.
          </span>
        </li>
        <li>
          <Icon name="check" />
          <span>
            <strong>Dynamic text:</strong> supports named placeholders such as{" "}
            <code>{"{name}"}</code> and language-specific reordering.
          </span>
        </li>
        <li>
          <Icon name="check" />
          <span>
            <strong>Export:</strong> keeps JSON export for inspection without a separate manual-save
            action.
          </span>
        </li>
      </ul>
    </section>
  );
}
