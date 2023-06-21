import { Link, NavLink, Outlet } from "react-router-dom"
import { Notes, LayoutGrid, UserCircle } from 'tabler-icons-react'
import { BiHomeAlt } from 'react-icons/bi'
import { Suspense, useEffect, useState } from "react"
import Cookies from "universal-cookie";
const cookies = new Cookies();

const MainApp = () => {
    const [isauth, setAuth] = useState(false)
    useEffect(() => {
        const t = cookies.get("TOKEN")
        if (t) {
            setAuth(true)
        } else {
            window.location.href = '/'
        }
    }, [])
    if (!isauth) {
        return null
    }
    return (
        <div className="app">
            <nav>
                <Link to='/' id="home"><BiHomeAlt /></Link>

                <NavLink className={({ isActive }) => {return isActive ? 'nav-active' : 'nav-inactive'}} to='notes'><Notes 
                size='30px'/></NavLink>


                <NavLink className={({ isActive }) => {return isActive ? 'nav-active' : 'nav-inactive'}} to='quickview'><LayoutGrid 
                size='30px'/></NavLink>

                {/* <NavLink to='profile' className={({ isActive }) => {return isActive ? 'nav-active' : 'nav-inactive'}} ><UserCircle 
                size='30px'/></NavLink> */}
            </nav>
            <main>
                <Suspense>
                    <Outlet />
                </Suspense>
            </main>
        </div>
    )
}

export default MainApp