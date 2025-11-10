
import { Link } from 'react-router-dom'
import useStore from '../../store/store.js'
import LogoutButton from '../logoutButton/LogoutButton.jsx'
import { Code2Icon, LogOut, User } from 'lucide-react'

const Navbar = () => {
    const { authUser } = useStore()
    console.log("Auth User in Navbar:", authUser);
    const streakCount = authUser?.streakCount || 0;
    const longestStreak = authUser?.longestStreak || 0;

    return (
        <div className="navbar bg-#f8fafc shadow-md fixed top-0 left-0 w-full z-50 opacity-97">
            <div className="navbar-start">
                {/* Logo Section */}
                <div className="dropdown">
                    <Link to="/" className="flex items-center gap-3 cursor-pointer">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                    </Link>
                </div>
                <a className="btn text-xl btn-ghost  hover:btn-#1d4ed8">daisyUI</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {
                        authUser?.role === "ADMIN" && <li className='text-#0f172a text-lg'><Link to={'/'}>Dashboard</Link></li>
                    }
                    <li className='text-#0f172a text-lg'><Link to={'/'}>Problems</Link></li>
                    <li className='text-#0f172a text-lg'><Link to={'/leaderboard'}>Leaderboard</Link></li>
                    <li className='text-#0f172a text-lg'><Link to={'/playlist'}>Playlists</Link></li>
                    <li className='text-#0f172a text-lg'> <Link to={'/pricing'}>Pricing</Link></li>
                </ul>

            </div>

            <div className="navbar-end">
                <div className="flex items-center gap-8">
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar flex flex-row ">
                            <div className="w-10 rounded-full ">
                                <img
                                    src={
                                        authUser?.image ||
                                        "https://avatar.iran.liara.run/public/boy"
                                    }
                                    alt="User Avatar"
                                    className="object-cover"
                                />
                            </div>

                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52 space-y-3"
                        >

                            {/* Common Options */}
                            <li>
                                <p className="text-base font-semibold">

                                    {authUser?.name}

                                </p>
                                <hr className="border-gray-200/10" />
                            </li>
                            <li>
                                <Link
                                    to="/profile"
                                    className="hover:bg-primary hover:text-white text-base font-semibold"
                                >
                                    <User className="w-4 h-4 mr-2" />
                                    My Profile
                                </Link>
                            </li>


                        </ul>
                    </div>

                    <div className='flex gap-3 justify-center items-center'>
                        {authUser?.role === "USER" && <div><Code2Icon />

                            <h2>{streakCount}</h2></div>}

                        <LogoutButton className="hover:text-white cursor-pointer btn btn-ghost rounded-btn">
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </LogoutButton>
                    </div>

                </div>
            </div>

        </div >
    )
}

export default Navbar