import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { jwt, sign } from 'hono/jwt'
import { signinInput, signupInput } from "@varshithreddy355/medium-common";

export const userRouter = new Hono<{
  Bindings:{
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>()

userRouter.post('/signup', async (c) => {
  const body = await c.req.json();
  console.log(body);
  const { success } = signupInput.safeParse(body); 
  if (!success) {
    console.log("Zod validation failed:"); // Log validation errors
    c.status(411);
    return c.json({
      message: "Invalid inputs!!"
    });
  }

 

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.create({
      data: {
        email:body.email,
        password:body.password,
        name : body.name
      }
    });
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.text(jwt);
  } catch (e) {
    alert("Error while signing up")
    c.status(400);
    return c.text("Invalid!");
  }
});



userRouter.post('/signin', async (c) => {
  const body = await c.req.json();
  console.log("Received Body:", body); // Log the incoming body

  const { success, error } = signinInput.safeParse(body); 
  if (!success) {
    console.log("Zod validation failed:", error); // Log validation errors
    c.status(411);
    return c.json({
      message: "Invalid inputs!!",
      error: error?.format() // Show detailed error
    });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password,
      }
    });

    if (!user) {
      c.status(403);
      return c.json({ error: "Incorrect credentials" });
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.text(jwt);
  } catch (e) {
    c.status(411);
    return c.text("Invalid");
  }
});
