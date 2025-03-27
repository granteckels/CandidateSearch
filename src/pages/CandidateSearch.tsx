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
    if(data.length === 0) { return; }

    getNextCandidate();
  }, [data]);

  function getNextCandidate() {
    searchGithubUser(data[dataIndex]).then((res) => {
      // Check if res is empty
      if(JSON.stringify(res) === '{}') { return }

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
      <p>data.length: {data.length}</p>
      <p>dataIndex: {dataIndex}</p>
      <ul>
        {Object.entries(candidate).map((attr) => <li key={attr[0]}>{attr[0]}: {attr[1]}</li>)}
        <div id="buttons">
          <button id="minus" onClick={getNextCandidate}>-</button>
          <button id="plus" onClick={addCandidate}>+</button>
        </div>
      </ul>
    </>
  );
};

export default CandidateSearch;
