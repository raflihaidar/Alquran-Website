import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useSelector } from "react-redux";
import "../App.css";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const data = useSelector((state) => state.allData.dataQuran);

  const handleFilter = (e) => {
    const searchWord = e.target.value;
    setWordEntered(searchWord);
    const dataFilter = data.filter((item) => {
      return item.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(dataFilter);
    }
  };

  const handleClose = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="text-green-700">
      <div className="flex justify-between border border-green-600 md:w-2/5 w-4/5 mx-auto p-5 mt-28 rounded-full relative">
        <input
          type="text"
          className="border-none outline-none w-3/5"
          placeholder="Apa yang ingin kamu baca ?"
          value={wordEntered}
          onChange={handleFilter}
        />
        {filteredData.length === 0 ? (
          <SearchIcon />
        ) : (
          <CloseIcon onClick={handleClose} />
        )}
      </div>
      {filteredData.length !== 0 ? (
        <div
          id="dataResult"
          className="w-4/5 md:w-2/5 h-56 text-center rounded-lg overflow-hidden overflow-y-auto border bg-white"
        >
          {filteredData.slice(0, 114).map((item, index) => (
            <div className="py-5 cursor-pointer hover:bg-stone-200" key={index}>
              <Link to={`/surah/${item.number_of_surah}`} className="block">
                {item.name}
              </Link>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default SearchBar;
