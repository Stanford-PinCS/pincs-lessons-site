import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

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
  } catch (e) {
    return NextResponse.json(
      { error: "User already exists?" },
      { status: 400 }
    );
  }
}
