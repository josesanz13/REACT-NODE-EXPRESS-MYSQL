import { IconArrowBack, IconDeviceFloppy } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';
import axiosClient from "../axios-client";
import Loading from '../components/Loading';

function TaskForm() {
    const { id } = useParams();
    const { setNotification } = useStateContext();
    const [task, setTask] = useState({
        id: "",
        title: "",
        description: "",
        status: 1
    })
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();

    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient.get(`/task/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setTask(data.data[0])
                })
                .catch(() => {
                    setLoading(true);
                    setNotification("¡Error! conexión perdida", "danger")
                })
        }, [id])
    }

    const handleChange = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        })

        if (errors) {
            setErrors({
                ...errors,
                [e.target.name]: ""
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (task.id) {
            axiosClient.put(`/task/update/${task.id}`, task)
                .then(() => {
                    setNotification("Tarea actualizada exitosamente!");
                    navigate('/tasking');
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 403) {
                        setErrors(response.data.errors);
                    }

                    if (response && response.status != 403) {
                        console.log(response.data.errors);
                        setNotification("¡Error! conexión perdida", "danger")
                    }
                })
        } else {
            axiosClient.post(`/task/create`, task)
                .then(() => {
                    setNotification("Tarea creada exitosamente!");
                    navigate('/tasking');
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 403) {
                        setErrors(response.data.errors);
                    }
                    if (response && response.status != 403) {
                        setErrors(response.data.errors);
                    }
                })

        }
    }

    return (
        <>
            {task.id ? <h2 className="title-module">Editar Tarea</h2> : <h2 className="title-module">Crear Tarea</h2>}
            {
                loading && <div className="text-center py-5"><Loading /></div>
            }
            {
                !loading &&
                <div className="card shadow-sm animated fadeInDown">
                    <div className="card-body">
                        <form action="" onSubmit={handleSubmit}>
                            <input onChange={handleChange} value={task.title} type="text" name="title" className="form-control mb-3" placeholder='Tarea...' required />
                            <textarea onChange={handleChange} value={task.description} name="description" rows="3" placeholder='Descripción...' className='form-control' required></textarea>
                            <div className="d-flex justify-content-end align-items-center mt-3">
                                <div className="btn-group btn-group-sm" role="group" aria-label="Small button group">
                                    <Link to="/tasking" className="btn btn-danger btn-sm d-flex align-items-center">
                                        <IconArrowBack />Cancelar
                                    </Link>
                                    <button type='submit' className='btn btn-sm btn-primary d-flex align-items-center'>
                                        <IconDeviceFloppy />{task.id ? "Actualizar" : "Guardar"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </>
    )
}

export default TaskForm
