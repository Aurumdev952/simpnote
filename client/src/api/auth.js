import axios from 'axios'
import Cookies from "universal-cookie";
const cookies = new Cookies();


const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE'
}

export async function AuthLogin(data) {
    try {
        const r = await axios.post('http://localhost:8080/login', data, headers)
        if (r.status === 200) {
            const rdata = await r.data;
            console.log('data', rdata);
            cookies.remove("TOKEN", { path: "/" });
            cookies.set('TOKEN', rdata, {
                path: '/'
            })
            // alert('Logged in successfully')
            window.location.href = "/app/notes"
        } else {
            throw new Error('error occured' + r.status)
        }

    } catch(e) {
        console.log(e.message);
        alert('Error: ' + e.message)
    }
}
export async function AuthRegister(data) {
    try {
        const r = await axios.post('http://localhost:8080/register', data, headers)
        if (r.status === 200) {
            const rdata = await r.data
            cookies.remove("TOKEN", { path: "/" });;
            cookies.set('TOKEN', rdata, {
                path: '/'
            })
            window.location.href = "/app/notes"
        } else {
            throw new Error('Error: ' + r.status)
        }
    } catch(e) {
        console.log(e.message);
        alert('Error: ' + e.message)
    }
}
