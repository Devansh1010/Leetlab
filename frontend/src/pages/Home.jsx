import { useEffect } from "react";
import useStore from "../store/store";
import Sheets from "../components/home/Sheets.jsx";
import Problems from "../components/home/Problems.jsx";



const Home = () => {

  const { updateStreak } = useStore();

  useEffect(() => {
    updateStreak();
  }, []);

  return (
    <div className="bg-white dark:bg-[#111111]">
      <Sheets />
      <Problems />
    </div>
  );
};

export default Home;
