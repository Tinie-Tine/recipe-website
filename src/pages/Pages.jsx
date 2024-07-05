import React from 'react';
import Home from './Home';
import Cuisine from './Cuisine';
import Recipe from './Recipe';
import Searched from './Searched';
import { Route, Routes } from 'react-router-dom';

function Pages() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cuisine/:type" element={<Cuisine />} />
      <Route path="/searched/:search" element={<Searched />} />
      <Route path="/recipe/:name" element={<Recipe />} /> {/* Corrected route, no space*/}
    </Routes>
  );
}

export default Pages;
