import NextAuth, {Session, User} from "next-auth";
import Providers from "next-auth/providers";
import {APP_ENV, APP_SECRET, DATABASE_URL, GITHUB_ID, GITHUB_SECRET} from "../../../config";
import {JWT} from "next-auth/jwt";

const debug = (APP_ENV === 'dev');

export default NextAuth({
    providers: [
        Providers.GitHub({
            clientId: GITHUB_ID,
            clientSecret: GITHUB_SECRET,
        }),
    ],
    debug,
    session: {
        jwt: false,
    },
    jwt: {
        secret: APP_SECRET,
    },
    database: DATABASE_URL,
    secret: APP_SECRET,
    callbacks: {
        // @ts-ignore
        session: (session: Session, jwt: User|JWT) => {
            // @ts-ignore
            const {id = null} = jwt;

            if (id) {
                session.user.id = id;
            }

            return session;
        },
    },
});