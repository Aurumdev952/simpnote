import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { FaBold, FaItalic, FaStrikethrough } from 'react-icons/fa'
import { BsCodeSlash, BsFileCode, BsTextParagraph } from 'react-icons/bs'
import { MdFormatListBulleted, MdHorizontalRule } from 'react-icons/md'
import { GoListOrdered } from 'react-icons/go'
import { TbBlockquote } from 'react-icons/tb'
import { BiUndo, BiRedo, BiUnderline, BiSave } from 'react-icons/bi'
import Document from '@tiptap/extension-document'
import Placeholder from '@tiptap/extension-placeholder'
import { useEffect, useState } from 'react'
import { updateNote } from '../../api/getData'


const MenuBar = ({ editor }) => {
    if (!editor) {
      return null
    }
    return (
      <div className='menu-bar'>
        <button
        
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
        <FaBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
        <FaItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleStrike()
              .run()
          }
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          <FaStrikethrough />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleCode()
              .run()
          }
          className={editor.isActive('code') ? 'is-active' : ''}
        >
            <BsCodeSlash />
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? 'is-active' : ''}
        >
          <BsTextParagraph />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
        >
          h1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
        >
          h2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
        >
          h3
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
        >
          h4
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
        >
          h5
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
        >
          h6
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          <MdFormatListBulleted />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
        >
          <GoListOrdered />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active' : ''}
        >
          <BsFileCode />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'is-active' : ''}
        >
          <TbBlockquote />
        </button>
        <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <MdHorizontalRule />
        </button>
        <button onClick={() => editor.chain().focus().underline().run()}>
          <BiUnderline />
        </button>
        <button onClick={() => editor.chain().focus().setHardBreak().run()}>
          hard break
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .undo()
              .run()
          }
        >
        <BiUndo />
        </button>
        <button

          onClick={() => editor.chain().focus().redo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .redo()
              .run()
          }
        >
          <BiRedo />
        </button>
      </div>
    )
  }


const CustomDocument = Document.extend({
content: 'heading block*',
})  
const Editor = ({ note, refreshFunc }) => {

    const [text, setText] = useState('')

    const saveData = async () => {
      try {
        
        if (text !== '') {
          const r = await updateNote({
            _id: note._id,
            text: text,
          })
          if (r) {
            refreshFunc();
          } else {
            throw new Error('Error updating note')
          }
        }
      } catch (error) {
        alert(error.message)
      }

    }

    const editor = useEditor({
      extensions: [
        CustomDocument,
        StarterKit.configure({
            document: false,
        }),
        Placeholder.configure({
            placeholder: ({ node }) => {
              if (node.type.name === 'heading') {
                return 'Add a heading..'
              }
    
              return 'Can you add some further context?'
            },
          }),
      ],
      content: note.text,
      

    })
    if (editor) {
        editor.on('update', ({ editor }) => {
          setText(editor.getHTML())
        })
        // editor.on('focus', ({ editor }) => {
    
        //     console.log('focus');
        // })
        // editor.on('blur', ({ editor }) => {
        //     // saveData()
        //   })
       
        // editor.commands.insertContent(note)
    }
    useEffect(() => {
      if (editor) {
        editor.commands.setContent(note.text)
      }
    }, [note]);

    return (
      <div className='editor-wrapper'>
        <div className='btn-save-wrapper'>
            <h3><b>Title: </b>{note.title}</h3>
            <h4><b>Date: </b>{note.createdAt}</h4>
            <button
            onClick={saveData}
            ><BiSave /><span>Save</span></button>
        </div>
        <MenuBar editor={editor} />
        <EditorContent autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" editor={editor} />
      </div>
    )
  }



export default Editor