import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';

function Cuisine() {
    const [cuisine, setCuisine] = useState([]);
    let params = useParams();

    const getCuisine = async (name) => {
        try {
            const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`);
            const recipes = await data.json();
            setCuisine(recipes.results);
        } catch (error) {
            console.error('Error fetching the cuisine data:', error);
        }
    };

    useEffect(() => {
        if (params.type) {
            getCuisine(params.type);
        }
    }, [params.type]);

    if (!cuisine || cuisine.length === 0) {
        return <div>No cuisines available</div>;
    }

    return (
        <Grid>
            
            {cuisine.map((item) => {
                return (
                    <Card key={item.id}>
                       <Link to={'/recipe/' + item.id}>
                    
                        <img src={item.image} alt={item.title} />
                        <h4>{item.title}</h4>
                        </Link>
                    </Card>
                );
            })}
        </Grid>
    );
}

const Grid = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 3rem;
`;

const Card = styled.div`
    img {
        width: 100%;
        border-radius: 2rem;
    }

    a {
        text-decoration: none;
    }

    h4 {
        text-align: center;
        padding: 1rem;
    }
`;

export default Cuisine;
