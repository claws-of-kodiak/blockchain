import LogInCard from "../features/auth/LogInCard";
import ".././styles/landing-page.css";
import { Link } from "react-router";
import { Button } from "../shared/components/Button";
import PopUp from "../shared/components/PopUp";
import SharedList from "../shared/components/List";
import { corePrinciples } from "../features/corePrinciples.js";

export default function LandingPage() {
  return (
    <>
      <section className="hero">
        <PopUp label="Log In" component={LogInCard} id="log-in" />
        <h1>Token Analysis Masterclass</h1>
        <p>
          A repeatable diagnostic framework for evaluating any blockchain token
          (network, protocol, or application) across three layers of analysis.
        </p>

        <Link style={{ all: "unset" }} to="/register">
          <Button variant="hero">Enroll Now</Button>
        </Link>
      </section>

      <main>
        <section id="description">
          <h2>Course Description</h2>
          <p>
            Students learn to read code, block explorers, smart contracts, and
            governance proposals the way an equity analyst reads filings, and to
            convert that reading into a defensible investment judgment.
          </p>
        </section>
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
          <SharedList
            title="Core Operating Principles"
            items={corePrinciples}
            bulletStyle="none"
          />
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
