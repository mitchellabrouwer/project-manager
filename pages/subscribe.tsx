import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";

export default function Subscribe() {
  const router = useRouter();

  const { data: session, status } = useSession();

  const loading = status === "loading";

  if (loading) {
    return null;
  }

  if (!session) {
    return router.push("/");
  }

  console.log("session", session.user);
  if (session.user.isSubscriber) {
    return router.push("/dashboard");
  }

  return (
    <div>
      <Script src="https://js.stripe.com/v3/" />

      <Head>
        <title>Project Manager</title>
        <meta name="description" content="Private Area" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="text-center ">
        <h1 className=" mt-20 text-2xl font-extrabold">Project Manager</h1>

        <p className="mt-10">
          Join for just $19.99/m. Free trial for the first 7 days
        </p>

        <button
          className="mt-10 bg-black px-5 py-2 text-white"
          onClick={async () => {
            const res = await fetch("/api/stripe/session", {
              method: "POST",
            });

            const data = await res.json();

            if (data.status === "error") {
              alert(data.message);
              return;
            }

            const { sessionId } = data;
            const { stripePublicKey } = data;

            // @ts-ignore
            // eslint-disable-next-line no-undef
            const stripe = Stripe(stripePublicKey);
            stripe.redirectToCheckout({
              sessionId,
            });
          }}
          type="button"
        >
          Create a subscription
        </button>
      </div>
    </div>
  );
}
