import { Circle } from "./BlogCard"

export const BlogSkeleton =()=>{
  return(
    <div>
      <div role="status" className="animate-pulse">
        <div className="border-b border-slate-200 p-4 pb-4 w-screen max-w-screen-md cursor-pointer ">
          <div className="flex py-2">
          <div className="w-6 h-6 bg-gray-200 rounded-full  mb-4"></div>

            <div className="pl-2 text-sm font-extralight flex justify-center flex-col">
              <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
              
            </div> 
            <div className="flex justify-center flex-col pl-2 flex justify-center flex-col">
              <Circle/>
            </div>
            <div className="pl-2 text-slate-400 text-sm flex justify-center flex-col">
              <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            </div>
          </div>
          <div className="font-semibold	text-2xl">
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          </div>
          <div className="font-thin text-lg">
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          </div>
          <div className="text-slate-600 text-sm font-light pt-4 pl-4">
          <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
        </div>
      </div>
        <span className="sr-only">Loading...</span>
        </div>


    </div>
  )
}