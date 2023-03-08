import { ActionTypes } from "../contants/Action-types";

const initialState = {
  dataQuran: [],
  audio: {
    name: "Al-Fatiha",
    name_translations: {
      ar: "الفاتحة",
      en: "The Opening",
      id: "Pembukaan",
    },
    number_of_ayah: 7,
    number_of_surah: 1,
    place: "Mecca",
    recitation:
      "https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/001.mp3",
    type: "Makkiyah",
  },
};

export const getAllData = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_DATA_SURAH:
      return { ...state, dataQuran: payload };
    default:
      return state;
  }
};

export const selectedSurah = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SELECTED_SURAH:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export const getAudioData = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_AUDIO_DATA:
      return { ...state, audio: payload };
    default:
      return state;
  }
};
