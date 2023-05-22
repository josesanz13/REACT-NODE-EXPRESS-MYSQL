import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import axiosClient from '../axios-client'
import { useMediaPredicate } from "react-media-hook";
import { useStateContext } from '../context/ContextProvider'
import { IconChevronLeft } from '@tabler/icons-react';
import Aside from './Aside';
import Header from './HEader';

function DefultLayout() {
    const { user, token, setUser, setToken, notification } = useStateContext()
    const mediaMinimal680 = useMediaPredicate("(max-width: 680px)");
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        axiosClient.get('user')
            .then(({ data }) => {
                setUser(data.data.user)
            })
        if (!mediaMinimal680) {
            setShowMenu(false);
        }
    }, [])

    if (!token) {
        return <Navigate to="/login" />
    }

    const onLogout = (e) => {
        e.preventDefault();
        axiosClient.post('/logout', {})
            .then(() => {
                setUser({});
                setToken(null);
            })
    }

    return (
        <div id='defaultLayout'>
            <aside className={showMenu && mediaMinimal680 ? 'animated fade-left-right show' : 'animated fade-left-right'}>
                <span className='btn-custom-hide-menu-mobile px-2 text-white justify-content-center align-items-center shadow' onClick={() => setShowMenu(false)}>
                    <IconChevronLeft />
                </span>
                <Aside />
            </aside>
            <div className="content">
                <Header setShowMenu={setShowMenu} user={user} onLogout={onLogout} />
                <main className='main-content'>
                    <Outlet />
                </main>
            </div>
            {
                notification &&
                <div className={`alert alert-${notification.type} notification notification-${notification.type}`}>
                    {notification.message}
                </div>
            }
        </div>
    )
}

export default DefultLayout