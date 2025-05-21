import mongoose, { mongo, Schema } from "mongoose"



const coursePurchaseSchema = new Schema({
    courseId: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "completed", "failed"]
    },
    paymentId: {
        type: String,
        required: true
    }

}, { timestamps: true });

export const CoursePurchase = mongoose.model("CoursePurchase", coursePurchaseSchema)