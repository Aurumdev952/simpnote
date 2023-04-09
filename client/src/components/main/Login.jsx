import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Lock, Mail } from 'tabler-icons-react'
import { AuthLogin } from '../../api/auth'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    
    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }
    
    const handleLogin = async (email, password) => {
        if (isValidEmail(email) && password) {
            setError(false)
            await AuthLogin({
                email: email,
                password: password
            })
        } else {
            setError(true)
        }
    }

    return (<form onSubmit={(e) => {
        e.preventDefault()
        handleLogin(email, password)
    }} className="signup flex">
        <div className="content flex">
            <h2 className='title'>Welcome Back!</h2>
            <div className="inputs flex" >
                <div className={error ? 'email input l input-error' : 'email input l '}>
                    <Mail color='#0a1c30' />

                <input type="email"
                spellCheck='false'
                         onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                />
                </div>
                <div className='password input'>
                    <Lock color='#0a1c30' />
                <input type="password"
                value={password}
                spellCheck='false'
                onChange={(e) => setPassword(e.target.value)}
                />
                </div>
            </div>
            <div className='btn-container l'>
                <button 
                className='button flex'
                type='submit'
                // onClick={() => handleLogin(email, password)}
                >Login</button>
            </div>
             <Link className='link' to='/auth/signup'>Do not have an account</Link>
        </div>
    </form>)
}

export default Login