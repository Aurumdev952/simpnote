import { motion as m} from "framer-motion"
import BackDrop from "../backdrop"
import { ImCross } from 'react-icons/im'
import CreateNewNote from "../other/CreateNewNote";
const dropIn = {
    hidden: {
        y: "-100vh"
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500
        }
    },
    exit: {
        y: "100vh",
        opacity: 0,
    },
}

const Modal = ({ handleClose, refresh }) => {
    return (
        <BackDrop
        onClick={handleClose}>
            <m.div
            drag
            onClick={(e) => e.stopPropagation()}
            className="modal"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            >
                <button
                className="closeButton add-btn"
                onClick={handleClose}
                ><ImCross /></button>
                <CreateNewNote handleclose={handleClose} refresh={refresh}/>

            </m.div>
        </BackDrop>
    )
};

export default Modal