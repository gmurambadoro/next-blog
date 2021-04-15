import Link from "next/link";
import {useQuery} from "react-query";
import {getAllPosts} from "../api/posts";
import Layout from "../components/Layout";

const Home = () => {
    const {isLoading, error, data} = useQuery('getAllPosts', getAllPosts);

    if (isLoading) {
        return <p>Loading query...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>
    }

    return (
        <Layout>
            <>
                {!data?.length && <p>There are no posts.</p>}

                <h1>
                    Posts
                </h1>

                <p>
                    <Link href={"/posts/new"}>+ Add new Post</Link>
                </p>

                {data?.length ? data.map(post => (
                    <p key={post._id}>
                        <Link href={`/posts/${post._id}`} passHref>
                            <a>{post.title}</a>
                        </Link>
                    </p>
                )) : null}
            </>
        </Layout>
    );
}

export default Home;