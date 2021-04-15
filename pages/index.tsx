import Link from "next/link";
import {signIn, signOut, useSession} from "next-auth/client";
import {useQuery} from "react-query";
import {getAllPosts} from "../api/posts";

function Home() {
    const [session, loading] = useSession();
    const handleAuth = session ? signOut : signIn;

    const {isLoading, error, data} = useQuery('getAllPosts', getAllPosts);

    if (loading) {
        return <p>Loading session...</p>;
    }

    if (isLoading) {
        return <p>Loading query...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>
    }

    return (
        <div>
            {loading && <p>Loading...</p>}

            {session && <p>You are logged in as {session?.user?.email || session?.user?.name}.</p>}

            <br />

            <button onClick={() => handleAuth()}>{session ? 'Sign Out' : 'Sign In'}</button>

            {
                session &&

                <>
                    {!data?.length && <p>There are no posts.</p>}


                    <h1>
                        Posts
                    </h1>

                    <p>
                        <Link href={"/posts/new"}>+ Add new Post</Link>
                    </p>

                    {data?.length ? data.map(post => <p key={post._id}>{post.title}</p>) : null}
                </>
            }

        </div>
    );
}

export default Home;