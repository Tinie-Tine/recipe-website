import styled from 'styled-components';
import {useState} from 'react';
import {FaSearch} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';



function Search() {

    const [input, setInput] = useState("");
    const navigate = useNavigate();


    const  submitHandler = (e) => {
        e.preventDefault();
        navigate('/searched/' +input)


    };

    return (
        
      <FormStyle onSubmit={submitHandler}>
        <div>
          <FaSearch />
          <input onChange={(e) => setInput(e.target.value)} type='text' 
          value={input}
           />
        </div>
      </FormStyle>
    );
  }
  
  const FormStyle = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0rem 20rem;
  
    div {
      width: 150%;
      position: relative;
      display: flex;
      align-items: center;
    }
  
    input {
      border: none;
      background: linear-gradient(35deg, #673C33, #B2AB2B);
      font-size: 1.5rem;
      color: white;
      padding: 1rem 3rem;
      border-radius: 1rem;
      outline: none;
      width: 100%;
    }
  
    svg {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(100%, -50%);
      color: white;
    }
  `;
  
  export default Search;