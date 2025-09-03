import React from "react";
import Video from "./Video";

const HomeHeroText = () => {
  return (
    <div className="font-[font1] text-white pt-3 text-center">
      <div className="text-[9.5vw] justify-center flex items-center uppercase leading-[8.5vw]">
        L'étincelle
      </div>
      <div className="text-[9.5vw] justify-center flex items-center uppercase leading-[8.5vw] ">
        qui
        <div className="h-[7.5vw] w-[15vw] rounded-full overflow-hidden mx-[0.5vw]">
          <Video/>
        </div>
        génère
      </div>

      <div className="text-[9.5vw] justify-center flex items-center uppercase leading-[8.5vw]">
        la créativité
      </div>
    </div>
  );
};

export default HomeHeroText;
