import { useState } from 'react';
import '../assets/SavedCandidate.css'
import Candidate from '../interfaces/Candidate.interface';
import GitHubLogo from '../assets/github-icon.svg'

const SavedCandidates = () => {
  const [ candidates ] = useState(JSON.parse(localStorage.getItem("candidates") ?? "[]"));

  function removeCandidate(candidateName: string) {
    const candidates = JSON.parse(localStorage.getItem('candidates') ?? "[]");
    if(candidates === "[]") { return }

    candidates.forEach((candidate: Candidate, index: number) => {
      if(candidate.login === candidateName) {
        candidates.splice(index, 1);
      }
    });

    localStorage.setItem('candidates', JSON.stringify(candidates));
    window.location.reload();
  }

  return (
    <>
      <h1>Potential Candidates</h1>
      <table className="table">
        <thead>
          <tr>
            <td>Image</td>
            <td>Name</td>
            <td>Location</td>
            <td>Email</td>
            <td>Company</td>
            <td>GitHub</td>
            <td>Reject</td>
          </tr>
        </thead>
        <tbody>
      {candidates.map((candidate: Candidate, index: number) => {
        return (<tr key={index}>
          <td><img src={candidate.avatar_url ?? ""} className="tableAvatar"></img></td>
          <td>{candidate.name} ({candidate.login})</td>
          <td>{candidate.location}</td>
          <td><a href={"mailto:" + (candidate.email ?? "")}>{candidate.email}</a></td>
          <td>{candidate.company}</td>
          <td><a href={candidate.html_url ?? ""}><img src={GitHubLogo} className="gitHubLogo" /></a></td>
          <td><button onClick={() => { removeCandidate(candidate.login ?? "") } }>-</button></td>
        </tr>)
      })}
        </tbody>
      </table>
    </>
  );
};

export default SavedCandidates;
