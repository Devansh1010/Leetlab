import React, { useEffect, useState } from "react";
import AddProblem from './AddProblem'
import { Link } from 'react-router-dom'
import useStore from '../store/store.js'
import Button from '../components/button/Button.jsx'
import {
    Code2,
    Layers,
    Terminal,
    CreditCard,
    LayoutGrid,
    FileText,
    Sun,
    Moon,
    CircleUser,
} from "lucide-react";

const Admin = () => {
    const { authUser } = useStore()




    return (
       <></>
    );
}

export default Admin