import { useEffect, useState } from "react";
import "./App.css";
import { MdDeleteForever } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { parse } from "postcss";
function App() {
  const [dateTime, setDateTime] = useState("");
  const [Input, SetInput] = useState("");
  const [task, SetTask] = useState(()=>{
    const savedTask = localStorage.getItem("task");
    const initialTask = JSON.parse(savedTask);
    return initialTask || [];
  
  });
  // const [checked, setChecked] = useState(false);

  useEffect(() => {
      const interval = setInterval(() => {
      const now = new Date();
      const time = now.toLocaleTimeString();
      const date = now.toLocaleDateString();
      setDateTime(`${date}-${time}`);
    }, 1000);

    return () => clearInterval(interval);

    
  });

  const handleInput = (e) => {
    SetInput(e.target.value);
    
  };

  const handleForm = (e) => {
    e.preventDefault();
    if (!Input) return;
    if(task.includes(Input)) return; 
    SetTask([...task, Input]);

    SetInput(" ");
  };


  localStorage.setItem("task", JSON.stringify(task));
  // const handleCheck =((index)=>{
  //   //  task.filter((task, i) => i === index ? setChecked(!checked) : task)
  //    console.log(index)
  // })

  //CLEAR ALL
  const handleClearAll = () => {
    SetTask([]);
  };

  const handleDeleteBtn = (index) => {
    let resultTodo = task.filter((task, i) => i !== index);
    SetTask(resultTodo);
  };

  return (
    <>
      <section className="header">
        <h1>Todo List</h1>
        <p className="date-time">{dateTime}</p>
      </section>

      <section className="form">
        <form onSubmit={handleForm}>
          <input
            type="text"
            value={Input}
            placeholder="Enter your todo"
            required
            onChange={handleInput}
          />
          <button type="submit">Add</button>
        </form>

        {task.map((item, index) => {
          return (
            <span className="todoItem" key={index}>
              <p>{item}</p>
              {/* <FaCheck  onClick={() => handleCheck(index)} /> */}
              <MdDeleteForever onClick={() => handleDeleteBtn(index)}/>
            </span>
          );
        })}
        <button className="clearAll" onClick={handleClearAll}>
          Clear All
        </button>
      </section>
    </>
  );
}

export default App;
