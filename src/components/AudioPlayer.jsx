import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// Icon
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import { VolumeMute, VolumeOff, VolumeUp } from "@mui/icons-material";
import VolumeDown from "@mui/icons-material/VolumeDown";

//Component
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";
import styled from "styled-components";

//custom slider
const CSlider = styled(Slider)(({ theme }) => ({
  "& .MuiSlider-thumb": {
    width: "13px",
    height: "13px",
  },
}));

const AudioPlayer = ({ togglePlay, isPlaying, audioPlayer }) => {
  const audioData = useSelector((state) => state.audioData.audio);
  const { recitation, name, number_of_ayah } = audioData;
  const [mute, setMute] = useState(false);
  const [volume, setVolume] = useState(30);
  const [elapsed, setElapsed] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);

  const VolumeIcon = () => {
    return mute ? (
      <VolumeOff onClick={() => setMute(!mute)} />
    ) : volume <= 20 ? (
      <VolumeMute onClick={() => setMute(!mute)} />
    ) : volume <= 75 ? (
      <VolumeDown onClick={() => setMute(!mute)} />
    ) : (
      <VolumeUp onClick={() => setMute(!mute)} />
    );
  };

  const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const hours =
        Math.floor(time / (60 * 60)) < 10
          ? `0${Math.floor(time / (60 * 60))}`
          : Math.floor(time / (60 * 60));
      const minutes =
        Math.floor((time / 60) % 60) < 10
          ? `0${Math.floor((time / 60) % 60)}`
          : Math.floor((time / 60) % 60);
      const seconds =
        Math.floor(time % 60) < 10
          ? `0${Math.floor(time % 60)}`
          : Math.floor(time % 60);
      return `${hours}:${minutes}:${seconds}`;
    }
    return "00:00:00";
  };

  const toggleForward = () => {
    audioPlayer.current.currentTime += 10;
  };
  const toggleBackward = () => {
    audioPlayer.current.currentTime -= 10;
  };

  useEffect(() => {
    if (audioPlayer) {
      audioPlayer.current.volume = volume / 100;
      audioPlayer.current.mute = mute;
    }

    setInterval(() => {
      if (isPlaying) {
        const duration = Math.floor(audioPlayer?.current?.duration);
        const currentTime = Math.floor(audioPlayer?.current?.currentTime);

        setRemainingTime(duration);
        setElapsed(currentTime);
      }
    }, 100);
  }, [volume, isPlaying, audioPlayer, mute]);

  return (
    <div className="bg-green-600 p-5 fixed bottom-0 md:w-3/5 w-full">
      <audio id="audio" ref={audioPlayer} src={recitation} muted={mute}></audio>
      <Box sx={{ display: "flex", gap: "10px" }}>
        <Typography>{name}</Typography>
        <span>-</span>
        <Typography>{number_of_ayah} Ayat</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack
          spacing={1}
          direction="row"
          sx={{ mb: 1, width: "25%", justifyContent: "flex-start" }}
          alignItems="center"
        >
          <VolumeIcon />
          <CSlider
            aria-label="Volume"
            min={0}
            max={100}
            value={volume}
            onChange={(e, v) => setVolume(v)}
          />
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          sx={{ width: "40%", alignItems: "center" }}
        >
          <SkipPreviousIcon className="cursor-pointer" />
          <FastRewindIcon onClick={toggleBackward} className="cursor-pointer" />
          {!isPlaying ? (
            <PlayArrowIcon
              fontSize="large"
              onClick={togglePlay}
              className="cursor-pointer"
            />
          ) : (
            <PauseIcon
              fontSize="large"
              onClick={togglePlay}
              className="cursor-pointer"
            />
          )}
          <FastForwardIcon onClick={toggleForward} className="cursor-pointer" />
          <SkipNextIcon className="cursor-pointer" />
        </Stack>

        <Stack sx={{ justifyContent: "flex-end" }}></Stack>
      </Box>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography>{formatTime(elapsed)}</Typography>
        <CSlider value={elapsed} max={remainingTime} />
        <Typography>{formatTime(remainingTime - elapsed)}</Typography>
      </Stack>
    </div>
  );
};

export default AudioPlayer;
