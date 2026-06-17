
import mongoose, {Schema} from "mongoose";

const subTodoSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },

    isCompleted: {
      type: Boolean,
      default: false,
    },

    image: {
      type: String, // Cloudinary URL
      default: "",
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Todo"
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
  },
  { timestamps: true }
);


export const SubTodo = mongoose.model("SubTodo", subTodoSchema);