import { ArrowLeft } from 'lucide-react';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router';
import api from '../lib/axios';
import toast from 'react-hot-toast';

const CreatePage = () => {
  const navigate = useNavigate();
  const [title,setTitle] = useState("");
  const [content,setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if(!title.trim() || !content.trim()){
      toast.error("All fields are required");
      return;
    }

    setLoading(true)
    try {
      await api.post("/notes",{
        title,content,
      })
      toast.success("Note created Successfully!")
      navigate("/")
    } catch (error) {
      console.log("Error in creating Note",error);
      if(error.response.status === 429){
        toast.error("Slow Down! you are creating notes too fast",{
          duration: 4000,
          icon: "💀",
        });
      }
      else toast.error("Failed to create Note");
    }
    finally{
      setLoading(false);
    }
  };

  return (

    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <Link to = {"/"} className = "btn btn-ghost mb-6">
          <ArrowLeft className='size-5'/>
            back to Notes
          </Link>
          <div className='card bg-base-100'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'>
                Create New Note
              </h2>
              <form onSubmit={handleSubmit}>
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Title</span>
                  </label>
                    <input type = "text" placeholder='Note Title' className='input input-bordered' value={title} onChange={(e)=> setTitle(e.target.value)}></input>
                </div>
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Content</span>
                  </label>
                    <textarea placeholder='Write your note here...' className='textarea textarea-bordered h-32' value={content} onChange={(e)=> setContent(e.target.value)}/>
                </div>
                <div className='card-actions justify-end'>
                  <button type = "submit" className='btn btn-primary' disabled = {loading}>
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage