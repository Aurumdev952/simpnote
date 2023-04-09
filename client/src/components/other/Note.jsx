import Editor from "./Editor"

const Note = ({ note, refreshFunc }) => {
    return (<div className="note-main">
        <Editor note={note} refreshFunc={refreshFunc} />
    </div>)
}
export default Note