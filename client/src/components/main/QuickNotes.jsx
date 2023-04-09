import { useState } from "react"
import QuickNote from "../other/QuickNote"
import { useEffect } from "react"
import Cookies from "universal-cookie";
const cookies = new Cookies();
// import localStorage from 'local-storage'




const QuickNotes = () => {
    const t = cookies.get("TOKEN")
    const [quicknotes, setQuicknotes] = useState(() => {return JSON.parse(localStorage.getItem(t.id)) || []})
    useEffect(() => {
        localStorage.setItem(t.id, JSON.stringify(quicknotes));
    }, [quicknotes])


    

    function addQn(qn) {
        setQuicknotes([...quicknotes, qn])
        
    }

    function updateQn(id, text) {
        const newlist = quicknotes.map(qn => {
            if (qn.id === id) {
                qn.text = text
                return qn
            } else {
                return qn
            }
        })

        setQuicknotes(newlist)
    }

    function deleteQn(id){
        setQuicknotes(quicknotes.filter(qn => qn.id !== id))
 
    }
    

    return (<div
    className="quick-notes"
    >
        <div className="quick-header">
            <h1>Quick Notes</h1>
        </div>
        <div className="quick-note-grid">
            {quicknotes?.length > 0 ?
            (<>{quicknotes.map((qn, key) => (<><QuickNote 
            add={addQn}
            update={updateQn}
            deleteFunc={deleteQn}
            data={qn}
            key={qn.id}
            /></>
           ))}
           <QuickNote 
            add={addQn}
            update={updateQn}
            deleteFunc={deleteQn}
            data={null}

                
            />
           </>
            ) : (<><QuickNote
                add={addQn}
                update={updateQn}
                deleteFunc={deleteQn}
                data={null}
                /></>)
        }
            
        </div>
        
    </div>)
}

export default QuickNotes