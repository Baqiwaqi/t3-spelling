import { signIn, signOut, useSession } from 'next-auth/react';
import NextLink from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef, useState } from 'react'

const Header = () => {
  return (
    <header className="fixed w-full z-30 bg-white text-zinc-800" >
      <div className="mx-24 py-8">
        <nav className="flex item-center justify-between text-base">
          <NextLink href="/">
            <h2 className="text-2xl font-bold py-2">
              T3-spell
            </h2>
          </NextLink>
          <div className="items-center gap-8 hidden md:flex py-2">
            <HeaderLink href="/practice" name="Oefenen" />
          </div>
          <AuthShowcase />
        </nav>
      </div>
    </header>
  );
}

export default Header

interface Props {
  href: string;
  name: string;
}

const HeaderLink: React.FC<Props> = ({ href, name }) => {
  return (
    <NextLink href={href}>
      <a className="text-xl font-bold hover:undeline">
        {name}
      </a>
    </NextLink>
  );
}


const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex items-center gap-4">
      {sessionData ? (
        <SignedInDropdown />
      ) : (
        <SignInButton />
      )}
    </div>
  );
};

const SignInButton: React.FC = () => {
  return (
    <button
      className=" border border-black rounded-3xl bg-black text-white px-4 py-2 text-xl shadow-lg"
      onClick={() => signIn()}
    >
      Sign in
    </button>
  );
}

const SignedInDropdown: React.FC = () => {
  const { data: sessionData } = useSession();
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-white  px-4 py-2 text-sm font-medium border border-black  text-black shadow-lg">
          <span className="mr-2">{sessionData?.user?.name}</span>
          {/* dropdown svg */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5 7a1 1 0 011.707 0L10 10.586 13.293 7.293A1 1 0 1114.707 8.707l-4 4a1 1 0 01-1.414 0l-4-4A1 1 0 015 7z"
              clipRule="evenodd"
            />
          </svg>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <NextLink href="/profile">
                  <button
                    className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Profile

                  </button>
                </NextLink>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={() => signOut()}
                >
                  Sign out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
