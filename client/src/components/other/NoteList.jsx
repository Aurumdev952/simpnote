import { Plus, Search } from "tabler-icons-react"
import NotePrev from "./NotePrev"
import Modal from "../modal"
import { motion as m, AnimatePresence } from "framer-motion"
import { useState, forwardRef, useImperativeHandle, useEffect } from "react"
import { TailSpin } from 'react-loader-spinner'
import {getAllNotes } from "../../api/getData"
import { useQuery } from '@tanstack/react-query'
import { CiFaceFrown } from 'react-icons/ci'
import { searchFunc } from "./Test"
// const cacheKey = (Math.random() + 1).toString(36).substring(7)

const NoteList = forwardRef(({ setnote, deselectEditor }, ref) => {
    const [modalOpen, setModalOpen ] = useState(false);
    const close = () => setModalOpen(false);
    const open = () => setModalOpen(true);
    const [active_id, setActiveId] = useState(null); 
    const [search, setSearch] = useState('')
    const [datas, setDatas] = useState([])
    const [issearching, setIsSearching] = useState(false)
    const [list, setList] = useState([])
    
    
    const {
        status,
        refetch,
        data: data,
    } = useQuery({
        queryKey: ['note-list'],
        queryFn: () => {return getAllNotes()},
        // onSuccess: () =>)
    })

    useEffect(() => {
        if (status === 'success') {
            console.log(data);
            console.log(status);
            setList(() => {return data?.map((item) => {
                return item.title
            })})
        }
    }, [data])
    useImperativeHandle(ref, () => ({
        refresh() {
            refetch()
        }
    }))
    useEffect(() => {
        if (status === 'success') {
            setList(() => {return data?.map((item) => {
                return item.title
            })})
            if (issearching) {
                const res = searchFunc(search, list)
                setDatas(res.map((item) => {
                    for (const note of data) {
                        if (note.title === item) {
                            return note
                        }
                    }
                }))
           } 
        }
    }, [search, issearching])


    if (status === "loading") {
        return (<div className="loading l">
            <TailSpin
                height="50"
                width="50"
                color="#666e77"
                ariaLabel="tail-spin-loading"
                radius="2"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
/>
        <h1>Loading...</h1>
        </div>)
    }


    if (status === 'error') {
        return(<div className="error-msg">
            <span><CiFaceFrown /></span>
            <h1>Error</h1>
        <h4>Error has occured, check your Network and try again.</h4></div>)
    }
    const Updatelist = () => {
        refetch()
    }
    if (status === 'success') {
        return (
            <div className="note-list">
                <div className="note-search">
                    <div>
                        <button>
                            <Search />
                        </button>
                        <input type="text"
                        placeholder="Search.."
                        spellCheck='false'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onFocus={() => setIsSearching(true)}
                        onBlur={() => setIsSearching(false)}
                        />
                    </div>
                </div>
                <p className="note-main-title">All Notes</p>
                <div className="notelist">
                    {issearching ? 
                    (<>
                    {datas?.length > 0
                    ? (datas.map((note, id) => (
                        <NotePrev key={id} data={note}
                        refetch={Updatelist}
                        setnote={setnote}
                        setactive={() => setActiveId(id)} 
                        isActive={active_id == id ? true : false}
                        deselect={deselectEditor}
                        />
                    ))) : (
                        <>No results found</>
                    ) }</>) 
                    : 
                    (<>
                     {data?.length > 0
                    ? (data.map((note, id) => (
                        <NotePrev key={id} data={note}
                        refetch={Updatelist}
                        setnote={setnote}
                        setactive={() => setActiveId(id)} 
                        isActive={active_id == id ? true : false}
                        deselect={deselectEditor}
                        />
                    ))) : (
                        <></>
                    ) }
                    
                    </>)}
                   
                </div>
                <m.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="add-btn"
                onClick={()=> (modalOpen ? close() : open())}
                >
                    <Plus />
                    
                </m.button>
                <AnimatePresence
                initial={false}
                mode="wait"
                >
                {modalOpen && <Modal modalOpen={modalOpen} refresh={refetch} handleClose={close}/>}
                </AnimatePresence>
     </div>)
    }
  
})

export default NoteList