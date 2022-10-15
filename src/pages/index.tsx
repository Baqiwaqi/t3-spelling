import type { NextPage } from "next";
import NextLink from "next/link";

const Home: NextPage = () => {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welkom bij{" "}
          <a className="text-blue-600">
            T3-spell
          </a>
        </h1>
        <p className="mt-3 text-2xl">
          T3-spell is gemaakt voor basis schoolleerlingen die moeite hebben met het spellen van woorden.
        </p>

        <div className="flex  items-center justify-around max-w-md mt-6 sm:w-full">
          <NextLink href="/practice">
            <button className="mx-2 py-4 w-72 flex justify-center text-left border rounded-[400px] bg-black text-white">
              <h3 className="text-2xl">Oefenen</h3>
            </button>
          </NextLink>
          <NextLink href="/about">
            <button className="mx-2 py-4 w-72 flex justify-center text-left border rounded-[400px] bg-white text-black">
              <h3 className="text-2xl ">Over</h3>
            </button>
          </NextLink>
        </div>
      </main >
    </div >
  );
};

export default Home;

