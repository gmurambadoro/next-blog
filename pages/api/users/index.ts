import {NextApiRequest, NextApiResponse} from "next";
import database from "../../../middleware/database";

const allowedMethods = ['GET', 'POST'];

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        if (!allowedMethods.filter(method => req.method === method).length) {
            return res.status(400).json('Allowed Methods: ' + allowedMethods.join(','));
        }

        if (req.method === 'POST') {
            return res.status(201).json([]);
        }

        return res.status(200).json([]);
    } catch (err) {
        return res.status(500).json(err);
    }
};

export default database(handler);