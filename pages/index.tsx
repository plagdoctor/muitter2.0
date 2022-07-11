
import Layout from "@components/layout";
import Tweet from "@components/tweet";
import useUser from "@libs/client/useUser";
import { Message, User } from "@prisma/client";
import { NextPage } from "next";
import React from "react";
import useSWR from "swr";


interface TweetsWithUser extends Message {
  user: User;
  _count: {
      favs: number;
    };
}

interface TweetsResponse {
  ok:boolean;
  tweets: TweetsWithUser[];
}


const Home : NextPage = () => { 
  const {user} = useUser();

  const {data} = useSWR<TweetsResponse>("/api/tweet");

  console.log(user);
  return   (
  <Layout hasTabBar seoTitle="main" title="홈">
    
    <div className="flex flex-col pt-12 md:-mb-12 md:justify-start md:px-12">
      {data?.tweets?.map((tweet) => (
        <div key ={tweet.id}> 
          <Tweet id={tweet.id} name={tweet.user.name} message={tweet.message} isDetail={false}></Tweet>
          <div className="flex items-center md:pl-28 ">
                    <svg
                        className="w-5 h-5  text-gray-400"
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
                    <span className=" m-2 text-gray-400">0</span>
                    <svg
                        className="h-6 w-6 text-gray-400 "
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                        </svg>
                    <span className=" m-2 text-gray-400">{tweet._count.favs}</span>
                </div>
                <div className=" border-[0.5px]"></div>           
        </div>
      ))
      } 
        
    </div> 
    
    

  </Layout>   
);
};
export default Home;