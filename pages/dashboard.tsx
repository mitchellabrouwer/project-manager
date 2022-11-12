import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();

  const { data: session, status } = useSession();

  console.log("session", session);
  const loading = status === "loading";

  if (loading) {
    return null;
  }

  if (!session) {
    return router.push("/");
  }

  if (!session.user.isSubscriber) {
    return router.push("/subscribe");
  }

  return (
    <div>
      <Head>
        <title>Project Manager</title>
        <meta name="description" content="Project Manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="text-center ">
        <h1 className="mt-10 text-2xl font-extrabold">Project Manager</h1>

        <div className="grid sm:grid-cols-2">
          <div>
            <h2 className="mt-10 font-bold">Project #1</h2>

            <ol className="mt-4 list-inside list-decimal">
              <li>TODO 1</li>
              <li>TODO 2</li>
              <li>TODO 3</li>
            </ol>
          </div>
          <div>
            <h2 className="mt-10 font-bold">Project #2</h2>

            <ol className="mt-4 list-inside list-decimal">
              <li>TODO 1</li>
              <li>TODO 2</li>
              <li>TODO 3</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
