import { IconUserShield, IconMenu2, IconUserExclamation, IconUserDown, IconSettings } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

export default function Header({ user, setShowMenu, onLogout }) {
    return (
        <>
            <header className='shadow'>
                <div>
                    <a href="#" onClick={() => setShowMenu(true)} className='text-white bg-color-custom-blue align-items-center justify-content-center shadow h-ref-custom-menu'>
                        <IconMenu2 className='tabler-icon-menu tabler-icon-menu-2' />
                    </a>
                </div>
                <div className='d-flex align-items-center'>
                    <div className="dropdown">
                        <a className="shadow text-decoration-none text-body d-flex align-items-center user-login-custom" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <IconUserExclamation />
                            {user.name}
                        </a>
                        <ul className="dropdown-menu">
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <a href="#" onClick={onLogout} className='dropdown-item d-flex align-items-center'>
                                    <IconUserDown />
                                    <span className='px-2'>
                                        Cerrar sesión
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        </>
    )
}
