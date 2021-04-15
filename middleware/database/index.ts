import mongoose from "mongoose";
import {NextApiRequest, NextApiResponse} from "next";

const database = (handler) => async (req: NextApiRequest, res: NextApiResponse, ...restArgs) => {
    if (mongoose.connections[0].readyState) {
        // Use current db connection
        return handler(req, res, ...restArgs);
    }

    // Use new db connection
    await mongoose.connect(process.env.mongodburl, {
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useNewUrlParser: true
    });

    return handler(req, res, ...restArgs);
};

export default database;