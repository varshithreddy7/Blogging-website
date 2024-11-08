import { SigninInput } from "@varshithreddy355/medium-common"
import { ChangeEvent, ChangeEventHandler, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SignupInput } from "@varshithreddy355/medium-common"
import { BACKEND_URL } from "../config"
import axios from "axios"

export const Auth = ({type}: {type: "signup" | "signin"}) =>{
  const navigate = useNavigate();
  const [postInputs,setPostInputs] = useState<SignupInput>({
    name:"",
    email:"",
    password:""
  })
  async function sendRequest(){
    try{
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type ==="signup"?"signup":"signin"}`,
        postInputs
      )
      const jwt = response.data;
      localStorage.setItem('token',jwt);
      navigate("/blogs")
    }catch(e){

    }
  }
  return<div className="h-screen flex justify-center flex-col">
    <div className="flex justify-center">
      <div>
        <div className="px-10">
          <div className="max-w-md  text-4xl font-bold	">
            Create an account 
          </div>
          <div className="text-gray-500 text-center ">
            {type ==="signin"?"Don't have an account?":"Already have an account?" }
            <Link className="pl-2 underline" to={type==="signin"?"/signup":"/signin"}>
              {type==="signin"?"Sign up":"Sign in"}
            </Link>
          </div>
        </div>
        <div>
          {type==="signup" ? <LabelledInput label="Full Name" placeholder="Full Name"  onChange={(e)=>{
            setPostInputs({
              ...postInputs,// It overrides the existing things present in the input boxes so every time we can have new inputs
              name:e.target.value
            }) 
          }}/>:null}
          <LabelledInput label="Email" placeholder="varshith@gmail.com"  onChange={(e)=>{
            setPostInputs({
              ...postInputs,// It overrides the existing things present in the input boxes so every time we can have new inputs
              email:e.target.value
            }) 
          }}/>
          <LabelledInput label="Password" type={"password"} placeholder="Password"  onChange={(e)=>{
            setPostInputs({
              ...postInputs,// It overrides the existing things present in the input boxes so every time we can have new inputs
              password:e.target.value
            }) 
          }}/>
          <button onClick={sendRequest} type="button"  className="mt-5 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            {type==="signup"?"Sign up":"Sign in"}
          </button>

        </div>
      </div>
    </div>
  </div>
}

interface LabelledInputType{
  label:string,
  placeholder : string,
  onChange : (e: ChangeEvent<HTMLInputElement>)=>void,
  type?:string
}

function LabelledInput({ label,placeholder,onChange,type }:LabelledInputType){
  return<div>
  <label  className="block mb-2 text-sm font-semibold pt-2">{label}</label>
  <input onChange={onChange} type={type ||"text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
</div>
}