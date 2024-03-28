import React, { useEffect, useRef, useState } from "react";
import LandingPage from "./component/route/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter >
      <Routes>
        <Route exact path="/:slug" element={<LandingPage />} />
       
      </Routes>
    </BrowserRouter>
  );
};

export default App;
