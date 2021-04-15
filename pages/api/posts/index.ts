import {NextApiRequest, NextApiResponse} from "next";
import {getSession} from "next-auth/client";
import {Post} from "../../../models";

const allowedMethods = ['GET', 'POST'];

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body } = req;
    const session = await getSession({req});

    if (!session) {
        return res.status(403).json('Access Denied: You must log in first.');
    }

    if (!allowedMethods.filter(m => m === method).length) {
        return res.status(400).json('Allowed Methods: ' + allowedMethods.join(','));
    }

    if (method === 'POST') {
        const post = new Post({
            title: body.title,
            content: body.content || '',
            authorId: session.user.id,
        });

        await post.save();

        return res.status(201).json(post);
    }

    // find posts by this user
    const posts = await Post.find({ authorId: session.user.id });

    return res.status(200).json(posts);
};