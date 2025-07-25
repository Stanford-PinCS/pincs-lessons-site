// app/register/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PincsHeader from "@/components/PincsHeader";
import PincsButton from "@/components/PincsButton";

export default function Register() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    website: "",
  });
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/interactive-lessons/api/register", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) router.push("/login");
    else alert("Registration failed");
  }

  return (
    <div className="flex flex-col h-screen gap-4">
      <PincsHeader hideLogin={true} />
      <div className="flex flex-col justify-center ">
        <h1 className="text-xl font-semibold text-center text-gray-800 mb-4">
          Teacher login
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center flex-col gap-2">
            <input
              className="w-2xs border p-1 rounded-md border-gray-200"
              placeholder="First name"
              value={form.first_name}
              onChange={(e) =>
                setForm((f) => ({ ...f, first_name: e.target.value }))
              }
            />
            <input
              className="w-2xs border p-1 rounded-md border-gray-200"
              placeholder="Last name"
              value={form.last_name}
              onChange={(e) =>
                setForm((f) => ({ ...f, last_name: e.target.value }))
              }
            />
            <input
              className="w-2xs border p-1 rounded-md border-gray-200"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
            />
            <input
              className="w-2xs border p-1 rounded-md border-gray-200"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm((f) => ({ ...f, password: e.target.value }))
              }
            />
            <input
              className="w-2xs border p-1 rounded-md border-gray-200"
              placeholder="Website"
              value={form.website}
              onChange={(e) =>
                setForm((f) => ({ ...f, website: e.target.value }))
              }
            />
            <PincsButton type="submit" text="Register" />
          </div>
        </form>
      </div>
    </div>
  );
}
