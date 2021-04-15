import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import {DATABASE_URL, GITHUB_ID, GITHUB_SECRET} from "../../../config";

export default NextAuth({
    providers: [
        Providers.GitHub({
            clientId: GITHUB_ID,
            clientSecret: GITHUB_SECRET,
        }),
    ],
    database: DATABASE_URL,
});