import * as React from "react";

import onLight from "../images/on.png";
import offLight from "../images/off.png";
import blastLight from "../images/blast.png";

export default function light({ mode }) {
  let light;
  if (mode === "on") {
    light = onLight;
  } else if (mode === "off") {
    light = offLight;
  } else {
    light = blastLight;
  }
  return <img src={light} width="100%" />;
}
