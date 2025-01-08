import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { TaskItem } from './components/TaskItem';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/api/tasks")
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        setMessage("Error getting tasks");
        console.error("Error getting tasks: ", error);
      })
  }, [])

  const handleAddTask = async () => {
    axios.post("http://localhost:3001/api/tasks", { text: taskText })
      .then(response => {
        setTasks([...tasks, response.data]);
        setTaskText("");
      })
      .catch(error => {
        setMessage("Error adding new task");
        console.error("Error adding new task: ", error);
      })
  }

  const deleteTask = (id) => {
    axios.delete(`http://localhost:3001/api/tasks/${id}`)
      .then(() => setTasks(tasks.filter(task => task.id !== id)))
      .catch(error => console.error('Error deleting task:', error));
  };

  return (
    <>
      <div className="min-h-screen bg-[#15204b] flex items-center justify-center">
        <div className="w-96 bg-slate-900 p-4 shadow-lg rounded text-[#eeeeee]">
          <h1 className="text-2xl font-bold text-center mb-4">Task Manager</h1>
          <input type="text" value={taskText} onChange={(e) => setTaskText(e.target.value)} className="w-full p-2 border border-gray-300 bg-[#e1e1e1] rounded mb-4 text-slate-900 font-medium outline-none" placeholder="Add a new task" />
          <button onClick={() => handleAddTask()} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium p-2 rounded" type="button">Add Task</button>
          {message && <p className='p-2 font-medium text-center text-red-900'>{message}</p>}
          {tasks && tasks.length > 0 ? <ul className="mt-4">
            {tasks.map(task => (
              <TaskItem key={task.id} task={task} onDelete={deleteTask} />
            ))}
          </ul> : <h2 className='p-2 text-xl font-medium text-center text-[#e1e1e1]'>There is no Task. Add one</h2>}
        </div>
      </div>
    </>
  );
}

export default App;
