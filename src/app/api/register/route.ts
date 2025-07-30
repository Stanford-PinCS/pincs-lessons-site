import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";

// Register for account.
export async function POST(req: Request) {
  const { first_name, last_name, email, password, website } = await req.json();
  if (!email || !password) {
    return NextResponse.json(
      { error: "Missing email or password" },
      { status: 400 }
    );
  }
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: { first_name, last_name, email, password: hashed, website },
    });
    return NextResponse.json({ user: { id: user.id, email: user.email } });
  } catch (error: any) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        console.error("Error: A user with this email already exists.");
        throw new Error("Email already in use.");
      } else {
        console.error("Prisma Client Known Request Error:", error.message);
        throw new Error(`Database error: ${error.message}`);
      }
    } else if (error instanceof PrismaClientValidationError) {
      console.error("Prisma Client Validation Error:", error.message);
      throw new Error(`Validation error: ${error.message}`);
    } else {
      console.error("An unexpected error occurred:", error);
      throw new Error("An unexpected error occurred during user creation.");
    }
  }
}
