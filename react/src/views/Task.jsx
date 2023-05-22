import { IconEdit, IconChecks, IconTrashX, IconPlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import axiosClient from '../axios-client';
import Loading from '../components/Loading';
import { useStateContext } from '../context/ContextProvider';
import { Link } from 'react-router-dom';

function Task() {
    const [taskDelete, setTaskDelete] = useState({
        id: "",
        description: "",
        title: ""
    });
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();

    useEffect(() => {
        getTasks();
    }, [])

    const getTasks = () => {
        setLoading(true);
        axiosClient.get('/tasks')
            .then(({ data }) => {
                setLoading(false);
                setTasks(data.data)
            })
            .catch(() => {
                setLoading(false);
            })
    }

    const onDelete = (task) => {
        const modalDelete = document.getElementById('exampleModal')
        const instanceModalDelete = new bootstrap.Modal('#exampleModal');

        instanceModalDelete.show();
        modalDelete.addEventListener('shown.bs.modal', event => {
            event.preventDefault();
            setTaskDelete(task);
        });

        modalDelete.addEventListener('hidden.bs.modal', event => {
            setTaskDelete({
                id: "",
                description: "",
                title: ""
            });
        })
    }

    const handleDelete = () => {
        const btn_dismis = document.getElementById('dismiss');
        axiosClient.delete(`/task/delete/${taskDelete.id}`)
            .then(async () => {
                await getTasks();
                btn_dismis.click();
                setNotification("Tarea eliminada exitosamente!")
            })
            .catch(() => {
                setLoading(true);
                setNotification("¡Error! conexión perdida", "danger")
            })
    }
    return (
        <>
            <div className='d-flex justify-content-between align-items-center'>
                <h2 className="title-module">Tareas</h2>
                <Link to="/tasking/new" className='btn btn-primary btn-sm d-flex align-items-center'>
                    <IconPlus />
                    Nueva Tarea
                </Link>
            </div>
            <div className="card">
                {
                    loading &&
                    <div className="d-flex justify-content-center py-5">
                        <Loading />
                    </div>
                }
                {
                    !loading &&
                    <div className="card-body ws-pre-wrap">
                        {
                            tasks.map(task => (
                                <div className="card my-4" key={task.id}>
                                    <div className="card-header card-custom-tasking bg-dark bg-opacity-25">
                                        {task.title}
                                    </div>
                                    <div className="card-body">
                                        {task.description}
                                    </div>
                                    <div className="card-footer py-3">
                                        <div className="d-flex justify-content-end align-items-center">
                                            <div className="btn-group btn-group-sm" role="group" aria-label="Small button group">
                                                <button
                                                    type="button"
                                                    className="btn btn-danger align-items-center d-flex"
                                                    onClick={ev => onDelete(task)}>
                                                    <IconTrashX />Eliminar
                                                </button>
                                                <Link
                                                    to={`/tasking/${task.id}`}
                                                    className="btn btn-primary btn-xs d-flex justify-content-center"
                                                >
                                                    <IconEdit />Editar
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                }
            </div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Eliminar tarea</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>
                                Esta seguro de eliminar la tarea : <strong> {taskDelete.title} </strong>
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger btn-sm" id='dismiss' data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-primary btn-sm" onClick={() => handleDelete()}>Aceptar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Task