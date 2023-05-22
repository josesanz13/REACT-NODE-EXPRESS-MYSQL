import { useState } from 'react';
import { useRef } from 'react';
import { Link } from 'react-router-dom'
import axiosClient from '../axios-client';
import { useStateContext } from '../context/ContextProvider';

function Signup() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
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

    const validationMessage = (message) => {
        switch (message) {
            case 'The password must contain at least one letter.':
                return "La contraseña debe contener mínimo una(1) letra"
            case 'The password must contain at least one symbol.':
                return "La contraseña debe contener mínimo una(1) caractér especial"
            default:
                return message
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value
        }

        axiosClient.post('/signup', payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                    setErrors(response.data.errors);
                }
            })
    }
    return (
        <div>
            <div className="container vh-100 animated fadeInDown">
                <div className="d-flex flex-column justify-content-center align-items-center h-100">
                    <div className="card shadow px-3 py-3 border-0 rounded signup-card-form">
                        <div className="card-header border-bottom-0">
                            <h3 className='text-center'>Nuevo Registro</h3>
                        </div>
                        <div className="card-body">
                            <form action="" className='' onSubmit={handleSubmit}>
                                <input ref={nameRef} type="text" name="name" id="name" className="form-control" placeholder='Nombre Completo...' onChange={handleChange} />
                                {errors && errors.name != "" ? <small className='text-danger danger-text'>{errors.name}</small> : ""}

                                <input ref={emailRef} type="email" name="email" id="email" className="form-control mt-3" placeholder='Correo electronico...' onChange={handleChange} />
                                {errors && errors.email != "" ? <small className='text-danger danger-text'>{errors.email}</small> : ""}

                                <input ref={passwordRef} type="password" name="password" id="password" className="form-control mt-3" placeholder='Contraseña...' onChange={handleChange} />
                                {errors && errors.password != "" ? <small className='text-danger danger-text'>{validationMessage(errors.password[0])}</small> : ""}

                                <input ref={passwordConfirmationRef} type="password" name="password" id="password" className="form-control mt-3" placeholder='Confirmar contraseña...' onChange={handleChange} />
                                {errors && errors.password != "" ? <small className='text-danger danger-text'>{validationMessage(errors.password[0])}</small> : ""}

                                <button type='submit' className="btn btn-primary btn-block w-100 mt-3">Registrarse</button>
                            </form>
                            <hr />
                            <div className='d-block text-center'>
                                <small className='text-muted text-center'>
                                    Ya tienes usuario ? accede <Link to="/login" className='text-decoration-none'>aquí</Link>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup