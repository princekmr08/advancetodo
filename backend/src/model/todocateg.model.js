
import mongoose, {Schema} from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    category: {
      type: String,   // User enters anything: Gym, Study, Travel, etc.
      required: true,
      trim: true,
    },

    isCompleted: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Todo = mongoose.model("Todo", todoSchema);