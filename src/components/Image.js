import * as React from "react";
import image1 from "../images/userImage/image1.jpeg"
import image2 from "../images/userImage/image2.jpeg"

export default function image({name, mode }) {
  let Image;
  let imageState;
    if (name ==='1号'){
        Image = image1
    }else{
        Image = image2
    }

  if (mode === "on") {
    imageState = '100%'
  } else if (mode === "off") {

    imageState = '30%'
  } else {

    imageState = '100%'
  }
  return (<img src={Image} width="95%" alt="light" style={{opacity:imageState, borderRadius: "50%"}}/>);
}
