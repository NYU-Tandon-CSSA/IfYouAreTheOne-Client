import * as React from "react";

import onLight from "../images/on.png";
import offLight from "../images/off.png";
import blastLight from "../images/blast.png";

export default function light({ mode }) {
  let light;
  let imageState;
  if (mode === "on") {
    light = onLight;
    imageState = '100%'
  } else if (mode === "off") {
    light = offLight;
    imageState = '50%'
  } else {
    light = blastLight;
    imageState = '100%'
  }
  return (<><img src={light} style={{opacity:imageState}} alt="light" /><img src={light} width="95%" alt="light" /></>);
}
