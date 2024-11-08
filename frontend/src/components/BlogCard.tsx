import { Link } from "react-router-dom"
interface BlogCardProps{
  authorName: string,
  title: string,
  content: string,
  publishDate: string,
  id: string
}
export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishDate
}:BlogCardProps)=>{
  return(
    <Link to={`/blog/${id}`}>
      <div className="border-b border-slate-200 p-4 pb-4 w-screen max-w-screen-md cursor-pointer ">
        <div className="flex py-2">
          <Avatar size="small" name={authorName}/>
          <div className="pl-2 text-sm font-extralight flex justify-center flex-col">
            {authorName}
          </div> 
          <div className="flex justify-center flex-col pl-2 flex justify-center flex-col">
            <Circle/>
          </div>
          <div className="pl-2 text-slate-400 text-sm flex justify-center flex-col">
            {publishDate}
          </div>
        </div>
        <div className="font-semibold	text-2xl">
          {title}
        </div>
        <div className="font-thin text-lg">
          {content.slice(0,100)+"..."}
        </div>
        <div className="text-slate-600 text-sm font-light pt-4 pl-4">
          {`${Math.ceil(content.length / 100)} min read`}
        </div>

      </div>
    </Link>
    
  )
}
export function Circle(){
  return<div className="h-1 w-1 rounded-full bg-slate-400">
  </div>
}
export function Avatar({name , size="small"}:{name:string,size?:"small"|"big"}){
  return(
      <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${size==="small"?"w-6 h-6":"w-10 h-10"}`}>
        <span className={` text-gray-600 dark:text-gray-300 ${size==="small"?"text-xs":"text-md"} `}>{name[0]}</span>
      </div>
  )
}