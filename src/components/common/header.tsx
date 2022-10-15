import { signIn, signOut, useSession } from 'next-auth/react';
import NextLink from 'next/link';

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
    <button
      className=" border border-black rounded-3xl bg-black text-white px-4 py-2 text-xl shadow-lg"
      onClick={sessionData ? () => signOut() : () => signIn()}
    >
      {sessionData ? "Sign out" : "Sign in"}
    </button>
  );
};
