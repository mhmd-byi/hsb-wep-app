import mongoose from "mongoose";

const YoutubeSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
});

export default mongoose.models.Youtube || mongoose.model("Youtube", YoutubeSchema);