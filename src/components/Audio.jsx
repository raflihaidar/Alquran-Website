import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAudio } from "../redux/actions/action";
import AudioPlayer from "./AudioPlayer";
import Navbar from "./Navbar";

const Audio = () => {
  const data = useSelector((state) => state.allData.dataQuran);
  const dispatch = useDispatch();
  const audioPlayer = useRef();
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSource = (item) => {
    dispatch(getAudio(item));
    togglePlay();
  };

  const togglePlay = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      audioPlayer.current.play();
    } else {
      setIsPlaying(false);
      audioPlayer.current.pause();
    }
  };

  return (
    <div className="relative h-full">
      <Navbar />
      <div className=" grid md:w-3/5 mx-auto my-28 gap-y-3 shadow-custom rounded-l-3xl rounded-r-3xl">
        {data.map((item, index) => (
          <div
            className="w-full flex p-5 items-center justify-between cursor-pointer hover:bg-stone-200 transition"
            key={index}
            onClick={() => handleSource(item)}
          >
            <div className="w-2/5 flex items-center gap-x-5">
              <p>{item.number_of_surah}</p>
              <div>
                <p className="font-semibold">{item.name}</p>
                <p>{item.name_translations.id}</p>
              </div>
            </div>
            <div className="md:w-3/5 flex md:justify-between">
              <p className="hidden md:block">{item.type}</p>
              <p className="flex-end">{item.number_of_ayah} ayat</p>
            </div>
          </div>
        ))}
      </div>
      <div className="md:w-3/5 mx-auto">
        <AudioPlayer
          togglePlay={togglePlay}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          audioPlayer={audioPlayer}
        />
      </div>
    </div>
  );
};

export default Audio;
