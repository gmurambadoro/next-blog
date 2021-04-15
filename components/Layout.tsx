import {signIn, signOut, useSession} from "next-auth/client";
import {useRouter} from "next/router";

export default function Layout({ children }) {
    const [session, loading] = useSession();
    const authHandler = session ? signOut : signIn;
    const router = useRouter();

    if (loading) {
        return <p>Loading session...</p>;
    }

    if (!loading && !session) {
        router.push('/api/auth/signin');
    }

    return (
        <div>
            <header>
                {loading && <p>Loading...</p>}

                {session && <p>You are logged in as {session?.user?.email || session?.user?.name}.</p>}

                <br />

                <button onClick={() => authHandler()}>{session ? 'Sign Out' : 'Sign In'}</button>

            </header>

            <main>
                {children}
            </main>

        </div>
    );
}