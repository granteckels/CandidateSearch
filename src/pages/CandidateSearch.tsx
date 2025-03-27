import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';
import '../assets/CandidateSearch.css'

interface Login {
  login: string;
}

const CandidateSearch = () => {
  const [data, setData] = useState([]);
  const [candidate, setCandidate] = useState({
    name: null,
    login: null,
    location: null,
    avatar: null,
    email: null,
    html_url: null,
    company: null,
  } as Candidate);

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

    searchGithubUser(data[0]).then((res) => {
      console.log('[data]');
      console.log("res: ", res)

      const candidate = candidateKeys.reduce((acc, key) => {
        acc[key as keyof Candidate] = res[key];
        return acc;
      }, {} as Candidate);

      console.log("candidate: ", candidate);
      console.log(Object.entries(candidate));
      setCandidate(candidate);
    });
  }, [data]);

  return (
    <>
      <h1>Candidate Search</h1>
      <ul>
        {Object.entries(candidate).map((attr) => <li key={attr[0]}>{attr[0]}: {attr[1]}</li>)}
        <div id="buttons">
          <button id="minus"><a href="">-</a></button>
          <button id="plus">+</button>
        </div>
      </ul>
    </>
  );
};

export default CandidateSearch;
