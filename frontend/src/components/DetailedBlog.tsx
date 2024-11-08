import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const DetailedBlog = ({blog}:{blog:Blog})=>{
  return(
    <div>
      <Appbar/>
      <div className="flex justify-center">
        <div className="grid grid-cols-12 w-full px-10 pt-12">
          <div className="col-span-8">
            <div className="text-5xl font-extrabold">
              {blog.title},
            </div>
            <div className="text-slate-400 pt-4">
              Posted on 2 May 2023
            </div>
            <div className="pt-4 text-slate-600">
              {blog.content}
            </div>
          </div>
          <div className="col-span-4">
            <div className="text-xl">Author</div>
            <div className="flex pt-2">
              <div className="flex flex-col justify-center pr-4">
                <Avatar size="big" name={blog.author.name||"Anonymus"}/>
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-3xl font-bold ">
                  {blog.author.name||"Anonymus"}
                </div>
                <div className="text-slate-500 pt-4">
                  Random Author discription that how the Author grabs the Attention of the user!
                </div>
              </div>
            </div>
          </div>
        </div> 
      </div>

    </div>
  )
}