import { useState, useRef } from "react"
import Note from "../other/Note"
import NoteList from "../other/NoteList"
import Dummy from "../other/Dummy"



const AllNotes = () => {
    const chidComp = useRef(null)
    function refresh() {
        chidComp.current?.refresh()
    }
    const [note, setNote] = useState(null)
    return (
        <div className="all-notes">
            <NoteList 
            ref={chidComp}
            setnote={(note) => {
                setNote(null)
                setNote(note)  
            }
        } 
            deselectEditor={() => setNote(null)}
            />
            {note && <Note  
            refreshFunc={refresh}
            note={note}/>}
            <Dummy refresh={refresh}/>
        </div>)
}

export default AllNotes