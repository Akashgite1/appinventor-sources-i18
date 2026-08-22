import { Status } from "../ui/Status";
import { checks } from "../../data/constants";

export function TestingSection() {
  return (
    <section id="testing" className="doc-section">
      <h2>
        <a href="#testing">#</a> Testing evidence
      </h2>
      <p>
        Verification combined automated suites with archive-level inspection and a fresh-project
        persistence workflow.
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Scope</th>
              <th>Method</th>
              <th>Result</th>
              <th>Evidence</th>
            </tr>
          </thead>
          <tbody>
            {checks.map(([scope, method, result, evidence]) => (
              <tr key={scope}>
                <td>{scope}</td>
                <td>
                  <code>{method}</code>
                </td>
                <td>
                  <Status>{result}</Status>
                </td>
                <td>{evidence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="proof">
        <div>
          <span className="terminal-dot red" />
          <span className="terminal-dot amber" />
          <span className="terminal-dot green" />
          <strong>final verification</strong>
        </div>
        <pre>{`tests:
  [junitreport] Processing TESTS-TestSuites.xml

BUILD SUCCESSFUL
Total time: 7 minutes 0 seconds`}</pre>
      </div>
      <p className="fine-print">
        <strong>Scope note:</strong> Android was also verified through a freshly built APK and
        archive inspection. iOS coverage described here consists of buildserver integration and Swift
        unit tests; a fully signed iOS application build requires the macOS/Xcode signing
        environment.
      </p>
    </section>
  );
}
