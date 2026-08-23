import { navigation } from "../../data/constants";

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-heading">Documentation</div>
      <nav aria-label="Documentation navigation">
        {navigation.map((section) => (
          <div className="nav-group" key={section.group}>
            <p>{section.group}</p>
            {section.items.map((item) => (
              <a key={item.id} href={`#${item.id}`}>
                {item.label}
              </a>
            ))}
          </div>
        ))}
      </nav>
      <a
        className="sidebar-note"
        href="https://github.com/Akashgite1"
        target="_blank"
        rel="noreferrer"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <span className="avatar">AG</span>
        <div>
          <strong>Akash Gite</strong>
          <span>GSoC contributor</span>
        </div>
      </a>
    </aside>
  );
}
