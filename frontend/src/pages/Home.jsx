import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";


import useStore from "../store/store";
import Sheets from "../components/home/Sheets.jsx";
import Problems from "../components/home/Problems.jsx";



const Home = () => {
  


  
  const { updateStreak } = useStore();
 


  useEffect(() => {
    updateStreak();
  }, []);



 



  return (
    <div className="bg-linear-to-b from-slate-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 text-gray-900 dark:text-gray-100 transition-all duration-500">

      <Sheets />
      <Problems />
  
    </div>
  );
};

export default Home;
