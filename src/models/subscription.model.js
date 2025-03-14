import mongoose from "mongoose";
import { Schema } from "mongoose";

const subscriptionSchema = new Schema(
  {
    subscriber: {
      type: Schema.Types.ObjectId, //  this user who is subscribing
      ref: "User",
    },
    channel: {
      type: Schema.Types.ObjectId, //  this user who is being subscribed to
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
