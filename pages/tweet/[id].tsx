import Layout from "@components/layout";
import Tweet from "@components/tweet";
import useMutation from "@libs/client/useMutation";
import { Message, User } from "@prisma/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

interface TweetWithUser extends Message {
    user: User;
    _count: {
        favs: number;
      };
}

interface TweetResponse {
    ok:boolean;
    tweets: TweetWithUser;
    isLiked: boolean;
  }

const TweetDetail : NextPage = () => {
    const router = useRouter();
    const {data, mutate:boundMutate} = useSWR<TweetResponse>(
        router.query.id ? `/api/tweet/${router.query.id}` : null
    );
    console.log(data);
    // const [likes, setLikes] = useState(0);
    const [toggleFav] = useMutation(`/api/tweet/${router.query.id}/fav`);
    const onFavClick = () => {
      if (!data) return ;
      
      
    //   if(data?.isLiked) {
    //     setLikes(data?.tweets._count.favs-1)
    //   } else {
    //     setLikes(data?.tweets._count.favs+1)
    //   }
      
      boundMutate( (prev) => prev && {...prev,
        tweets:{
            ...prev.tweets,
            _count:{
                favs: data?.isLiked ? data?.tweets._count.favs -1 : data?.tweets._count.favs +1
            } 
        }
        , isLiked: !prev?.isLiked }, false);
      
      toggleFav({});
    };
    return (
        <Layout canGoBack hasTabBar title="Detail tweet">
            {data?.ok ? 
            <div className="flex flex-col pt-12 md:-mb-12 md:justify-start md:px-12">
                <Tweet id={data?.tweets.id} name={data?.tweets.user.name} message={data?.tweets.message} isDetail={true} ></Tweet>
                <div onClick={onFavClick} className="flex items-center md:pl-28 ">
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
                    {data?.isLiked ? ( 
                        <svg className= "w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
                        </svg> 
                        )
                        : (<svg
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
                        </svg>)}
                    <span className=" m-2 text-gray-400">{data?.tweets._count.favs}</span>
                </div>
                <div className=" border-[0.5px]"></div>                                
            </div>  : <></> }
            
        </Layout>   
      
    );
};

export default TweetDetail;