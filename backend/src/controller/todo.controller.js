import { Todo } from "../model/todocateg.model.js";
import { SubTodo } from "../model/subtodo.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const todocategory = async (req, res) => {
  const { category } = req.body;
  const userid = req.user._id;

  try {
    const todo = await Todo.create({ category, owner: userid });

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const createSubTodo = async (req, res) => {
  try {
    const userid = req.user._id;
    const category = req.params.category;
    const { description } = req.body;
    const localFilePath = req.file?.path;

    console.log("localFilePath", localFilePath);

    const cloudianryres = localFilePath
      ? await uploadOnCloudinary(localFilePath)
      : null;

    const imageurl = cloudianryres?.url || "";

    const newSubTodo = await SubTodo.create({
      description,
      owner: userid,
      category,
      image: imageurl,
    });

    res.status(201).json(newSubTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const findtodo = async (req, res) => {
  try {
    const userid = req.user._id;
    const todos = await Todo.find({ owner: userid });
    res.status(200).json(todos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const findsubtodo = async (req, res) => {
  try {
    const userid = req.user._id;
    const category = req.params.category;
    const subtodos = await SubTodo.find({ owner: userid, category: category });
    res.status(200).json(subtodos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export { todocategory, createSubTodo, findtodo, findsubtodo };
