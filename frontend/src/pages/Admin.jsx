import React from 'react'
import AddProblem from './AddProblem'
import { Link } from 'react-router-dom'
import useStore from '../store/store.js'
import Button from '../components/button/Button.jsx'
import { Code2, Layers, Terminal, Trophy } from "lucide-react";

const Admin = () => {
    const {authUser} = useStore()
   
    return (
        <div>
            <section className="relative bg-linear-to-b from-base-100 via-base-200 to-base-300 min-h-screen flex items-center justify-center overflow-hidden">

                {/* Decorative background icons */}
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <div className="absolute top-16 left-24">
                        <Code2 className="w-28 h-28 text-primary" />
                    </div>
                    <div className="absolute bottom-20 right-28">
                        <Layers className="w-24 h-24 text-secondary" />
                    </div>
                    <div className="absolute top-32 right-1/3">
                        <Terminal className="w-20 h-20 text-accent" />
                    </div>
                </div>

                {/* Hero content */}
                <div className="relative hero-content text-center z-10">
                    <div className="max-w-xl space-y-6">
                        {/* Heading */}
                        <h1 className="text-5xl font-extrabold text-secondary">
                            Welcome back,{" "}
                            <span className="text-primary">{authUser?.name || "Coder"}</span> 👋
                        </h1>

                      

                        {/* Buttons */}
                        <div className="flex items-center justify-center gap-4 mt-8">
                            <Link to={'/admin/add-problem'}><Button content={"Add Problem"} className={'bg-[#238636] hover:bg-[#2ea043]'} /> </Link>
                            <Link to={'/admin/add-sheet'}><Button content={'Add Sheet'} className={'bg-[#1f6feb] hover:bg-[#388bfd]'} /> </Link>
                        </div>
                    </div>
                </div>

                {/* Light overlay gradient for focus */}
                <div className="absolute inset-0 bg-linear-to-t from-base-300/40 via-transparent to-transparent pointer-events-none" />
            </section>

        </div>

    )
}

export default Admin