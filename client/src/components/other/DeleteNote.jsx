import { deleteNote } from "../../api/getData"
const DeleteNote = ({ handleclose, data, refetch, deselect, isactive }) => {
    const deleteData = async () => {
        try {
            const r = await deleteNote(data())
            if (r === 'not successful' || r === null) {
                throw new Error(`Could not delete`)
            } else {
                console.log('successfully deleted')
                refetch()
                if (isactive) {
                    deselect()
                }
                handleclose()
            }
        } catch (error) {
            alert(error.message)
        }
    }
    return (<div className="del-note">
  
        <h1>Are you sure?</h1>
        <p>this note will be deleted Permanently</p>
    
        <div>
            <button onClick={handleclose}>Cancel</button>
            <button id="del" onClick={deleteData}>Delete</button>
        </div>
    </div>)
}

export default DeleteNote