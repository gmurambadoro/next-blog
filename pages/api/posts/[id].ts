import {NextApiRequest, NextApiResponse} from "next";
import {isMethodAllowed} from "../../../utils";
import {getSession} from "next-auth/client";
import {Post} from "../../../models";

const allowedMethods = ['GET', 'PUT', 'DELETE'];

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (!isMethodAllowed(req.method, allowedMethods)) {
        return res.status(400).json('Allowed Methods: ' + allowedMethods.join(','));
    }

    const session = await getSession({req});

    if (!session?.user?.id) {
        return res.status(403).json('Access Denied');
    }

    const { body, method } = req;

    switch (method) {
        case 'PUT':
            break;

        case 'DELETE':
            break;

        case 'GET':
            const post = await Post.findOne({ _id: req?.query?.id || null });

            if (!post) {
                return res.status(404).json('Not Found');
            }

            return res.status(200).json(post);
    }
};