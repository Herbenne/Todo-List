import './App.css';
import Task from './Task';
import TaskForm from './TaskForm';
import {useState} from "react";
import {useEffect} from "react";

function App() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    return storedTasks !== null ? storedTasks : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  function addTasks(name){
      setTasks(prev => {
        return [...prev, {name:name,done:false}];
      });
  }

  function updateTaskDone(taskIndex, newDone) {
      setTasks(prev => {
        const newTasks = [...prev];
        newTasks[taskIndex].done = newDone;
        return newTasks;
      });
  }

  function removeTask(indexToRemove) {
    setTasks(prev => {
      return prev.filter((taskObject, index) => 
        index !== indexToRemove);
    });
  }

  function renameTask(index, newName) {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[index].name = newName;
      return [...prev];
    })
  }

  const numberComplete = tasks.filter(t => t.done).length;
  const numberTotal = tasks.length;

  return (
    <main>
        <h1>To Do List Application</h1>
        <h3>{numberComplete} / {numberTotal} Complete</h3>
        <TaskForm onAdd={addTasks}/>
        {tasks.map((task, index) => (
          <Task {...task}
                onRename={newName => renameTask(index, newName)}
                onTrash={() => removeTask(index)}
                onToggle={done => updateTaskDone(index, done)}/>
          ))}
    </main>
  );
}

export default App;
