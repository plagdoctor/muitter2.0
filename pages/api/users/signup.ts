import {withIronSessionApiRoute} from "iron-session/next";
import withHandler, { ResponseType }  from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
    req:NextApiRequest, res:NextApiResponse<ResponseType>
){    

    const {
        //session: {user},
        body: {email, name, password},
    } =req;
    
    const validUser = await client.user.findUnique({
        where: {
            email
        }
    });

    if(validUser?.name){
        return res.json({
            ok:false,
            message:`It's already Signed up. ${validUser?.name}`
            });
    }

    console.log("it's good to create", email, name, password)
    const user = await client.user.create({
        data: {
            name,
            email,
            password
        },
    });       
    const loginUser = await client.user.findFirst({
        where: {
            email:email,
            password: password,
        }
    });

    if(!loginUser){
        return res.json({
            ok:false,
            message: "password doesn't match or no email exists."
            });
    }

    console.log("it's good to login")

    req.session.user = {
        id : user.id
    };

    await req.session.save();

    console.log("session saved!")
    return res.json({
    ok:true,
    message: "good it's created"
    });
}

export default withApiSession(withHandler({
    methods: ["POST"], 
    handler,
    isPrivate: false
}));

// export default withHandler(
// ({
//     methods: ["POST"], 
//     handler,
//     isPrivate: false
// })
// );
  