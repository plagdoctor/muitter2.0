import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
export function middleware(req:NextRequest) {
    console.log("it works! global middleware.");
    console.log(req.ua);
    if(req.ua?.isBot) {
        return new Response("plz don't be a bot", {status:403});
    }
    if (!req.url.includes("/api")){
        if (!(req.url.includes("create-account") || req.url.includes("log-in") ) && !req.cookies.muittersession){
           return NextResponse.redirect("/log-in");
        }
    }
}