import React, { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import List from "./List";

const Home = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <div>
      {loading ? (
        <div className="loader">
          <PulseLoader loading={loading} color="green" size={20} />
        </div>
      ) : (
        <div>
          <Navbar />
          <SearchBar />
          <List />
        </div>
      )}
    </div>
  );
};

export default Home;
