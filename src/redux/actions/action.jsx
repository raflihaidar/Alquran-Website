import { ActionTypes } from "../contants/Action-types";

export const getData = (surah) => {
  return {
    type: ActionTypes.GET_DATA_SURAH,
    payload: surah,
  };
};

export const getSingleSurah = (surah) => {
  return {
    type: ActionTypes.SELECTED_SURAH,
    payload: surah,
  };
};

export const getAudio = (source) => {
  return {
    type: ActionTypes.GET_AUDIO_DATA,
    payload: source,
  };
};
