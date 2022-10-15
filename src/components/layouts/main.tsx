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
      <div className="bg-slate-800 text-blue-50 break-words leading-6 font-mono min-h-screen">
        <Header />
        <div>
          {children}
        </div>
      </div>
    </>
  );
}

