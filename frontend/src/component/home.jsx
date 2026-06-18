import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {useAuth} from "../context/authcontext"
import { useNavigate } from "react-router-dom";
function Home() {
   const{ user,logout}=useAuth();
const navigate=useNavigate();
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [subTodos, setSubTodos] = useState([]);
  const [subTask, setSubTask] = useState("");

  const [image, setImage] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategoryId = searchParams.get("category");

  const selectedCategory = categories.find(
    (item) => item._id === selectedCategoryId,
  );

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategoryId) {
      fetchSubTodos();
    }
  }, [selectedCategoryId]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/api/todo/alltodo", {
        withCredentials: true,
      });

      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSubTodos = async () => {
    try {
      const res = await axios.get(
        `/api/todo/allsubtodo/${selectedCategoryId}`,
        {
          withCredentials: true,
        },
      );

      setSubTodos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createCategory = async () => {
    if (!category.trim()) return;

    try {
      const res = await axios.post(
        "/api/todo/createcategory",
        { category },
        { withCredentials: true },
      );

      setCategories((prev) => [...prev, res.data]);
      setCategory("");
    } catch (error) {
      console.log(error);
    }
  };

  const createSubTodo = async () => {
    try {
      const formData = new FormData();

      formData.append("description", subTask);

      if (image) {
        formData.append("todoimage", image);
      }

      const res = await axios.post(
        `/api/todo/createsubtodo/${selectedCategoryId}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setSubTodos((prev) => [...prev, res.data]);
      setSubTask("");
      setImage(null);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const handleLogout = async () => {
  try {
      const result = await logout();
      if (result.success) {
        navigate('/');
        
      } 
    } catch (err) {
      console.log(err);
    }
};

  return (
      
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="flex justify-between items-center mb-8 bg-gray-900 px-6 py-4 rounded-xl">

  {/* Username */}
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center text-white font-bold">
      P
    </div>

    <div>
      <p className="text-gray-400 text-sm">Welcome</p>
      <p className="text-white font-semibold">
        {user?.fullname}
      </p>
    </div>
  </div>

  {/* Logout Button */}
  <button
    onClick={handleLogout}
    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
  >
    Logout
  </button>

</div>


      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl font-bold mb-8">Advanced Todo</h1>

        {/* Selected Category */}
        {selectedCategory && (
          <div className="mb-10 bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
            <h2 className="text-3xl font-bold text-violet-400 mb-6">
              {selectedCategory.category}
            </h2>

            {/* Add Subtask */}
            <div className="flex gap-3 mb-6">
              <input
                type="text"
                value={subTask}
                onChange={(e) => setSubTask(e.target.value)}
                placeholder="Add a subtask..."
                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none"
              />
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />

              <button
                className="bg-emerald-600 hover:bg-emerald-700 px-5 rounded-xl"
                onClick={createSubTodo}
              >
                Add
              </button>
            </div>

            {/* SubTodos */}
            <div className="space-y-3">
              {subTodos.length > 0 ? (
                subTodos.map((todo) => (
                  <div
                    key={todo._id}
                    className="bg-slate-800 p-4 rounded-xl flex items-center gap-4"
                  >
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      readOnly
                      className="w-5 h-5"
                    />

                    <span className="text-grey-700 text-slate-200">{todo.description}</span>
                  </div>
                ))
              ) : (
                <p className="text-slate-400">No subtasks yet.</p>
              )}
            </div>
          </div>
        )}

        {/* Category Input */}
        <div className="flex gap-4 mb-8">
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Create category..."
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none"
          />

          <button
            onClick={createCategory}
            className="bg-violet-600 hover:bg-violet-700 px-6 rounded-xl"
          >
            Add
          </button>
        </div>

        {/* Category List */}
        <div className="grid md:grid-cols-3 gap-5">
          {categories.map((item) => (
            <div
              key={item._id}
              onClick={() => setSearchParams({ category: item._id })}
              className={`cursor-pointer p-6 rounded-2xl transition duration-300 border shadow-lg
              ${
                selectedCategoryId === item._id
                  ? "bg-violet-600 border-violet-500 scale-105"
                  : "bg-slate-800 border-slate-700 hover:bg-slate-700"
              }`}
            >
              <h3 className="text-xl font-semibold">{item.category}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
