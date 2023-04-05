import * as React from "react";

import onLight from "../images/on.png";
import offLight from "../images/off.png";
import blastLight from "../images/blast.png";

import image1 from "../images/userImage/image1.jpeg";
import image2 from "../images/userImage/image2.jpeg";

export default function light({ userid, mode }) {
  let light;
  if (mode === "on") {
    light = onLight;
  } else if (mode === "off") {
    light = offLight;
  } else {
    light = blastLight;
  }

  let userImage;
  const images = [
    null,
    image1,
    image2,
    image2,
    image2,
    image2,
    image2,
    image2,
    image2,
    image2,
    image2,
    image2,
  ];
  let imageState;
  userImage = images[userid];

  if (mode === "off") {
    imageState = "30%";
  } else {
    imageState = "100%";
  }
  return (
    <div style={{ position: "relative" }}>
      <img
        src={userImage}
        width="100%"
        alt="light"
        style={{
          opacity: imageState,
          borderRadius: "50%",
          position: "relative",
        }}
      />
      <img
        src={light}
        width="40%"
        alt="light"
        style={{ position: "relative", top: "-25%", left: "60%" }}
      />
    </div>
  );
}
