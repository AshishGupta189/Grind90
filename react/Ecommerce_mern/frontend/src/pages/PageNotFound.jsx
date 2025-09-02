import React from "react";
import TrueFocus from "../reactBits/TrueFocus";
const PageNotFound = () => {
  return (
    <div className="w-full h-screen flex items-center text-white justify-center z-2 absolute">
  <TrueFocus
    sentence="404 This page doesn't exist!..."
    manualMode={false}
    blurAmount={2}
    borderColor="red"
    animationDuration={1}
    pauseBetweenAnimations={1}
  />
</div>

  );
};

export default PageNotFound;
