import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';
import '../assets/CandidateSearch.css'

interface Login {
  login: string;
}

let dataIndex = 0;

const CandidateSearch = () => {
  const [data, setData] = useState([]);
  const [candidate, setCandidate] = useState({} as Candidate);

  const candidateKeys = [
    "name",
    "login",
    "location",
    "avatar_url",
    "email",
    "html_url",
    "company",
  ];

  useEffect(() => {
    searchGithub().then((candidates) => {
      setData(candidates.map(({ login }: Login) => login));
    });
  }, [])

  useEffect(() => {
    // Sometimes initial searchGithub won't return any data
    if(data.length === 0) { return; }

    getNextCandidate();
  }, [data]);

  function getNextCandidate() {
    searchGithubUser(data[dataIndex]).then((res) => {
      // Check if res is empty
      if(JSON.stringify(res) === '{}') { return }

      // Only gets attributes we want from res
      const candidate = candidateKeys.reduce((acc, key) => {
        acc[key as keyof Candidate] = res[key];
        return acc;
      }, {} as Candidate);

      setCandidate(candidate);
    });

    dataIndex++;
  }

  function addCandidate() {
    const candidates = JSON.parse(localStorage.getItem("candidates") ?? "[]")
    if(dataIndex < data.length) { candidates.push(candidate) };
    localStorage.setItem("candidates", JSON.stringify(candidates));
    getNextCandidate();
  }

  return (
    <>
      <h1>Candidate Search</h1>
      <div id="card">
        <div className="avatar">
          <img src={candidate.avatar_url!} />
        </div>
        <div className="info">
          <ul>
            <li key="name">{candidate.name} ({candidate.login})</li>
            <li key="email">Email: {candidate.email}</li>
            <li key="company">Company: {candidate.company}</li>
            <li key="location">Location: {candidate.location}</li>
            <li key="html_url">GitHub: <a href={candidate.html_url ?? ""}>{candidate.html_url ?? ""}</a></li>
          </ul>
        </div>
        <div id="buttons">
          <button id="minus" onClick={getNextCandidate}>-</button>
          <button id="plus" onClick={addCandidate}>+</button>
        </div>
      </div>
    </>
  );
};

export default CandidateSearch;
