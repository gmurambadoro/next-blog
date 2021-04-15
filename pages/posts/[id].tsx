import {useRouter} from "next/router";
import {useQuery} from "react-query";
import Link from "next/link";
import axios from "axios";
import Layout from "../../components/Layout";

const SinglePost = () => {
    const router = useRouter();

    const query = useQuery(`getPost_${router.query.id}`, async () => {
        const postData = await axios.get(`/api/posts/${router.query.id}`);

        return await postData.data;
    });

    if (query.isLoading) {
        return <p>Loading...</p>;
    }

    if (query.isError) {
        return <p>Error: {query.error}</p>;
    }

    const { data: post } = query;

    return (
        <Layout>
            <h1>{post?.title || ''}</h1>

            <article>
                {post?.content || ''}
            </article>

            <p>
                <Link href={"/"} passHref>
                    <a>&laquo; Back</a>
                </Link>
            </p>
        </Layout>
    );
};

export default SinglePost;