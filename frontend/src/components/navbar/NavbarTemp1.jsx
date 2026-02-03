import { Link } from 'react-router-dom'
import useStore from '../../store/store.js'
import LogoutButton from '../logoutButton/LogoutButton.jsx'
import { Code2Icon, LogOut, Swords, User } from 'lucide-react'

const Navbar = () => {
    const { authUser } = useStore()
    const streakCount = authUser?.streakCount || 0;

    return (
        <div className="navbar sticky top-0 left-0 w-full z-50 bg-neutral shadow-md px-6">

            {/* LEFT SECTION */}
            <div className="navbar-start">
                <Link to="/" className="text-[25px] font-bold text-white hover:text-primary transition">
                    Leet<span className='dark:text-primary text-[28px]'>Lab</span> 
                </Link>
            </div>

            {/* CENTER MENU — Only Desktop */}
            <div className="navbar-center">
                <ul className="menu menu-horizontal px-1 flex gap-6">
                    <li>
                        <Link className="text-lg hover:bg-primary/20 px-3 py-2 rounded-lg" to="/">
                            Problems
                        </Link>
                    </li>

                    <li>
                        <Link className="text-lg hover:bg-primary/20 px-3 py-2 rounded-lg" to="/leaderboard">
                            Leaderboard
                        </Link>
                    </li>

                    <li>
                        <Link className="text-lg hover:bg-primary/20 px-3 py-2 rounded-lg" to="/playlist">
                            Playlists
                        </Link>
                    </li>

                    <li>
                        <Link className="text-lg hover:bg-primary/20 px-3 py-2 rounded-lg" to="/pricing">
                            Pricing
                        </Link>
                    </li>
                </ul>
            </div>

            {/* RIGHT SECTION */}
            <div className="navbar-end flex items-center gap-6">

                {/* Today Challenge */}
                <Link
                    to="/today-challange"
                    className="btn btn-ghost rounded-btn hover:bg-primary/20"
                >
                    <Swords />
                </Link>

                {/* Streak */}
                {authUser?.role === "USER" && (
                    <div className="flex items-center gap-2 text-white">
                        <Code2Icon />
                        <h2>{streakCount}</h2>
                    </div>
                )}

                {/* User Dropdown */}
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                src={authUser?.image || "https://avatar.iran.liara.run/public/boy"}
                                alt="User Avatar"
                                className="object-cover"
                            />
                        </div>
                    </label>

                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-50 p-3 shadow bg-base-100 rounded-xl w-56 space-y-2"
                    >
                        <li className="font-semibold text-base px-2">
                            {authUser?.name}
                            <hr className="my-2" />
                        </li>

                        <li>
                            <Link to="/profile" className="flex items-center gap-2 hover:bg-primary hover:text-white px-3 py-2 rounded-lg">
                                <User className="w-4 h-4" /> My Profile
                            </Link>
                        </li>

                        <li>
                            <LogoutButton className="hover:bg-red-500 hover:text-white px-3 py-2 rounded-lg flex items-center gap-2">
                                <LogOut className="w-4 h-4" /> Logout
                            </LogoutButton>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default Navbar
