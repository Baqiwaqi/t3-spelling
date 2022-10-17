import { trpc } from "@/utils/trpc";
import type { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { prisma } from "@/server/db/client";


const WordManagement: NextPage = () => {
  const mutation = trpc.word.createWord.useMutation();

  const handleCreateWord = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const word = e.currentTarget.word.value;
    if (!word) return;
    mutation.mutate({ word });
    data.data?.push({ id: data.data.length.toString(), word: word });

    e.currentTarget.reset();
  }

  const data = trpc.word.getAllWords.useQuery();

  return (
    <div className="pt-8">
      <h1 className="text-2xl font-bold">
        Add Word
      </h1>
      <p className="mt-3 text-sm">
        Add a word to the database
      </p>
      <div className="flex-col w-full justify-center space-y-2">
        <form onSubmit={handleCreateWord} className="space-y-2">
          <input className="mt-4 w-full border rounded-md p-2" type="text" name="word" />
          <input type="submit" className="px-3 py-1 rounded-md bg-black text-white" title="Create Word" />
        </form>
      </div>
      <h1 className="text-2xl font-bold mt-8">
        Words
      </h1>
      <p className="mt-3 text-sm">
        All words in the database
      </p>
      <div className="flex-col w-full justify-center space-y-2">
        <ul >
          {data.data?.map((word) => (
            <li key={word.id} className="p-2 border">
              {word.word}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default WordManagement;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(context.req, context.res, authOptions)
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session?.user?.id
    }
  })

  if (user?.role !== "ADMIN") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: user
    },
  };
}
