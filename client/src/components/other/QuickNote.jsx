import { useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { v4 as uuid } from "uuid";



const QuickNote = ({ data, add, update, deleteFunc}) => {


    const newQn = (data) ? false : true
    const textdat = (data) ? data.text : '';
    let iddat = (data) ? data.id : uuid();
    const [text, setText] = useState(textdat)
    return (<div className="quick-note">
        <div className="quick-text">
            <textarea type="text" 
            placeholder='Type....'
            value={text}
            onChange={(e) => setText(e.target.value)}
            />
        </div>
        <div className="quick-controls">
            <button id='save-btn'
            onClick={(e) => {
                if (newQn && text !== '') {
                    add({
                        id: iddat,
                        text: text
                    })
                    setText('')
                    iddat = uuid();

                } else {
                    update(iddat, text)
                }
            }}
            >save</button>
          
            <button id='delete'
            onClick={(e) => deleteFunc(iddat)}
            ><MdDelete /></button>
        </div>
    </div>)
}


export default QuickNote