import Head from "next/head";
import Header from "@/components/common/header";

type Props = {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <>
      <Head>
        <title>T3 Spelling</title>
      </Head>
      <div className="bg-white text-zinc-800 break-words leading-6 font-mono min-h-screen max-w-5xl mx-auto">
        <Header />
        <div className="p-8 pt-[110px]">
          {children}
        </div>
      </div>
    </>
  );
}

