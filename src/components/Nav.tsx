import { Link } from 'react-router-dom'

interface NavProps {
  location: string;
}

const Nav = ({ location }: NavProps) => {
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
