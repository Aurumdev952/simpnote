import { useState } from "react";
import { useEffect } from "react"
import { Link } from "react-router-dom"
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Home = () => {
    const [isauth, setAuth] = useState(false)
    useEffect(() => {
        const t = cookies.get("TOKEN")
        if (t) {
            setAuth(true)
        }
    }, [])
    const Logout = () => {
        const t = cookies.get("TOKEN")
        localStorage.removeItem(t.id)
        cookies.remove("TOKEN", { path: "/" });
        setAuth(false)
    }
    return (
    <div className="home">
       <header>
        <h1>Simp Note</h1>

        {isauth ? (<div>
            <div><Link to='/app/notes' className="auth-btn">Notes</Link></div>
            <div><button onClick={Logout} className="auth-btn">Log out</button></div>

        </div>) : 
        <div>
            <Link to='/auth/login' className="auth-btn">Login</Link>
            <Link to='/auth/signup' className="auth-btn">Sign up</Link>
        </div>
        }
        </header> 
        <main>
            <h1>Simp Note</h1>
            <h3>Taking notes made easy</h3>
            {!isauth && <Link to='/auth/signup' className="auth-btn">Get Started</Link>}
        </main>
      
    </div>)
}

export default Home