import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from "react-router-dom";

function Recipe() {
  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState('instructions');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
        const detailData = await data.json();
        setDetails(detailData);
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      }
    };

    fetchDetails();
  }, [params.name]);

  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt={details.title} />
      </div>
      <Info>
        <Buttons>
          <Button 
            className={activeTab === 'instructions' ? 'active' : ''} 
            onClick={() => setActiveTab('instructions')}
          >
            Instructions
          </Button>
          <Button 
            className={activeTab === 'ingredients' ? 'active' : ''} 
            onClick={() => setActiveTab('ingredients')}
          >
            Ingredients
          </Button>
        </Buttons>
        {activeTab === 'instructions' && (
          <div>
            <div dangerouslySetInnerHTML={{ __html: details.summary }}></div>
            <div dangerouslySetInnerHTML={{ __html: details.instructions }}></div>
          </div>
        )}
        {activeTab === 'ingredients' && (
          <ul>
            {details.extendedIngredients && details.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
}

const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
`;

const Buttons = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #134949;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;

  &.active {
    background: linear-gradient(35deg, #673C33, #B2AB2B);
    color: white;
  }
`;

const Info = styled.div`
  margin-left: 2rem;
`;

export default Recipe;
