import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
    req:NextApiRequest, res:NextApiResponse<ResponseType>
){
    if(req.method === "GET") {
        const tweets = await client.message.findMany({
            
            include: {
                user: true,
                _count: {
                    select: {
                        favs:true,
                    }
                }
            }
            
        });
        res.json({
            ok: true,
            tweets
        });
    }
    if(req.method === "POST"){
        console.log("post 안에 들어옴");
        const { 
            body:{message},
            session:{user},
        } = req;
        const tweet = await client.message.create({
            data: {
                message,
                user: {
                    connect: {
                        id: user?.id,
                    },
                },
            },
    
        });
        res.json({
            ok: true,
            tweet,
        });
    
    }
}

export default withApiSession(withHandler({
    methods: ["GET", "POST"], 
    handler,
}));
