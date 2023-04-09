import { useState } from 'react'
import { Link } from 'react-router-dom'
import { User, Lock, Mail } from 'tabler-icons-react'
import { AuthRegister } from '../../api/auth'
const SignUp = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState(false)
    
    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }
    
    const handleSignUp = async (email, password, username) => {
        if (isValidEmail(email) && password && username) {
            setError(false)
            // console.log(`${email} ${password} ${username}`);
            await AuthRegister({
                username: username,
                email: email,
                password: password
            })
        } else {
            setError(true)
        }
    }

    return (<form className="signup flex" onSubmit={(e) => {
        e.preventDefault()
        handleSignUp(email, password, username)
    }}>
        <div className="content flex">
            <h2 className='title'>Sign Up</h2>
            <div className="inputs flex" >
                <div className="text input ">
                    <User color='#0a1c30'/>
                    <input type="text"
                    value={username}
                    spellCheck='false'
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className={error ? 'email input input-error' : 'email input '}>
                    <Mail color='#0a1c30' />

                <input type="email"
                value={email}
                spellCheck='false'
                onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="password input">
                    <Lock color='#0a1c30' />
                <input type="password"
                value={password} 
                spellCheck='false'
                onChange={(e) => setPassword(e.target.value)}/>
                </div>
            </div>
            <div className='btn-container'>
                <button className='button flex'
                // onClick={() => handleSignUp(email, password, username)}
                type='submit'
                >Sign Up</button>
            </div>
             <Link className='link' to='/auth/login'>Already have an account</Link>
        </div>
    </form>)
}

export default SignUp