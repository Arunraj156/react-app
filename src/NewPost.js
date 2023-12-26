

const NewPost = ({postTitle, setpostTitle, postBody, setpostBody, handleSubmit}) => {
  return (
  <main className="NewPost">
    <h2>New Post</h2>
    <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="postTitle">Title:</label>
      <input 
       id="postTitle"
       type="text"
       required
       value={postTitle}
       onChange={(e)=>setpostTitle(e.target.value)}

      />
      <br/>
      <label htmlFor="postBody">Post:</label>
      <textarea 
       id="postBody"
       type="text"
       required
       value={postBody}
       onChange={(e)=>setpostBody(e.target.value)}

      />
    <br/>
      <button type="Submit" onClick={() => handleSubmit()} >
        Submit
      </button>

    </form>

  </main>
  )
}

export default NewPost