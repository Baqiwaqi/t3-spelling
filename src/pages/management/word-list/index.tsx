import { trpc } from "@/utils/trpc";
import type { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
import { prisma } from "@/server/db/client";
import NextLink from "next/link";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const WordListManagement: NextPage = () => {
  const { data } = trpc.word.getAllWordLists.useQuery();

  return (
    <div className="pt-8">
      <div className="flex justify-between items-baseline">
        <h1 className="text-2xl font-bold">
          Word Lists
        </h1>
        <NextLink href="/management/word-list/create">
          <button className="px-3 py-1 rounded-md bg-black text-white">Create Word List</button>
        </NextLink>
      </div>
      <p className="mt-3 text-sm">
        Word lists in the database
      </p>
      <table className="min-w-full text-center">
        <thead className="border-b bg-gray-50">
          <tr >
            <th className="text-sm font-semibold text-gray-900 px-6 py-4 text-left">Name</th>
            <th className="text-sm font-semibold text-gray-900 px-6 py-4 text-left">Length</th>
            <th className="text-sm font-semibold text-gray-900 px-6 py-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((wordList) => (
            <tr key={wordList.id} className="border-b">
              <td className="text-left text-sm text-gray-900 font-light px-6 py-4 whitespace-nowraptext-left">{wordList.name}</td>
              <td className="text-left text-sm text-gray-900 font-light px-6 py-4 whitespace-nowraptext-left">{wordList.Word.length}</td>
              <td className="text-left text-sm text-gray-900 font-light px-6 py-4 whitespace-nowraptext-left space-x-2">
                <NextLink href={`/management/word-list/${wordList.id}`}>
                  <button className="px-3 py-1 rounded-md bg-black text-white" title="Edit Word List">Edit</button>
                </NextLink>
              </td>
            </tr>
          ))}
          {/* <td className="text-left text-sm text-gray-900 font-light px-6 py-4 whitespace-nowraptext-left">The Sliding Mr. Bones (Next Stop, Pottersville)</td> */}

        </tbody>
      </table>
    </div >
  );
};

export default WordListManagement;

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

