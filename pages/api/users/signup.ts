import withHandler, { ResponseType }  from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";

async function handler(
    req:NextApiRequest, res:NextApiResponse<ResponseType>
){    
    if(req.method ==="POST"){
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

        console.log("it's good to create")
        const user = await client.user.create({
            data: {
                name,
                email,
                password
            },
        });        
        req.session.user = {
            id : user.id
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
  