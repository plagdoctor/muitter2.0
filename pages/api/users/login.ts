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
        body: {email, password},
    } =req;
    
    const validUser = await client.user.findFirst({
        where: {
            email:email,
            password: password,
        }
    });

    if(!validUser){
        return res.json({
            ok:false,
            message: "password doesn't match or no email exists."
            });
    }

    console.log("it's good to login")

    req.session.user = {
        id : validUser.id
    };

    await req.session.save();

    console.log("session saved!")
    return res.json({
    ok:true,
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
  