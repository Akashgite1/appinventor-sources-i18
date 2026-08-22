import { Status } from "../ui/Status";

export function FutureWorkSection() {
  return (
    <section id="future" className="doc-section">
      <h2>
        <a href="#future">#</a> Future work
      </h2>
      <div className="future-list">
        <article>
          <Status tone="purple">Review</Status>
          <div>
            <h3>Land and restack the PR series</h3>
            <p>
              Keep branch dependencies explicit and rebase the iOS work on the finalized shared
              storage and generator changes.
            </p>
          </div>
        </article>
        <article>
          <Status tone="purple">Validation</Status>
          <div>
            <h3>Run a signed iOS end-to-end build</h3>
            <p>
              Verify asset placement, device locale switching, and Companion preview on macOS/Xcode
              infrastructure.
            </p>
          </div>
        </article>
        <article>
          <Status tone="purple">Product</Status>
          <div>
            <h3>Expand translatable surfaces</h3>
            <p>
              Continue auditing Designer properties and Blocks APIs while preserving the stable-key
              model.
            </p>
          </div>
        </article>
        <article>
          <Status tone="purple">Docs</Status>
          <div>
            <h3>Publish permanent upstream documentation</h3>
            <p>
              Move the durable architecture and contributor guidance into the project's accepted
              documentation structure.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
