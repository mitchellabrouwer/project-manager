import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Success() {
  const router = useRouter();
  const { sessionId } = router.query;

  const { data: session, status } = useSession();

  const loading = status === "loading";

  useEffect(() => {
    const call = async () => {
      await fetch("/api/stripe/success", {
        body: JSON.stringify({
          sessionId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      //  @ts-ignore
      window.location = "/dashboard";
    };
    call();
  }, [sessionId]);

  if (loading) {
    return null;
  }

  if (!session) {
    router.push("/");
    return;
  }

  return <div></div>;
}

export async function getServerSideProps() {
  // we need this or the router query data is not available client-side
  // see https://nextjs.org/docs/api-reference/next/router#router-object
  return {
    props: {},
  };
}
