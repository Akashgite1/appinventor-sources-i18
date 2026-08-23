import { Status } from "../ui/Status";
import { verificationChecks } from "../../data/constants";

export function TestingSection() {
  return (
    <section id="verification" className="doc-section">
      <div id="testing" style={{ display: "none" }} aria-hidden="true" />
      <h2>
        <a href="#verification">#</a> Verification
      </h2>
      <p>
        The implementation was verified through automated tests and inspection of exported project
        and application artifacts.
      </p>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th style={{ width: "30%" }}>Area</th>
              <th style={{ width: "55%" }}>Verification</th>
              <th style={{ width: "15%" }}>Result</th>
            </tr>
          </thead>
          <tbody>
            {verificationChecks.map((item) => (
              <tr key={item.area}>
                <td>
                  <strong>{item.area}</strong>
                </td>
                <td>
                  {item.isCode ? <code>{item.verification}</code> : item.verification}
                </td>
                <td>
                  <Status tone={item.tone || "green"}>{item.result}</Status>
                </td>
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
        Android packaging was tested using a generated APK. iOS verification covers the implemented
        buildserver and Swift units; a complete signed iOS application build requires the macOS/Xcode
        build environment.
      </p>
    </section>
  );
}
