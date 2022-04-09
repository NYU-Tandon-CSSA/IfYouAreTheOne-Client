import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

import View from "./routes/View";
import User from "./routes/User";
import Admin from "./routes/Admin";

const FETCH_LIGHTS_QUERY = gql`
  {
    getLights {
      name
      mode
    }
  }
`;

function App() {
  const [ViewData, setViewData] = useState([]);
  const { loading, data } = useQuery(FETCH_LIGHTS_QUERY, {
    pollInterval: 500,
  });

  useEffect(() => {
    if (!loading && data) {
      setViewData(data.getLights);
      console.log("data changed!");
    }
  }, [data, loading]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<View ViewData={ViewData} />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/user/:username" element={<User ViewData={ViewData} />} />
      </Routes>
    </Router>
  );
}

export default App;
