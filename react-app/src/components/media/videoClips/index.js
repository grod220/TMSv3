import React from "react";

import VideoClipBanner from "./videoClipBanner/";

const VideoClips = () => (
  <div>
    <VideoClipBanner
      color="#902e2d"
      metatitle="Fox 35 visits the Meatball Stoppe"
      headline="Take a look inside with Fox35"
      videoURL="https://www.youtube.com/embed/COP-i-g-CRo?modestbranding=1&amp;rel=0&amp;showinfo=0&amp;theme=light&amp;color=white"
    />
    <VideoClipBanner
      color="#c57c35"
      metatitle="Daily Buzz cooking feature"
      headline="...or catch a cooking class with Chef Isabella"
      videoURL="https://www.youtube.com/embed/G1ZOR20ySPo?modestbranding=1&rel=0&showinfo=0&theme=light&color=white&start=40"
      reverse
      bottom
    />
  </div>
);

export default VideoClips;
