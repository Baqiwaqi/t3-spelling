import { GetServerSideProps } from "next";
import Image from "next/image";
import NextLink from "next/link";
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { unstable_getServerSession } from "next-auth/next"

import { prisma } from '@/server/db/client';
import { User as UserType } from '@prisma/client'

interface Props {
  user: UserType
}

const Profile: React.FC<Props> = ({ user }) => {
  return (
    <div className="flex flex-col">
      <h1 className="font-semibold text-xl pt-10">User Profile</h1>
      <div className="flex items-center justify-between pt-5">
        <Image className="p" src={user.image || ""} width={200} height={200} alt="ProfilePic" style={{ borderRadius: "50%" }} />
        <div className="flex flex-col w-80">
          <div className="flex flex-col my-2">
            <p className="block text-sm font-medium text-gray-700">Name</p>
            <div className="mt-1 flex border border-zinc-600 rounded-md shadow-sm bg-gray-50">
              <p className=" block text-sm font-medium text-gray-700 p-2">{user.name}</p>
            </div>
          </div>
          <div className="flex flex-col my-2">
            <p className="block text-sm font-medium text-gray-700">Email</p>
            <div className="mt-1 flex border border-zinc-600 rounded-md shadow-sm bg-gray-50">
              <p className=" flex text-sm font-medium text-gray-700 p-2 ">{user.email}</p>
            </div>
          </div>
          <div className="flex flex-col my-2">
            <p className="block text-sm font-medium text-gray-700">Role</p>
            <div className="mt-1 flex border border-zinc-600 rounded-md shadow-sm bg-gray-50">
              <p className=" flex text-sm font-medium text-gray-700 p-2 ">{user.role}</p>
            </div>
          </div>
        </div>
      </div>

      {user.role === "ADMIN" && (
        <WordManagement />
      )}

      <h1 className="font-semibold text-xl pt-10">User Results</h1>
      <div className="flex flex-col pt-5">
        <div className="flex flex-col my-2">
          <p className="block text-sm font-medium text-gray-700">Total Words</p>
          <div className="mt-1 flex border border-zinc-600 rounded-md shadow-sm bg-gray-50">
            <p className=" flex text-sm font-medium text-gray-700 p-2 ">0</p>
          </div>
        </div>
        <div className="flex flex-col my-2">
          <p className="block text-sm font-medium text-gray-700">Total Strikes</p>
          <div className="mt-1 flex border border-zinc-600 rounded-md shadow-sm bg-gray-50">
            <p className=" flex text-sm font-medium text-gray-700 p-2 ">0</p>
          </div>
        </div>
        <div className="flex flex-col my-2">
          <p className="block text-sm font-medium text-gray-700">Total Success</p>
          <div className="mt-1 flex border border-zinc-600 rounded-md shadow-sm bg-gray-50">
            <p className=" flex text-sm font-medium text-gray-700 p-2 ">0</p>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Profile;

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

  return {
    props: {
      user: user
    },
  };
}

const WordManagement: React.FC = () => {
  return (
    <div>
      <h1 className="font-semibold text-xl pt-10">Word Management</h1>
      <div className="flex flex-col pt-5 space-y-2">
        <NextLink href="/management/word">
          <button className="bg-zinc-600 text-white px-4 py-2 rounded-lg max-w-xs">Words</button>
        </NextLink>
        <NextLink href="/management/word-list">
          <button className="bg-zinc-600 text-white px-4 py-2 rounded-lg max-w-xs">Word Lists</button>
        </NextLink>
      </div>
    </div>
  )
}