import { Status, type StatusTone } from "../ui/Status";

interface FutureWorkItem {
  id: string;
  title: string;
  status: string;
  tone: StatusTone;
  paragraphs: string[];
}

const futureWorkItems: FutureWorkItem[] = [
  {
    id: "ios-implementation",
    title: "Finalize the iOS implementation",
    status: "Ongoing",
    tone: "blue",
    paragraphs: [
      "Address review feedback on the iOS runtime PR, keep it aligned with the finalized project-storage and asset-generation changes, and complete end-to-end validation on macOS/Xcode infrastructure.",
    ],
  },
  {
    id: "editor-ui-refinements",
    title: "Continue Translation editor UI refinements",
    status: "Review-driven",
    tone: "purple",
    paragraphs: [
      "Refine the Translation editor when additional usability or layout issues are identified during review. Any changes should preserve the same workflow in both the Neo and Classic App Inventor interfaces.",
    ],
  },
  {
    id: "test-coverage",
    title: "Expand TranslationPanel test coverage",
    status: "Planned",
    tone: "teal",
    paragraphs: [
      "Add focused tests for first-time language setup, static and dynamic translations, autosave behavior, Designer synchronization, component renames and deletions, search, pagination, and malformed saved data.",
    ],
  },
  {
    id: "upstream-docs",
    title: "Add permanent App Inventor documentation",
    status: "Planned",
    tone: "teal",
    paragraphs: [
      "Move the finalized architecture, project format, build pipeline, runtime behavior, testing guidance, and contributor instructions into App Inventor’s upstream documentation structure for future users and contributors.",
    ],
  },
  {
    id: "feature-tours",
    title: "Explore platform-wide guided feature tours",
    status: "Discussion",
    tone: "gray",
    paragraphs: [
      "A guided tour was initially proposed to introduce users to the new Translation editor as part of the GSoC project. During discussion, Evan suggested designing it as an independent, reusable App Inventor feature that could introduce any newly added platform capability.",
      "Its scope, user experience, and implementation approach are still under discussion and are not part of the completed i18n deliverables.",
    ],
  },
];

export function FutureWorkSection() {
  return (
    <section id="future" className="doc-section">
      <h2>
        <a href="#future">#</a> Future work
      </h2>
      <p>
        The following items represent ongoing review work, planned quality improvements, and ideas
        that remain under discussion.
      </p>

      <div className="future-list">
        {futureWorkItems.map((item) => (
          <article key={item.id} className="future-card">
            <div className="future-card-header">
              <h3 className="future-card-title">{item.title}</h3>
              <Status tone={item.tone}>{item.status}</Status>
            </div>
            <div className="future-card-body">
              {item.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
