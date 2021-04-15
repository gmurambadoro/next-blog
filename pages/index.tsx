import {signIn, signOut, useSession} from "next-auth/client";
import {useQuery} from "react-query";
import {getAllPosts} from "../api/posts";

function Home() {
    const [session, loading] = useSession();
    const handleAuth = session ? signOut : signIn;

    const {isLoading, error, data} = useQuery('posts', getAllPosts);

    if (isLoading) {
        return null;
    }

    if (error) {
        return <p>Error: {error}</p>
    }

    return (
        <div>
            <h1>Home Page</h1>

            {loading && <p>Loading...</p>}

            {session && <p>You are logged in as {session?.user?.email || session?.user?.name}.</p>}

            <br />

            <button onClick={() => handleAuth()}>{session ? 'Sign Out' : 'Sign In'}</button>

            {
                session &&

                <>
                    {!data?.length && <p>There are no posts.</p>}

                    {data?.length ? <h1>Posts</h1> : null}

                    {data?.length ? data.map(post => <p key={post.id}>{post.title}</p>) : null}
                </>
            }

        </div>
    );
}

export default Home;