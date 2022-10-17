import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import type { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
import { prisma } from "@/server/db/client";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const SingleWordListManagement: NextPage = () => {
  const router = useRouter();

  const { data } = trpc.word.getWordListById.useQuery({ id: router.query.id as string });

  return (

    <div className="pt-8">
      {/* back button */}
      <button className="px-3 my-3 rounded-md border text-black" onClick={() => router.back()}>Back</button>

      <h1 className="text-2xl font-bold">
        Wordlist: {data?.name}
      </h1>
      <p className="my-3 text-sm">
        {data?.Word.length} words in this list
      </p>
      <div className="flex-col w-full justify-center space-y-2">
        <h6 className="text-lg font-semibold text-gray-900 pt-2 text-left">Words</h6>
        <ul>
          {data?.Word.map((word) => (
            <li key={word.id} className="py-2">
              {word.word}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SingleWordListManagement;

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
