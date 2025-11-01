import React from 'react'
import useStore from '../../store/store';

const LogoutButton = ({ childern }) => {
    const { logout } = useStore();

    const handleLogout = async () => {
        await logout();
    }
    return (

        <button
            onClick={handleLogout}
            className="hover:bg-primary hover:text-white text-base font-semibold"
        >
            {childern}
        </button>
    )
}

export default LogoutButton