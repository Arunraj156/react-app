import About from "./About";
import Header from "./Header";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import Nav from "./Nav";
import Missing from "./Missing";
import Footer from "./Footer";
import Home from "./Home";
import EditPost from "./EditPost";

import { Route, Routes, useNavigate } from "react-router-dom";
import PostLayout from "./PostLayout";
import { useEffect, useState } from "react";
import {format} from "date-fns";
import api from "./api/posts"
import {DataProvider} from "./context/DataContext";


function App() {

  const [posts, setPosts] = useState([]);
    
  



  const [searchResult, setsearchResult] = useState([])

  const [search, setSearch] = useState('')
  const [postTitle, setpostTitle] = useState('')
  const [postBody, setpostBody] = useState('')
  const[editBody, setEditBody] = useState('')
  const [editTitle, setEditTitle] = useState('')
  const [ box, setBox] = useState("Subscribe")

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts =  async () => {
      try{
      const response = await api.get('/posts');
      setPosts(response.data)
      }catch(err){
      
        if(err.response){
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        }else{
          console.log(`Error: ${err.message}`)
        }
      }
    }

    fetchPosts();
  }, [])

  useEffect(() => {
  const filteredresults = posts.filter((post) =>
  ((post.body).toLowerCase()).includes(search.toLowerCase()) || ((post.title).toLowerCase()).includes(search.toLowerCase()));
  
  
  setsearchResult(filteredresults.reverse());
  
}, [posts, search]);

  const handleSubmit = async () => {
    
    const id = posts.length ? posts[posts.length-1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = {id, title: postTitle, datetime, body: postBody};
    try{
    const response = await api.post('/posts', newPost)
    const allPosts = [...posts, response.data]
    setPosts(allPosts);
    
    setpostTitle('');
    setpostBody('');
    }catch(err){
      
      if(err.response){
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      }else{
        console.log(`Error: ${err.message}`)
      }
    }

 

  }

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp'); 
    const updatedPost = {id, title:editTitle, datetime, body:editBody};
    try{
      const response = await api.put(`/posts/${id}`, updatedPost)
      setPosts(posts.map(post => post.id === id? {...response.data} : post));
      setEditTitle('');
      setEditBody('');
      navigate('/')
    }catch(err){
      console.log(`Error:${err.message}`)
    }
     
  }

  const handleDelete = async (id) => {
    
    try{
       await api.delete(`/posts/${id}`)
       const postDelete = posts.filter((post)=>post.id !== id);
      setPosts(postDelete);
      navigate('/');
    }catch(err){
      console.log(`Error:${err.message}`);
    }
  }

  const handlechange = () => {
    if(box == "Subscribe"){
    setBox("Subscribed")
    }
    else{
      setBox("Subscribe")
    }
  }


  return (
    <div className="App">
    
              <Header title={"Social web page"}/>
              <Nav
              search = {search}
              setSearch = {setSearch}
              
              
              
              />
              <Routes>
                    <Route  path="/" element={<Home
                    posts = {searchResult}
                    />}/>
                  
                    <Route path="post"> 
                          <Route index element={<NewPost
                            postTitle = {postTitle}
                            setpostTitle = {setpostTitle}
                            postBody = {postBody}
                            setpostBody = {setpostBody}
                            handleSubmit = {handleSubmit}
                            
                            />} />
                    
                            <Route path=":id" element={<PostPage 
                            posts= {posts}
                            handleDelete={handleDelete}
                            box = {box}
                            handlechange={handlechange}
                            />} />
                          
                      </Route>   
                          <Route path="/edit/:id" element={<EditPost 
                            posts={posts}
                            handleEdit={handleEdit}
                            editBody={editBody}
                            setEditBody={setEditBody}
                            editTitle={editTitle}
                            setEditTitle= {setEditTitle}/>}/>
                            
                          
                            
                    

                            
                    
                    <Route path="about" element = {<About/>} />
                    <Route path="*" element={<Missing/>} />
                    
              </Routes>
              <Footer/> 
      
    </div>
  );
}

export default App;
