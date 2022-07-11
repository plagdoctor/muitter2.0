import withHandler, { ResponseType }  from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";

async function handler(
    req:NextApiRequest, res:NextApiResponse<ResponseType>
){    
    if(req.method ==="POST"){
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

        return res.json({
        ok:true,
        });
    }
}

// export default withApiSession(withHandler({
//     methods: ["POST"], 
//     handler,
//     isPrivate: false
// }));

export default withHandler(
({
    methods: ["POST"], 
    handler,
    isPrivate: false

})
);
  