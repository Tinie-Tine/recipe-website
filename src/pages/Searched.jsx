import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import {Link} from 'react-router-dom';


function Searched() {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let params = useParams();

  const getSearched = async (name) => {
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const recipes = await response.json();
      setSearchedRecipes(recipes.results || []);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.search) {
      setLoading(true);
      getSearched(params.search);
    }
  }, [params.search]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Grid>
      {searchedRecipes.map((item) => (
        <Card key={item.id}>
          <Link to={'/recipe/' + item.id}>
          <img src={item.image} alt={item.title} />
          <h4>{item.title}</h4>
          </Link>
        </Card>
      ))}
    </Grid>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }

  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default Searched;
