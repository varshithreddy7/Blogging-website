import axios from "axios"
import { Appbar } from "../components/Appbar"
import { BACKEND_URL } from "../config"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"

export const Publish =()=>{
  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const navigate = useNavigate();
  return(
    <div>
      <Appbar/>
      <div className="flex justify-center w-full">       
        <div className="max-w-screen-md w-full pt-10">
          <input onChange={(e)=>{
            setTitle(e.target.value);
          }}
           type="text" id="large-input" className="w-full block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Title"
          />
          
         <TextEditor onChange ={(e)=>{
            setDescription(e.target.value)
         }}/>
         <button onClick={ async()=>{
             const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
              title,
              content : description
              },{
                headers:{
                  Authorization:localStorage.getItem("token")
                }
              });
              navigate(`/blog/${response.data.id}`)
            }} type="submit" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
              Publish post 
        </button>
        </div>
      </div>
    </div>
  )
}
function TextEditor({ onChange }:{ onChange:(e:ChangeEvent<HTMLTextAreaElement>)=>void}){
  return(
  <div className="mt-2">
    <div className="w-full mb-4">
      <div className="flex items-center justify-between border">   
        <div className="bg-white rounded-b-lg w-full">
          <label className="sr-only">Publish post</label>
          <textarea onChange={ onChange } id="editor" rows={8} className="focus:outline-none pl-2 block w-full text-sm text-gray-800 bg-white border-0" placeholder="Write an article..." required />
        </div>
      </div>


    </div>
  </div>
  )
}