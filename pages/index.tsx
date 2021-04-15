import {signIn, signOut, useSession} from "next-auth/client";

function Home() {
    const [session, loading] = useSession();

    const authenticationMethod = session ? signOut : signIn;

    console.log(session);

    return (
        <div>
            <h1>Home Page</h1>

            {loading && <p>Loading...</p>}

            {session && <p>You are logged in as {session?.user?.email || session?.user?.name}.</p>}

            <br />

            <button onClick={() => authenticationMethod()}>{session ? 'Sign Out' : 'Sign In'}</button>

        </div>
    );
}

export default Home;