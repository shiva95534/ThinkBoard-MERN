import React, { useState,useEffect } from 'react'
import Navbar from '../components/Navbar.jsx'
import NoteCard from '../components/NoteCard.jsx';
import RateLimitedUi from '../components/RateLimitedUi.jsx';
import api from '../lib/axios.js';
import toast from 'react-hot-toast';
import NotesNotFound from '../components/NotesNotFound.jsx';

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false); 
  const [notes,setNotes] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    const fetchNotes = async () => {
      try{
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data)
        setIsRateLimited(false)
      }
      catch(error){
        console.log("Error Fetching Notes",error)
        console.log("error : ",error);
        if(error.response?.status === 429){
          setIsRateLimited(true);
        }
        else{
           toast.error("Failed to load Notes")
        }
      }
      finally{
        setLoading(false);
      }
    };
    fetchNotes();
  },[]);

  return (
    <div className='min-h-screen'>
      <Navbar/>

      {isRateLimited && <RateLimitedUi/>}

      <div className="max-w-7xl mx-auto p-4 mt-6">
  {loading && (
    <div className="text-center text-primary py-10">
      Loading Notes...
    </div>
  )}

  {!loading && notes.length === 0 && !isRateLimited && <NotesNotFound/>}

  {notes.length > 0 && !isRateLimited && (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes
        .filter(note => note && note._id && note.title && note.content && note.createdAt)
        .map((note) => (
          <NoteCard key={note._id} note={note} setNotes = {setNotes}  />
        ))
      }
    </div>
  )}
</div>



    </div>
  );
};

export default HomePage