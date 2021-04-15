import mongoose, {Schema} from "mongoose";
import {DATABASE_URL} from "../config";

mongoose.Promise = global.Promise;

const connect = async () => {
    await mongoose.connect(DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

(async () => {
    await connect()
})(); // connect asynchronously to mongodb

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: false,
    },
    authorId: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

export { Post };





