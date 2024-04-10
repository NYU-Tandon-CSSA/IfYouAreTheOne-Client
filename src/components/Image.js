import * as React from "react";

import onLight from "../images/on.png";
import offLight from "../images/off.png";
import blastLight from "../images/blast.png";

import image1 from "../images/userImage/image1.jpg";
import image2 from "../images/userImage/image2.jpg";
import image3 from "../images/userImage/image3.jpg";
import image4 from "../images/userImage/image4.jpg";
import image5 from "../images/userImage/image5.jpg";
import image6 from "../images/userImage/image6.jpg";
import image7 from "../images/userImage/image7.jpg";
import image8 from "../images/userImage/image8.jpg";
import image9 from "../images/userImage/image9.jpg";
import image10 from "../images/userImage/image10.jpg";
import image11 from "../images/userImage/image11.jpg";
import image12 from "../images/userImage/image12.jpg";
import image13 from "../images/userImage/image13.jpg";

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
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
    image11,
    image12,
    image13,
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
          aspectRatio: 1 / 1,
          objectFit: "cover",
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
