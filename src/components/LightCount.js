import { useEffect, useState } from "react";

export default function LightCount({ ViewData }) {
  let lightTotal = ViewData.length;
  const [onLightCount, setOnLightCount] = useState(0);
  const [blastLightCount, setBlastLightCount] = useState(0);

  useEffect(() => {
    let onCount = 0;
    let blastCount = 0;
    for (let i = 0; i < lightTotal; i++) {
      const mode = ViewData[i].mode;
      if (mode === "on") {
        onCount++;
      }
      if (mode === "blast") {
        blastCount++;
        onCount++;
      }
    }
    setOnLightCount(onCount);
    setBlastLightCount(blastCount);
  }, [ViewData, lightTotal]);

  return (
    <>
      留灯数量： {onLightCount} / {lightTotal}
      <br />
      爆灯数量：{blastLightCount}
    </>
  );
}
