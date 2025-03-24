import { Link } from 'react-router-dom'

interface NavProps {
  location: string;
}

const Nav = ({ location }: NavProps) => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <nav>
      <ul className="nav">
        <li className="nav-item"><Link className={`nav-link ${location === "" ? "active" : ""}`} to="/">Search for Candidate</Link></li>
        <li className="nav-item"><Link className={`nav-link ${location === "SavedCandidates" ? "active" : ""}`} to="/SavedCandidates">Potential Candidates</Link></li>
      </ul>
    </nav>
  )
};

export default Nav;
