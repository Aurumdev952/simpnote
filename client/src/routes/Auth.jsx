import { Suspense } from 'react'
import { Link, Outlet } from 'react-router-dom'
const Auth = () => {
    return (
    <div className="auth">
        <Link to="/" className="home_link">Simp Note</Link>
        <Suspense>
            <Outlet />
        </Suspense>
    </div>)
}

export default Auth