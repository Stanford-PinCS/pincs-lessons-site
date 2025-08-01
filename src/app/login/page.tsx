"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import PincsHeader from "@/components/PincsHeader";
import PincsButton from "@/components/PincsButton";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: process.env.NEXT_PUBLIC_APP_BASE_PATH ?? "",
    });

    if (res?.ok) {
      router.push(res.url ?? process.env.NEXT_PUBLIC_APP_BASE_PATH ?? "");
    } else {
      alert("Login failed");
    }
  }

  return (
    <div className="flex flex-col h-screen gap-4">
      <PincsHeader hideLogin={true} />
      <div className="flex flex-col justify-center ">
        <h1 className="text-xl font-semibold text-center text-gray-800 mb-4">
          Teacher login
        </h1>
        <form onSubmit={handleLogin}>
          <div className="flex items-center flex-col gap-2">
            <input
              className="w-2xs border p-1 rounded-md border-gray-200"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-2xs border p-1 rounded-md border-gray-200"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <PincsButton type="submit" text="Login" />
          </div>
        </form>
      </div>
    </div>
  );
}
