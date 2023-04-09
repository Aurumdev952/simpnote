import { useState } from 'react';
import { MdDelete } from 'react-icons/md'
import ModalDel from '../modalDel';
import { motion as m, AnimatePresence } from "framer-motion"

const NotePrev = ({ data, setnote, isActive, setactive, refetch, deselect }) => {
    const [modalOpen, setModalOpen ] = useState(false);
    const close = () => setModalOpen(false);
    const open = () => setModalOpen(true);
    const date = new Date(data.createdAt)
    data.createdAt = date.getFullYear() +'/' + (date.getMonth()+1) + '/'+date.getDate()
    return (
    <div 
    className={isActive ? 'note-prev prev-active' : 'note-prev'}
    onClick={() => {
        setnote(data)
        setactive()
    }}
   >
        <div className="cont">
            <h3>{data.title}</h3>
            <p>{data.createdAt}</p>
        </div>
        <div className="icon-del">
            <m.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={()=> (modalOpen ? close() : open())}
        >
          <MdDelete />
            
        </m.button>
        <AnimatePresence
        initial={false}
        mode="wait"
        >
        {modalOpen && <ModalDel modalOpen={modalOpen} isactive={isActive} deselect={deselect} data={() => {return data}} handleClose={close} refetch={refetch}/>}
        </AnimatePresence>
        </div>
    </div>)
}

export default NotePrev