"use client";

import Link from "next/link";

import { FormEvent, useState } from "react";

import { useRouter } from "next/navigation";
import AuthLayout from "@/components/AuthLayout";

export default function RegisterPage() {

  const router = useRouter();

  const [username, setUsername] = useState("");

  const [displayName, setDisplayName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSubmit(

    event: FormEvent<HTMLFormElement>,

  ) {

    event.preventDefault();

    setError("");

    setLoading(true);

    try {

      const response = await fetch(

        "http://127.0.0.1:8000/api/auth/register",

        {

          method: "POST",

          headers: {

            "Content-Type": "application/json",

          },

          body: JSON.stringify({

            username,

            display_name: displayName,

            email,

            password,

          }),

        },

      );

      const data = await response.json();

      if (!response.ok) {

        throw new Error(

          data.detail || "Registration failed",

        );

      }

      localStorage.setItem(

        "apexive_token",

        data.access_token,

      );

      localStorage.setItem(

        "apexive_user",

        JSON.stringify(data.user),

      );

      router.push("/");

    } catch (error) {

      setError(

        error instanceof Error

          ? error.message

          : "Registration failed",

      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <AuthLayout>
      <>
        <div className="mb-7">
          <p className="text-xs font-medium tracking-wide text-slate-500">
            APEXIVE AI
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
            Join the community
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Create your developer community account.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full"

        >

          {error && (

            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">

              {error}

            </div>

          )}

          <label className="block text-sm font-medium text-slate-700">

            Display name

          </label>

          <input

            value={displayName}

            onChange={(event) =>

              setDisplayName(event.target.value)

            }

            placeholder="Bhone Htet Naing"

            required

            className="mt-2 w-full rounded-lg border border-transparent bg-[#e8f0ff] px-4 py-3 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"

          />

          <label className="mt-5 block text-sm font-medium text-slate-700">

            Username

          </label>

          <input

            value={username}

            onChange={(event) =>

              setUsername(event.target.value)

            }

            placeholder="bhone"

            required

            minLength={3}

            className="mt-2 w-full rounded-lg border border-transparent bg-[#e8f0ff] px-4 py-3 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"

          />

          <label className="mt-5 block text-sm font-medium text-slate-700">

            Email

          </label>

          <input

            type="email"

            value={email}

            onChange={(event) =>

              setEmail(event.target.value)

            }

            placeholder="you@example.com"

            required

            className="mt-2 w-full rounded-lg border border-transparent bg-[#e8f0ff] px-4 py-3 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
/>

          <label className="mt-5 block text-sm font-medium text-slate-700">

            Password

          </label>

          <input

            type="password"

            value={password}

            onChange={(event) =>

              setPassword(event.target.value)

            }

            placeholder="Minimum 8 characters"

            minLength={8}

            required

            className="mt-2 w-full rounded-lg border border-transparent bg-[#e8f0ff] px-4 py-3 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"

          />

          <button

            type="submit"

            disabled={loading}

            className="mt-6 w-full rounded-lg bg-black py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"

          >

            {loading

              ? "Creating account..."

              : "Create account"}

          </button>

          <p className="mt-6 text-center text-sm text-slate-500">

            Already have an account?{" "}

            <Link

              href="/login"

              className="font-semibold text-slate-950 hover:underline"

            >

              Sign in

            </Link>

          </p>

        </form>

      </>
    </AuthLayout>

  );

}