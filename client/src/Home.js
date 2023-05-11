

// export default Home;
import { useContext, useState } from "react";
import UserContext from "./UserContext";
import axios from "axios";
import "./Home.css";

function Home() {
  const userInfo = useContext(UserContext);
  const [inputVal, setInputVal] = useState("");
  const [todos, setTodos] = useState([]);

  // useEffect(() => {
  //   if (userInfo.email) {
  //     axios
  //       .get("http://localhost:4000/todos", { withCredentials: true })
  //       .then((response) => {
  //         setTodos(response.data);
  //       });
  //   }
  // }, [userInfo.email]);

  if (!userInfo.email) {
    return "Login to view todo list";
  }

  function addTodo(e) {
     if (e && e.preventDefault) {
       e.preventDefault();
     }
    if (!userInfo.email) {
      return;
    }
    axios
      .put(
        "http://localhost:4000/todos",
        { text: inputVal },
        { withCredentials: true }
      )
      .then((response) => {
        setTodos([...todos, response.data]);
        setInputVal("");
      });
  }
    function updateTodoStatus(todo,e) {
      if (e && e.preventDefault) {
        e.preventDefault();
      }
      if (!userInfo.email) {
        return;
      }
    const data = { id: todo._id, done: !todo.done };
    axios
      .post("http://localhost:4000/todos", data, { withCredentials: true })
      .then(() => {
        const newTodos = todos.map((t) => {
          if (t._id === todo._id) {
            t.done = !t.done;
          }
          return t;
        });
        setTodos([...newTodos]);
      });
  }
// function deleteTodo(todo, e) {
//   if (e && e.preventDefault) {
//     e.preventDefault();
//   }
//   if (!userInfo.email) {
//     return;
//   }
//   axios
//     .delete(`http://localhost:4000/todos/${todo._id}`, {
//       withCredentials: true,
//     })
//     .then((response) => {
//      const updatedTodos = todos.filter((t) => t._id !== todo._id);
//       setTodos(updatedTodos);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

// function deleteAllTodos(e) {
//   if (e && e.preventDefault) {
//     e.preventDefault();
//   }
//   if (!userInfo.email) {
//     return;
//   }
//   axios
//     .delete("http://localhost:4000/todos", { withCredentials: true })
//     .then((response) => {
//       const updated = [];
//       setTodos(updated);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }


  return (
    <div>
      <div className="container">
        <form
          onSubmit={(e) => {
             if (e && e.preventDefault) {
               e.preventDefault();
             }
            addTodo(e);
          }}
        >
          <div className="form">
            <input
              type="text"
              className="input"
              placeholder="Enter a task"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
            />
            <button type="submit" className="add">
              Add Task
            </button>
          </div>
        </form>
        {todos.length > 0 ? (
          <div className="tasks">
            {todos.map((todo) => (
              <div key={todo._id} className={`task ${todo.done ? "done" : ""}`}>
                <span className="title">{todo.text}</span>
                <div className="actions">
                  <button
                    className={`status ${todo.done ? "done" : ""}`}
                    onClick={(e) => updateTodoStatus(todo,e)}
                  >
                    {todo.done ? "Not done" : " Done"}
                  </button>

                </div>
              </div>
            ))}

          </div>
        ) : (
          <div>No tasks found</div>
        )}
      </div>
    </div>
  );
}

export default Home;
