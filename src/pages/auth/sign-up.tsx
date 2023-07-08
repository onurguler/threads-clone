import Link from "next/link";

export default function SignUpPage() {
  return (
    <section className="grid h-screen w-full place-items-center bg-gradient-to-br from-zinc-950 to-slate-950 p-6">
      <div className="mx-auto flex w-full max-w-sm flex-col space-y-4 backdrop-blur-3xl">
        <div className="flex items-center gap-2 ">
          <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-4xl font-extrabold text-transparent">
            @
          </span>
          <span className="text-2xl font-bold">Threads</span>
        </div>
        <p className="">Sign up to continue the platform.</p>
        <div className="flex flex-col space-y-4">
          <input
            className="w-full rounded-lg border border-zinc-600 bg-zinc-800 px-4 py-2 outline-none"
            type="text"
            placeholder="What's your name?"
          />
          <input
            className="w-full rounded-lg border border-zinc-600 bg-zinc-800 px-4 py-2 outline-none"
            type="text"
            placeholder="Please enter your email address"
          />
          <input
            className="w-full rounded-lg border border-zinc-600 bg-zinc-800 px-4 py-2 outline-none"
            type="text"
            placeholder="Username"
          />
          <input
            className="w-full rounded-lg border border-zinc-600 bg-zinc-800 px-4 py-2 outline-none"
            type="password"
            placeholder="Password"
          />
          <input
            className="w-full rounded-lg border border-zinc-600 bg-zinc-800 px-4 py-2 outline-none"
            type="password"
            placeholder="Confirm Password"
          />
          <button className="rounded-full bg-blue-600 px-4 py-2 font-medium hover:bg-blue-500">
            Sign Up
          </button>
          <p className="text-center text-sm text-zinc-600">
            Already have account? You can sign in{" "}
            <Link
              href="/auth/sign-in"
              className="text-pink-500 underline hover:text-pink-600"
            >
              here
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
