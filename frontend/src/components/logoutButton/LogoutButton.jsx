import React from 'react'
import useStore from '../../store/store';

const LogoutButton = ({ children, className }) => {
    const { logout } = useStore();

    const handleLogout = async () => {
        await logout();
    }
    return (

        <button
            onClick={handleLogout}
            className={`hover:bg-base-300 hover:text-white text-base font-semibold ${className} `}
        >
            { children }
        </button>
    )
}

export default LogoutButton