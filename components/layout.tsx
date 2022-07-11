import React from "react";
import Link from "next/link";
import { cls } from "../libs/client/utils";
import { useRouter } from "next/router";
import Head from "next/head";

interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  children: React.ReactNode;
  seoTitle?:string;
}

export default function Layout({
  title,
  canGoBack,
  hasTabBar,
  children,
  seoTitle
}: LayoutProps) {
  const router = useRouter();
  const onClick = () => {
    router.back();
  };
  return (
    <div>
      <Head>
        <title>{seoTitle} | Muitter</title>
      </Head>
      <div className=" flex w-full flex-wrap">
            <div className="flex w-full flex-col md:w-1/2">
                
                <div className="bg-white w-full h-12 md:w-1/2 justify-center text-lg px-10 font-medium  fixed text-gray-800 border-b top-0  flex items-center">
                    {canGoBack ? (
                    <button onClick={onClick} className="absolute left-4">
                        <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 19l-7-7 7-7"
                        ></path>
                        </svg>
                    </button>
                    ) : null}
                    {title ? (
                    <span className={cls(canGoBack ? "mx-auto" : "", "")}>{title}</span>
                    ) : null}
                </div>
                <div className={cls("pt-12", hasTabBar ? "pb-24" : "")}>{children}</div>
                {hasTabBar ? (
                    <nav className="bg-white md:w-1/2 text-gray-700 border-t fixed bottom-0 w-full px-20 pb-5 pt-3 flex justify-between text-xs">
                    <Link href="/">
                        <a
                        className={cls(
                            "flex flex-col items-center space-y-2 ",
                            router.pathname === "/"
                            ? "text-orange-500"
                            : "hover:text-gray-500 transition-colors"
                        )}
                        >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            ></path>
                        </svg>
                        <span>홈</span>
                        </a>
                    </Link>

                    <Link href="/tweet/upload">
                        <a
                        className={cls(
                            "flex flex-col items-center space-y-2 ",
                            router.pathname === "/tweet/upload"
                            ? "text-orange-500"
                            : "hover:text-gray-500 transition-colors"
                        )}
                        >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            ></path>
                        </svg>
                        <span>tweet</span>
                        </a>
                    </Link>

                    <Link href="/">
                        <a
                        className={cls(
                            "flex flex-col items-center space-y-2 ",
                            router.pathname === "/profile"
                            ? "text-orange-500"
                            : "hover:text-gray-500 transition-colors"
                        )}
                        >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            ></path>
                        </svg>
                        <span>miumiu</span>
                        </a>
                    </Link>
                    </nav>
                ) : null}
            </div>            
            <div className="w-1/2 shadow-2xl">
                <img className=" hidden h-screen w-full object-cover md:block" src='https://source.unsplash.com/random/1920' alt="Background" />
            </div>   
        </div> 
    </div>      
  );
}
