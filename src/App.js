import React, { useState, useEffect } from "react";
import useSound from "use-sound";
import { Route, Routes, useLocation } from "react-router-dom";

import { useQuery, useSubscription } from "@apollo/client";
import gql from "graphql-tag";

import View from "./routes/View";
import User from "./routes/User";
import Admin from "./routes/Admin";

import blastSFX from "./sounds/blast.mp3";
import offSFX from "./sounds/off.mp3";
import showPickSFX from "./sounds/showPick.mp3";

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

const PICKS_SUBSCRIPTION = gql`
  subscription PickUpdated {
    pickUpdated {
      name
      pick
      show
    }
  }
`;

function App() {
  const [ViewData, setViewData] = useState([]);
  const [offCount, setOffCount] = useState(0);
  const [blastCount, setBlastCount] = useState(0);
  const { loading, data } = useQuery(FETCH_LIGHTS_QUERY);

  const [playOffSFX] = useSound(offSFX);
  const [playBlastSFX] = useSound(blastSFX);
  const [playShowPickSFX] = useSound(showPickSFX);

  let location = useLocation().pathname;

  useEffect(() => {
    if (!loading && data) {
      setViewData(data.getLights);
      let curOffCount = 0;
      let curBlastCount = 0;
      for (let i = 0; i < data.getLights.length; i++) {
        const mode = data.getLights[i].mode;
        if (mode === "off") {
          curOffCount++;
        } else if (mode === "blast") {
          curBlastCount++;
        }
      }
      setOffCount(curOffCount);
      setBlastCount(curBlastCount);
    }
  }, [data, loading]);
  console.log(offCount);

  useSubscription(LIGHTS_SUBSCRIPTION, {
    onSubscriptionData: (data) => {
      const lights = data.subscriptionData.data.lightUpdated;

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
        if (location === "/") {
          playOffSFX();
        }
        console.log("Light off!");
      }
      if (curBlastCount !== 0 && blastCount < curBlastCount) {
        if (location === "/") {
          playBlastSFX();
        }
        console.log("Light Blast!");
      }
      setOffCount(curOffCount);
      setBlastCount(curBlastCount);
      setViewData(lights);
    },
  });

  useSubscription(PICKS_SUBSCRIPTION, {
    onSubscriptionData: (data) => {
      const picks = data.subscriptionData.data.pickUpdated;
      if (picks[0].show) {
        if (location === "/") {
          playShowPickSFX();
        }
        console.log("Show Pick");
      }
    },
  });

  return (
    <Routes>
      <Route path="/" element={<View ViewData={ViewData} />} />
      <Route path="/admin" element={<Admin ViewData={ViewData} />} />
      <Route path="/user/:username" element={<User ViewData={ViewData} />} />
    </Routes>
  );
}

export default App;
