import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import "./TodoList.css";

const STORAGE_KEY = "todos"; // Constant for local storage key

export default function TodoList() {
  let [todos, setTodos] = useState(() => {
    const storeTodos = localStorage.getItem(STORAGE_KEY);
    return storeTodos ? JSON.parse(storeTodos) : [];
  });

  let [newtodo, setNewtodo] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]); // todos as a Dependency

  let addNewTask = () => {
    //Adding new Task
    //console.log("New task is successfuly added !");
    if (newtodo.trim() !== "") {
      setTodos([...todos, { id: uuidv4(), task: newtodo, isDone: false }]);

      setNewtodo("");
      toast.success("Task is Added", {
        position: "top-center",
      });
    } else {
      toast.error("Task can't be empty", {
        position: "top-center",
      });
    }
  };

  let updateTodoValue = (event) => {
    //console.log(event.target.value);
    setNewtodo(event.target.value);
  };
  let deleteTodo = (id) => {
    //using filter method Delete the task
    const newtodo = todos.filter((prevTodes) => prevTodes.id != id);
    setTodos(newtodo);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newtodo));
    toast.error("Task is Deleted", {
      position: "top-center",
    });
  };
  let markAsDone = (id) => {
    //Mark as the  Task is completed 
    const Done = (prevTodes) =>
      prevTodes.map((todo) => {
        if (todo.id == id) {
          toast.success("Task is Completed !", {
            position: "top-center",
          });
          return {
            ...todo,
            isDone: true,
          };
        } else {
          return todo;
        }
      });

    setTodos(Done);
  };
  return (
    <section className="hero">
      <div>
        <Toaster richColors />
        <h2>Tasks to Do</h2>
        <TextField
          id="filled-basic"
          // label="Add Task"
          // variant="filled"
          placeholder="Add Task"
          value={newtodo}
          color="success"
          size="small"
          onChange={updateTodoValue}
          required
          focused
        />
        &nbsp; &nbsp;
        <Button
          variant="contained"
          onClick={addNewTask}
          onSubmit={() => toast.success("Task is Added")}
        >
          <AddIcon />
        </Button>
        <h4>Your Task</h4>
        <div className="container">
          {todos.map((todo) => (
            <li key={todo.id}>
              <span
                style={todo.isDone ? { textDecoration: "line-through" } : {}}
              >
                <b>{todo.task}</b> &nbsp;
              </span>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => deleteTodo(todo.id)}
              ></Button>
              &nbsp; &nbsp;
              <Button
                variant="contained"
                color="success"
                onClick={() => markAsDone(todo.id)}
              >
                <CheckIcon />
              </Button>
            </li>
          ))}
        </div>
      </div>
    </section>
  );
}
