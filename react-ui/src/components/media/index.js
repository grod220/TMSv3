import React from "react";

import ShortHero from "../shared/shortHero/";
import MediaHero from "./cameraAndStudio.jpg";
import TripleD from "./tripleD/"
import NewsOutlets from "./newsOutlets/"
import VideoClipTop from "./videoClipTop/"
import VideoClipBottom from "./videoClipBottom/"
import MoreVidsText from "./moreVidsText/"

const Media = () => (
  <div>
    <ShortHero image={MediaHero} headline="In the media" />
    <TripleD/>
    <NewsOutlets/>
    <VideoClipTop/>
    <VideoClipBottom />
    <MoreVidsText />
  </div>
);

export default Media;
