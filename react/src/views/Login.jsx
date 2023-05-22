import { useRef, useState } from 'react';
import { Link } from 'react-router-dom'
import axiosClient from '../axios-client';
import { useStateContext } from '../context/ContextProvider';

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState(null);
    const { setUser, setToken } = useStateContext();

    const handleChange = (e) => {
        if (errors) {
            setErrors({
                ...errors,
                [e.target.name]: ""
            })
        }
    }

    const handleSubmit = (ev) => {
        ev.preventDefault();

        setErrors({
            email: "",
            password: "",
            general: ""
        })

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }

        axiosClient.post('/login', payload)
            .then(({ data }) => {
                setUser(data.data.user);
                setToken(data.data.token);
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 403) {
                    if (response.data.errors) {
                        let erro = {};
                        response.data.errors.map(error => {
                            erro[error.path] = error.msg;
                        })
                        setErrors(erro)
                    }
                }
            })
    }

    return (
        <div>
            <div className="container vh-100 animated fadeInDown">
                <div className="d-flex flex-column justify-content-center align-items-center h-100">
                    <div className="card shadow px-3 py-3 border-0 rounded login-card-form">
                        <div className="card-header border-bottom-0">
                            <h3 className='text-center'>Registro</h3>
                        </div>
                        <div className="card-body">
                            <form action="" onSubmit={handleSubmit}>
                                <input ref={emailRef} type="text" name="email" id="email" className="form-control " placeholder='Correo Electronico...' onChange={handleChange} autoFocus />
                                {errors && 'email' in errors && errors.email != "" ? <small className='text-danger danger-text'>{errors.email}</small> : ""}

                                <input ref={passwordRef} type="password" name="password" id="password" className="form-control mt-3" placeholder='Contraseña...' onChange={handleChange} />
                                {errors && 'password' in errors && errors.password != "" ? <small className='text-danger danger-text'>{errors.password}</small> : ""}

                                {errors && 'general' in errors && errors.general != "" ? <small className='text-danger danger-text'>{errors.general}</small> : ""}
                                <button type='submit' className="btn btn-primary btn-block w-100 mt-3">Ingresar</button>
                            </form>
                            <hr />
                            <div className='d-block text-center'>
                                <small className='text-muted text-center'>
                                    Si aún no te has registrado puede hacerlo <Link to="/signup" className='text-decoration-none'>Aquí</Link>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login