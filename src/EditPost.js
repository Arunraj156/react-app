import React, { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import DataContext from './context/DataContext'

const EditPost = ({posts, handleEdit, setEditBody,editTitle, setEditTitle }) => {
  const {editBody} = useContext(DataContext)
  const {id} = useParams()
  const post = posts.find(post => (post.id).toString() === id)

  
   useEffect(()=>{
    if(post){
      setEditTitle(post.title);
      setEditBody(post.body);
    }
   }, [post, setEditBody, setEditTitle])
  


  return (
    <main className="NewPost">
      {post && 
      <>
      <h2>Edit Post</h2>
      <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="postTitle">Title:</label>
          <input 
            id='postTitle'
            required
            type='text'
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <br/>
          <label htmlFor='postBody'>Post:</label>
          <textarea 
            id='postBody'
            required
            type='text'
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
          />
          <button type='submit' onClick={()=> handleEdit(post.id)}>
            Submit
          </button>
      </form>
      </>
      }
      {!post && 
      <>
      <h2>Post Not Found</h2>
      <p>well, thats disappointing</p>
      <p>
        <Link to ='/'>visit our homepage</Link>
      </p>
      </>

      }
    </main>
  )
}

export default EditPost