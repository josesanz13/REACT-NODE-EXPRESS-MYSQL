import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../context/ContextProvider';
import { IconPlus, IconEdit, IconTrash } from '@tabler/icons-react';
import Loading from '../components/Loading';

function Users() {
    const [users, setUsers] = useState([]);
    const [userDelete, setUserDelete] = useState({ id: "", name: "" });
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();

    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = () => {
        setLoading(true);
        axiosClient.get('/users')
            .then(({ data }) => {
                setLoading(false);
                setUsers(data.data)
            })
            .catch(() => {
                setLoading(false);
            })
    }

    const onDelete = (u) => {

        const modalDelete = document.getElementById('exampleModal')
        const instanceModalDelete = new bootstrap.Modal('#exampleModal');

        instanceModalDelete.show();
        modalDelete.addEventListener('shown.bs.modal', event => {
            event.preventDefault();
            setUserDelete(u);
        });

        modalDelete.addEventListener('hidden.bs.modal', event => {
            setUserDelete({
                id: "",
                name: ""
            });
        })
    }

    const handleDelete = () => {
        const btn_dismis = document.getElementById('dismiss');
        axiosClient.delete(`/users/${userDelete.id}`)
            .then(async () => {
                await getUsers();
                btn_dismis.click();
                setNotification("Usuario eliminado exitosamente!")
            })
    }

    return (
        <>
            <div className='d-flex justify-content-between align-items-center'>
                <h2 className='title-module'>Usuarios</h2>
                <Link to="/users/new" className='btn btn-primary btn-sm d-flex align-items-center'>
                    <IconPlus />
                    Nuevo Usuario
                </Link>
            </div>
            <div className="card animated fadeInDown px-3 py-3">
                <div className="table-responsive">
                    <table className="table align-middle table-sm table-hover m-0 datatable">
                        <thead>
                            <tr className='table-primary'>
                                <th>Acciones</th>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Creado</th>
                            </tr>
                        </thead>
                        {
                            loading &&
                            <tbody>
                                <tr>
                                    <td colSpan="5" className='text-center'><Loading /></td>
                                </tr>
                            </tbody>
                        }
                        {
                            !loading &&
                            <tbody>
                                {
                                    users.map(u => (
                                        <tr key={u.id}>
                                            <td className='text-center'>
                                                <div className="btn-group btn-group-sm" role="group" aria-label="Small button group">
                                                    <Link
                                                        to={`/users/${u.id}`}
                                                        className="btn btn-primary btn-xs d-flex justify-content-center"
                                                    >
                                                        <span className='d-block d-lg-none'>
                                                            <IconEdit />
                                                        </span>
                                                        <span className='d-none d-lg-block'>
                                                            Editar
                                                        </span>
                                                    </Link>
                                                    <button
                                                        className='btn btn-danger btn-xs'
                                                        onClick={ev => onDelete(u)}
                                                    >
                                                        <span className='d-block d-lg-none'>
                                                            <IconTrash />
                                                        </span>
                                                        <span className='d-none d-lg-block'>
                                                            Eliminar
                                                        </span>
                                                    </button>
                                                </div>
                                            </td>
                                            <td>{u.id}</td>
                                            <td>{u.name}</td>
                                            <td>{u.email}</td>
                                            <td>{u.created_at}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        }
                    </table>
                </div>
            </div>
            {/* Modal delete */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Eliminar usuario</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>
                                Esta seguro de eliminar el usuario : <strong> {userDelete.name} </strong>
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger btn-sm" id='dismiss' data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-primary btn-sm" onClick={() => handleDelete()}>Aceptar</button>
                        </div>
                    </div>
                </div>
            </div>

        </ >
    )
}

export default Users