import './App.css'
import { useState } from 'react';
import { Login } from './componentes/Forms/Login';
import { Register } from './componentes/Forms/Register';
import { Dashboard } from './componentes/Dashboard/Dashboard';

function App() {

  const [user, setUser]        = useState([]);
  const [isGuest, setIsGuest ] = useState (false);

  return (
    <div className="App">
        {!isGuest //Login como pagina principal para usuarios con una cuenta
          ? (!user.length > 0 
              ? <Login setIsGuest={setIsGuest} setUser={setUser} />
              : <Dashboard user={user} setUser={setUser} />
            )
          : <Register setIsGuest={setIsGuest} />
       }
    </div>
  )
}

export default App
