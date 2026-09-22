import LogInCard from "../features/auth/LogInCard";
import ".././styles/landing-page.css";
import { Link } from "react-router";

export default function LandingPage() {
  return (
    <>
      <header>
        <h1>Token Analysis Masterclass</h1>
        <p>
          A repeatable diagnostic framework for evaluating any blockchain token
          (network, protocol, or application) across three layers of analysis.
        </p>
        <button>
          <Link style={{ all: "unset" }} to="/register">
            Enroll Now
          </Link>
        </button>
      </header>

      <main>
        <section id="description">
          <h2>Course Description</h2>
          <p>
            Students learn to read code, block explorers, smart contracts, and
            governance proposals the way an equity analyst reads filings, and to
            convert that reading into a defensible investment judgment.
          </p>
        </section>
        <LogInCard />
        <section id="framework">
          <h2>The Three Layers</h2>
          <table>
            <thead>
              <tr>
                <th>Layer</th>
                <th>Driving Question</th>
                <th>What It Answers</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Utility</strong>
                </td>
                <td>
                  What does this network or protocol provide that I can't find
                  anywhere else?
                </td>
                <td>Does the thing work, and does anyone need it?</td>
              </tr>
              <tr>
                <td>
                  <strong>Token</strong>
                </td>
                <td>
                  Given utility and usage rates increase, will the token also
                  increase in price?
                </td>
                <td>Does growth reach the asset?</td>
              </tr>
              <tr>
                <td>
                  <strong>Human</strong>
                </td>
                <td>
                  Who has influence over this project and how much do they have?
                </td>
                <td>Who can change the answers to 1 and 2?</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section id="principles">
          <h2>Core Operating Principles</h2>
          <ul>
            <li>
              <strong>Intentional Sequence:</strong> “Utility” grabs attention
              fastest. “Token” requires utility to be established first. “Human”
              requires you to know what's at stake before asking who controls
              it.
            </li>
            <li>
              <strong>Dynamic Layer Weighting:</strong> Weakness in one layer
              means a higher weight placed on the others. Specifically: more
              transparency means less weight on the human layer.
            </li>
            <li>
              <strong>The Master Frame:</strong> Immutable vs. mutable. Some
              things are set in stone and others are not. Every downstream
              question trickles from this one.
            </li>
            <li>
              <strong>Speculation as a Wrapper:</strong> It is not a module; it
              bleeds through every layer—speculating on HYPE's burn mechanism
              (Token), on Vitalik's brains (Human), or on replacing the
              financial system (Utility).
            </li>
            <li>
              <strong>Transparency ≠ Investability:</strong> The most
              transparent project may have no value-accrual mechanism. The least
              transparent may have the best token design. They are two separate
              gates.
            </li>
            <li>
              <strong>The Three-Beat Structure:</strong> Every layer follows a
              strict progression: Concept &rarr; Arcade application &rarr;
              Real-world case study. The arcade is the framework, but means
              nothing if students can't apply it.
            </li>
          </ul>
        </section>

        <section id="maxim">
          <blockquote>
            <p>
              "Data without narrative is noise. Narrative without data is
              speculation."
            </p>
            <cite>— Course Maxim</cite>
          </blockquote>
        </section>
      </main>

      <footer>
        <p>&copy; 2026 Token Analysis Course. All rights reserved.</p>
      </footer>
    </>
  );
}
