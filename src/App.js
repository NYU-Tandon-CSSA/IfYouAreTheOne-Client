import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { useQuery, useSubscription } from "@apollo/client";
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

const LIGHTS_SUBSCRIPTION = gql`
  subscription LightUpdated {
    lightUpdated {
      name
      mode
    }
  }
`;

function App() {
  const [ViewData, setViewData] = useState([]);
  const [offCount, setOffCount] = useState(0);
  const [blastCount, setBlastCount] = useState(0);
  const { loading, data } = useQuery(FETCH_LIGHTS_QUERY);

  let offAudio = new Audio("/off.wav");
  let blastAudio = new Audio("/blast.wav");

  useEffect(() => {
    if (!loading && data) {
      setViewData(data.getLights);
    }
  }, [data, loading]);

  useSubscription(LIGHTS_SUBSCRIPTION, {
    onSubscriptionData: (data) => {
      const lights = data.subscriptionData.data.lightUpdated;
      setViewData(lights);

      let curOffCount = 0;
      let curBlastCount = 0;
      for (let i = 0; i < lights.length; i++) {
        const mode = lights[i].mode;
        if (mode === "off") {
          curOffCount++;
        } else if (mode === "blast") {
          curBlastCount++;
        }
      }
      if (curOffCount !== 0 && offCount < curOffCount) {
        offAudio.play();
        console.log("Light off!");
      }
      if (curBlastCount !== 0 && blastCount < curBlastCount) {
        blastAudio.play();
        console.log("Light Blast!");
      }
      setOffCount(curOffCount);
      setBlastCount(curBlastCount);
    },
  });

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
