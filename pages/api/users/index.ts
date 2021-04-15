import { PrismaClient } from "@prisma/client";
import {NextApiRequest, NextApiResponse} from "next";

const prisma = new PrismaClient();

const allowedMethods = ['GET', 'POST'];

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        if (!allowedMethods.filter(method => req.method === method).length) {
            return res.status(400).json('Allowed Methods: ' + allowedMethods.join(','));
        }

        if (req.method === 'POST') {
            const newUser = await prisma.user.create({
                data: {
                    name: 'Gavin Murambadoro',
                    email: 'systemdev@example.com',
                }
            });

            return res.status(200).json(newUser);
        }

        const users = await prisma.user.findMany({});

        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json(err);
    }
};