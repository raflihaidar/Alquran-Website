import Navbar from "./components/Navbar";
import List from "./components/List";
import SearchBar from "./components/SearchBar";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import "./App.css";

function App() {
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
}

export default App;
