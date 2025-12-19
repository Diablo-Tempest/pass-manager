import mongoose from "mongoose";
const PassOPSchema = new mongoose.Schema({
    id: String,
    siteURL: String,
    username: String,
    password: String,
});
export const PassOP = mongoose.model('PassOP', PassOPSchema);
// id: {
//     type: String,
//     required: true,
//     unique: true
// },