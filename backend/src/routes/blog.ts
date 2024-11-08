import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput, updateBlogInput } from "@varshithreddy355/medium-common";
import { Hono } from "hono";
import { use } from "hono/jsx";
import { verify } from "hono/jwt";
import { auth } from "hono/utils/basic-auth";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables: {
    userId: string;
  }
}>();

type User={
  id:string;
}

blogRouter.use("/*",async (c,next)=>{
  const authHeader = c.req.header("authorization") || "";

  try{
    const user = await verify(authHeader,c.env.JWT_SECRET) as User;
    if (user){
      c.set("userId", user.id);    
      await next();
    }else{
      c.status(403);
      return c.json({
        message : "You have not logged in"
      })
    } 
  }catch(e){
    c.status(403);
    return c.json({
      message : "You have not logged in"
    })
  }
})

blogRouter.post('/', async(c) =>{
  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      message : "Invalid inputs"
    })
  }
  const authorId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,

  }).$extends(withAccelerate())
 
  const post = await prisma.post.create({
    data:{
      title: body.title,
      content: body.content,
      thumbnail: body.thumbnail,
      authorId: authorId
    }
  })
  return c.json({
    id:post.id
  })
})
 
blogRouter.put('/', async(c) =>{
  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      message : "Invalid inputs"
    })
  }
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,

  }).$extends(withAccelerate())

  await prisma.post.update({
    where:{
      id: body.id
    },
    data:{
      title: body.title,
      content: body.content,
      thumbnail: body.thumbnail
    }
  })
  return c.text('Updated sucessfully');
})

// Should add the paggination for todos
blogRouter.get('/bulk', async(c) =>{
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const blogs = await prisma.post.findMany({
    select:{
      content:true,
      title:true,
      id:true,
      author:{
        select:{
          name:true
        }
      }
    }
  });
  return c.json({
    blogs
  })
  
})

blogRouter.get('/:id', async(c) =>{
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try{
    const post = await prisma.post.findFirst({
      where:{
        id: id
      },
      select:{
        title:true,
        content:true,
        author:{
          select:{
            name:true
          }
        }
      }
    })
    return c.json({
      post
    })
  }catch(e){
    c.status(411);
    return c.json({
      message:"Error while fetching blog"
    })
  }

})

