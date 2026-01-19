import mongoose, { Schema, model, models } from "mongoose";

const DonationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status:{
      type:String,
      required:true,
      enum:["pending","success","failed"],
      default:"pending",
    },
    transactionId:{
      type:String,
    },
  },{timestamps:true});
  export default models.Donation||model("Donation",DonationSchema)