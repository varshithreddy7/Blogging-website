import { useBlocker } from "react-router-dom"
import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"
import { BlogSkeleton } from "../components/BlogSkeleton"

export const Blogs = ()=>{
  const {loading,blogs}= useBlogs();
  if(loading){
    return(
      <div>
        <Appbar/>
        <div className="flex justify-center p-4">
          <div>
            <BlogSkeleton/>
            <BlogSkeleton/>
            <BlogSkeleton/>
            <BlogSkeleton/>
            <BlogSkeleton/>
            <BlogSkeleton/>

          </div>
        </div>
      </div>
    )
  }
  return(
    <div>
      <Appbar/>
      <div className="flex justify-center p-4">
        <div className="">
          {blogs.map(blog=>
            <BlogCard
            id={blog.id}
            authorName={blog.author.name||"Anonymus"}
            publishDate="12 May 2020"
            title={blog.title}
            content={blog.content}
          />
          )}
          
        </div>
      </div>
    </div>
    
  )
}