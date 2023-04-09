import { motion as m} from "framer-motion"
import BackDrop from "../backdrop"
import { ImCross } from 'react-icons/im'
import CreateNewNote from "../other/CreateNewNote";
import DeleteNote from "../other/DeleteNote";
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

const ModalDel = ({ handleClose, data, refetch, deselect, isactive }) => {
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
                <DeleteNote data={data} deselect={deselect} isactive={isactive} handleclose={handleClose} refetch={refetch} />

            </m.div>
        </BackDrop>
    )
};

export default ModalDel