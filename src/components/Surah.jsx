import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getSingleSurah } from "../redux/actions/action";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Navbar from "./Navbar";
import { PulseLoader } from "react-spinners";

const Surah = () => {
  const { surahId } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  let surah = useSelector((state) => state.singleData);
  const {
    verses,
    name,
    name_translations,
    number_of_ayah,
    place,
    number_of_surah,
  } = surah;

  const getSingleDataSurah = async (id) => {
    const url = `https://raw.githubusercontent.com/penggguna/QuranJSON/master/surah/${id}.json`;
    try {
      const response = await axios.get(url);
      dispatch(getSingleSurah(response.data));
    } catch (err) {
      console.log("error", err);
    }
  };

  const NextButton = () => {
    return number_of_surah <= 113 ? (
      <Link to={`/surah/${number_of_surah + 1}`}>
        <div className="bg-lime-500 flex absolute px-4 py-2 right-1 top-1 rounded-lg cursor-pointer">
          <p className="">Next</p>
          <NavigateNextIcon />
        </div>
      </Link>
    ) : null;
  };

  const PrevButton = () => {
    return number_of_surah > 1 ? (
      <Link to={`/surah/${number_of_surah - 1}`}>
        <div className="bg-lime-500 flex absolute px-4 py-2 left-1 top-1 rounded-lg cursor-pointer text-start">
          <NavigateBeforeIcon />
          <p className="">Prev</p>
        </div>
      </Link>
    ) : null;
  };

  useEffect(() => {
    if (surahId && surahId !== "") {
      getSingleDataSurah(surahId);
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [surahId]);

  return (
    <>
      {loading ? (
        <div className="loader">
          <PulseLoader loading={loading} color="green" size={20} />
        </div>
      ) : (
        <>
          <Navbar />
          {Object.keys(surah).length === 0 ? null : (
            <>
              <div className="w-4/5 h-96 mx-auto mt-28 p-10 bg-lime-300 text-center text-green-700 rounded-lg relative">
                <div>
                  <NextButton />
                  <PrevButton />
                </div>
                <p className="text-6xl fw-bold leading-normal">
                  {name_translations.ar}
                </p>
                <p className="text-3xl fw-bold">{name}</p>
                <p className="text-lg">{name_translations.id}</p>
                <p>
                  {place} | {number_of_ayah} ayat
                </p>
              </div>
              {verses.map((item, index) => (
                <div
                  className="grid w-4/5 mx-auto my-10 p-5 bg-lime-50 gap-y-3 rounded-lg text-green-700 cursor-pointer hover:shadow-lg transition"
                  key={index}
                >
                  <p className="text-end text-2xl">{item.text}</p>
                  <div className="flex gap-x-3">
                    <p>
                      {number_of_surah}:{index + 1}
                    </p>
                    <p>{item.translation_id}</p>
                  </div>
                </div>
              ))}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Surah;
