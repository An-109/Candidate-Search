import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import {Candidate} from '../interfaces/Candidate.interface'


const CandidateSearch = () => {

    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [currentCandidate, setCurrentCandidate]= useState({});

    const [currentIndex, setCurrentIndex] = useState(-1)

    useEffect(()=>{
      const fetchGithub = async()=>{
        const data = await searchGithub();
        const candidateArr: Candidate[] = data.map((candidate:any) => {
          return {
            id: candidate.id,
            login:candidate.login,
            email:candidate.email,
            avatar: candidate.avatar_url
          }

        }) 
        setCandidates(candidateArr);
        setCurrentIndex(0)
      }
      fetchGithub();
    },[])


    useEffect(()=>{
      const fetchUser = async()=>{
        const  data = await searchGithubUser(candidates[currentIndex]?.login);
        setCurrentCandidate(data);
        console.log(data)
      }
      fetchUser();
    },[currentIndex]);


    function minusClick () {
      setCurrentIndex(currentIndex+1)
    }

    function plusClick () {
      const savedCandidates = JSON.parse(localStorage.getItem("savedCandidates") || "[]");

      savedCandidates.push(currentCandidate);

      localStorage.setItem("savedCandidates", JSON.stringify(savedCandidates));

      setCurrentIndex(currentIndex+1)
    }

  return (
    <>
    
      <h1>CandidateSearch</h1>

      <div>
      <img src={currentCandidate.avatar_url} alt={currentCandidate.login} />
        <h2>Username: {currentCandidate.login}</h2>
        <h2>Location: {currentCandidate.location}</h2>
        <h2>Company: {currentCandidate.company}</h2>
        <h2>Bio: {currentCandidate.bio}</h2>
        <button onClick={minusClick}>Minus</button>
        <button onClick={plusClick}>Plus</button>
      </div>

    </>
  )
};

export default CandidateSearch;