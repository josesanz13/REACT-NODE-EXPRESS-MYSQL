import { Link } from "react-router-dom";

export default function Aside() {
    return (
        <>
            <div className="logo">
            </div>
            <div className="section-content text-white">
                <small>Planificación</small>
            </div>
            <hr className='my-0 mb-2 border-light' />
            <Link to="/tasking">Tareas</Link>
        </>
    )
}
