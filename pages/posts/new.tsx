import {useState} from "react";
import Link from "next/link";
import {useMutation} from "react-query";
import {createPost} from "../../api/posts";
import {useRouter} from "next/router";
import Layout from "../../components/Layout";

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const router = useRouter();

    const mutation = useMutation(createPost);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!title) {
            return;
        }

        await mutation.mutate({
            title,
            content
        });

        setTitle('');
        setContent('');

        await router.push('/');
    };

    return (
        <Layout>
            <form onSubmit={handleSubmit}>
                <h1>Create a new Post</h1>

                <label>
                    Title: { ' ' }
                    <input
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                    />
                </label>

                <br />
                <br />

                <label>
                    Content: { ' ' }
                    <textarea
                        value={content}
                        onChange={event => setContent(event.target.value)}
                        rows={5}
                        cols={25}
                    />
                </label>

                <br />
                <br />

                <Link href={"/"} passHref>
                    <a>&laquo; Back to Posts</a>
                </Link>

                { ' '}

                <button type={"submit"}>+ Save Post</button>
            </form>
        </Layout>
    );
};

export default CreatePost;