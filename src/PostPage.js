import { Link, useParams } from "react-router-dom";


const PostPage = ({posts, handleDelete, box, handlechange}) => {

  const {id} = useParams();
  const post = posts.find(post => (post.id).toString() === id);
  
  return (
    <main className="PostPage">
        <article className="post">
          {post &&
           <>
              <h2>{post.title}</h2>
              <p className="postDate">{post.datetime}</p>
              <p className="postBody">{post.body}</p>
              <Link to={`/edit/${post.id}`}>
                <button
               className="editButton">
                edit Post
              </button>
              </Link>
              <button className="deleteButton" onClick={()=>handleDelete(post.id)}>
                Delete Post
              </button>
              <button className="SubButton" onClick={() => handlechange()}>
                {box}
              </button>
              
           </>


          }
          {!post &&
            <>
               <h2>post not found</h2>
               <p>well, thats disappointing.</p>
              
            </>

          }
        </article>



  </main>
  )
}

export default PostPage