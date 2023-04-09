import axios from 'axios'
import Cookies from "universal-cookie";
const cookies = new Cookies();

const url = 'http://localhost:8080/'

function getToken() {
    const t = cookies.get("TOKEN")
    console.log(t.accessKey);
    if (t) {
        return t.accessKey
    } else {
        return null
    }
}


export function getAllNotes() {
    const token = getToken()
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return axios
    .get(url + 'getall')
    .then(res => res.data)
}
export async function createNote(data) {
    try {
        
        const token = getToken()
        axios.defaults.headers.common['Content-Type'] = `application/json`;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const r = await axios.post(url + 'create', data)
        return await r.data
        
    } catch (error) {
        return null
    }


    
}
export async function deleteNote(data) {
    try {
        const token = getToken()
        axios.defaults.headers.common['Content-Type'] = `application/json`;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const config = {
            data: data
        }
        const r = await axios.delete(url + 'delete', config)
        return await r.data
    } catch (error) {
        return 'not successful'
    }

    
}
export async function updateNote(data) {
    try {
        
        const token = getToken()
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const r = await axios.put(url + 'update', data)
        return await r.data
    } catch (error) {
        return null
    }

    
}



