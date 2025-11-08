import React from 'react'
import AddProblem from './AddProblem'
import { Link } from 'react-router-dom'
import  useStore  from '../store/store.js'
import Button from '../components/button/Button.jsx'

const Admin = () => {
    const user = useStore()
    console.log(user)
    return (
        <div data-theme='light'>
            <div className="hero bg-[#0d1117] min-h-screen">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold text-[#c9d1d9] ">Hello, {user.authUser.name}</h1>
                        <p className="py-6 text-[#8b949e]">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                        <Link to={'/admin/add-problem'}><Button content={"Add Problem"} className={'bg-[#238636] hover:bg-[#2ea043]'}/> </Link>
                        <Link to={'/admin/add-sheet'}><Button content={'Add Sheet'} className={'bg-[#1f6feb] hover:bg-[#388bfd]'}/> </Link>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Admin