import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import axiosClient from "../axios-client";
import Loading from "../components/Loading";
import { useStateContext } from "../context/ContextProvider";
import { IconDeviceFloppy, IconArrowBackUp } from '@tabler/icons-react';

function UserForm() {
    const { id } = useParams();
    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();
    const { setNotification } = useStateContext();

    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient.get(`/users/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setUser(data)
                })
                .catch(() => {
                    setLoading(false);
                })
        }, [id])
    }

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })

        if (errors) {
            setErrors({
                ...errors,
                [e.target.name]: ""
            })
        }
    }

    const validationMessage = (message) => {
        switch (message) {
            case 'The password must contain at least one letter.':
                return "La contraseña debe contener mínimo una(1) letra"
            case 'The password must contain at least one symbol.':
                return "La contraseña debe contener mínimo una(1) caractér especial"
            case 'The email must be a valid email address.':
                return "La dirección de correo electronico no es valida"
            default:
                return message
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (user.id) {
            axiosClient.put(`/users/${user.id}`, user)
                .then(() => {
                    setNotification("Usuario editado exitosamente!");
                    navigate('/users');
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                })
        } else {
            axiosClient.post(`/users`, user)
                .then(() => {
                    setNotification("Usuario creado exitosamente!");
                    navigate('/users');
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                })

        }
    }

    return (
        <div>
            {user.id ? <h2 className="title-module">Editar Usuario</h2> : <h2 className="title-module">Crear Usuario</h2>}
            {
                loading && <div className="text-center py-5"><Loading /></div>
            }
            {
                !loading &&
                <div className="card shadow-sm animated fadeInDown">
                    <div className="card-body">
                        <form action="" onSubmit={handleSubmit}>
                            <input onChange={handleChange} value={user.name} type="text" name="name" id="name" placeholder="Nombre completo..." className="form-control" />
                            {errors && errors.name != "" ? <small className='text-danger danger-text'>{errors.name}</small> : ""}

                            <input onChange={handleChange} value={user.email} type="email" name="email" id="email" placeholder="Correo electronico..." className="form-control mt-3" />
                            {errors && errors.email != "" ? <small className='text-danger danger-text'>{errors.email}</small> : ""}

                            <input onChange={handleChange} type="password" name="password" id="password" placeholder="Contraseña..." className="form-control mt-3" />
                            {errors && errors.password != "" ? <small className='text-danger danger-text'>{validationMessage(errors.password[0])}</small> : ""}

                            <input onChange={handleChange} type="password" name="password_confirmation" id="password_confirmation" placeholder="Confirmar contraseña..." className="form-control mt-3" />
                            {errors && errors.password != "" ? <small className='text-danger danger-text'>{validationMessage(errors.password[0])}</small> : ""}

                            <div className="buttons d-flex justify-content-end mt-3">
                                <Link to="/users" className="btn btn-danger btn-sm d-flex align-items-center mx-2">
                                    <IconArrowBackUp />
                                    Cancelar
                                </Link>
                                <button type="submit" className="btn btn-primary btn-sm d-flex align-items-center">
                                    <IconDeviceFloppy />
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </div>
    )
}

export default UserForm