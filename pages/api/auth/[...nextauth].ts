import NextAuth, {Session, User} from "next-auth";
import Providers from "next-auth/providers";
import {APP_ENV, APP_SECRET, DATABASE_URL, GITHUB_ID, GITHUB_SECRET} from "../../../config";
import {JWT} from "next-auth/jwt";

// @ts-ignore
// @ts-ignore
export default NextAuth({
    providers: [
        Providers.GitHub({
            clientId: GITHUB_ID,
            clientSecret: GITHUB_SECRET,
        }),
    ],
    database: DATABASE_URL,
    secret: APP_SECRET,
    debug: APP_ENV === 'dev',
    callbacks: {
        // @ts-ignore
        session: (session: Session, jwt: User|JWT) => {
            console.log(session.accessToken, jwt);

            // @ts-ignore
            const {id = null} = jwt;

            if (id) {
                session.user.id = id;
            }

            return session;
        },
    },
});