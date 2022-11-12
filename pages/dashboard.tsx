/* eslint-disable react/no-array-index-key */
/* eslint-disable camelcase */
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import NewTodo from "../components/welcome/NewTodo";
import { getProjects } from "../lib/data";
import prisma from "../lib/prisma";

export default function Dashboard({ projects }) {
  const router = useRouter();
  const [name, setName] = useState("");

  const { data: session, status } = useSession();

  const loading = status === "loading";

  if (loading) {
    return null;
  }

  if (!session) {
    router.push("/");
    return;
  }

  if (!session.user.isSubscriber) {
    router.push("/subscribe");
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

        <form
          className="mt-10 flex flex-row justify-center"
          onSubmit={async (e) => {
            e.preventDefault();
            await fetch("/api/project", {
              body: JSON.stringify({
                name,
              }),
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
            });

            router.reload();
          }}
        >
          <input
            onChange={(e) => setName(e.target.value)}
            className="border p-1 text-black outline-none"
            required
            placeholder="New project"
          />

          <button
            disabled={!name}
            className={`border px-8 py-2 font-bold  ${
              name ? "" : "cursor-not-allowed border-gray-400 text-gray-400"
            }`}
            type="submit"
          >
            Add
          </button>
        </form>

        <div className="ml-16 grid text-left sm:grid-cols-2">
          {projects.map((project, project_index) => (
            <div key={project_index}>
              <h2 className="mt-10 font-bold">
                {project.name}{" "}
                <span
                  className="cursor-pointer"
                  onClick={async (e) => {
                    e.preventDefault();
                    await fetch("/api/project", {
                      body: JSON.stringify({
                        id: project.id,
                      }),
                      headers: {
                        "Content-Type": "application/json",
                      },
                      method: "DELETE",
                    });

                    router.reload();
                  }}
                >
                  🗑
                </span>
              </h2>
              <NewTodo project_id={project.id} />
              <ol className="mt-4 text-left ">
                {project.todos.map((todo, todo_index) => (
                  <li key={todo_index}>
                    <span
                      className="cursor-pointer"
                      onClick={async (e) => {
                        e.preventDefault();
                        await fetch("/api/complete", {
                          body: JSON.stringify({
                            id: todo.id,
                          }),
                          headers: {
                            "Content-Type": "application/json",
                          },
                          method: "POST",
                        });

                        router.reload();
                      }}
                    >
                      {todo.done ? "✅" : "⬜️"}
                    </span>{" "}
                    <span className={`${todo.done ? "line-through" : ""}`}>
                      {todo.name}{" "}
                      <span
                        className="cursor-pointer"
                        onClick={async (e) => {
                          e.preventDefault();
                          await fetch("/api/todo", {
                            body: JSON.stringify({
                              id: todo.id,
                            }),
                            headers: {
                              "Content-Type": "application/json",
                            },
                            method: "DELETE",
                          });

                          router.reload();
                        }}
                      >
                        🗑
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
      <button
        className="ml-5 mt-20 cursor-pointer text-center text-xs hover:underline"
        onClick={async (e) => {
          e.preventDefault();
          await fetch("/api/cancel", {
            method: "POST",
          });

          router.reload();
        }}
        type="button"
      >
        cancel your subscription
      </button>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const projects = await getProjects(prisma, session?.user.id);

  return {
    props: {
      projects,
    },
  };
}
