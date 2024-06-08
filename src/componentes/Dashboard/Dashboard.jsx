import "./dashboard.css";

export function Dashboard ({ user, setUser }){

    const handleLogout = () =>{
        setUser([]);
    }

    return (
        <div className="dashboard">
            <h1>Bienvenido</h1>
            <h2>{user}</h2>
            <button onClick={handleLogout} className="submit">Cerrar Sesión</button>
        </div>
    )
}