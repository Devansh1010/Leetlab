import React, { useEffect, useState } from "react";
import useProblemStore from "../store/problemStore";
import { Loader2, Plus } from "lucide-react";
import CreateSheet from "../components/sheet/CreateSheet";



const AddSheet = () => {
  // Selectors (each separately for proper reactivity)
  
  //  Check for data and render cleanly
  return (
    <div className="p-6 min-h-screen flex justify-center items-center">

      <CreateSheet  />
    
    </div>
  );
};

export default AddSheet;
