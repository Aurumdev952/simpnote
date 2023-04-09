import { useState } from "react"
import { createNote } from "../../api/getData"

const CreateNewNote = ({ refresh, handleclose }) => {
    const [title, setTitle] = useState('')
    const createNew = async () => {
        try {
            if (title !== '') {
                const r = await createNote({
                    title: title,
                    text: ''
                })
                if (r) {
                    console.log('successively created new note');
                    refresh()
                    handleclose()
                } else {
                    throw new Error('Error creating new note')
                }
            } else {

            }
        } catch (error) {
            alert(error.message)
            
        }
    } 
    return (<div className="new-note">
        <h1>Create New Note</h1>
        <div>

        <input type="text"
        placeholder="Enter the title of the new note.."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        />
        </div>
        <button onClick={createNew}>Create</button>
    </div>)
}

export default CreateNewNote