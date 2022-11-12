import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const { data: session, status } = useSession();

  const loading = status === "loading";

  if (loading) {
    return null;
  }

  if (session) {
    router.push("/dashboard");
    return;
  }

  return (
    <div>
      <Head>
        <title>Project Manager</title>
        <meta name="description" content="Private Area" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="text-center ">
        <h1 className="mt-10 text-2xl font-extrabold">Project Manager</h1>

        <p className="mt-10">The best way to manage your projects!</p>

        <p className="mt-10">Free 7 days trial then just $19.99/m</p>

        <div className="mt-10">
          <Link
            className="bg-black px-5 py-2 text-white"
            href="/api/auth/signin"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
