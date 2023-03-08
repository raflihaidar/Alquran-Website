import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../redux/actions/action";
import { Link } from "react-router-dom";

const List = () => {
  const data = useSelector((state) => state.allData.dataQuran);
  const dispatch = useDispatch();
  const url =
    "https://raw.githubusercontent.com/penggguna/QuranJSON/master/quran.json";

  const getDataQuran = async () => {
    try {
      const response = await axios.get(url);
      dispatch(getData(response.data));
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    getDataQuran();
  });

  return (
    <div className="my-10 text-green-700">
      <p className="text-center text-2xl mb-5 font-bold">Daftar Surah</p>
      <div className="grid xl:grid-cols-3 w-4/5 mx-auto gap-y-5">
        {data.map((item, index) => (
          <Link to={`/surah/${item.number_of_surah}`} key={index}>
            <div className="flex border border-green-600 justify-between items-center xl:w-96 w-full p-3 cursor-pointer rounded-lg  transition hover:shadow-xl hover:scale-105 ">
              <div className="flex gap-x-10">
                <p>{item.number_of_surah}</p>
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm">{item.name_translations.id}</p>
                </div>
              </div>
              <p>{item.name_translations.ar}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default List;
