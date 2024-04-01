import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { Toaster, toast } from 'sonner';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';

export default function TodoList(){
    let [todos, setTodos] = useState([{task:"Sample Text" , id : uuidv4(), isDone: false}]);
    let [newtodo, setNewtodo] = useState("");

    let addNewTask = () => {
        //console.log("New task is successfuly added !");
        if(newtodo.trim() !== ''){
            setTodos((prevTodes)=> {
                return [...prevTodes , {task: newtodo , id: uuidv4(),isDone: false}];
            });  
            setNewtodo("");
            toast.success("Task is Added",{
                position: 'top-center',
              });
        }else{
            // alert("Task most not be empty");
            toast.error("Task can't be empty",{
                position: 'top-center',
              });
        }
        
    }

    let updateTodoValue = (event) => {
        //console.log(event.target.value);
        setNewtodo(event.target.value);
    }
    let deleteTodo = (id)=>{
        //using filter method
        setTodos(todos.filter((prevTodes)=> prevTodes.id != id));
        toast.error("Task is Deleted",{
            position: 'top-center',
          });
    };
    let markAsDone = (id)=>{
        setTodos((prevTodes)=>
            prevTodes.map((todo) => {
                if( todo.id == id){
                    toast.success("Task is Completed !",{
                        position: 'top-center',
                      });
                    return {
                        ...todo ,
                        isDone: true,
                    };
                    
                } else{
                    return todo;
                }
            })
        )
    };
    return(
        <section className="hero">
        <div>
        <Toaster  richColors/>
        <h2>Creater Soumya Jagannath Ojha</h2>
        <TextField id="filled-basic"  variant="filled" placeholder='Add Task' value={newtodo} onChange={updateTodoValue} required/>
        &nbsp; &nbsp;
        <Button variant="contained" onClick={addNewTask} onSubmit={()=> toast.success("Task is Added")} >
             <AddIcon />
        </Button>

        <h4>Tasks to Do</h4>
        <div className='container'>
        {todos.map((todo)=>(
          <li key={todo.id}>
           <span style={todo.isDone ? {textDecoration: "line-through"}: {}} ><b>{todo.task}</b>  &nbsp;</span> 
            <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={()=> deleteTodo(todo.id)}>
                
            </Button>
            &nbsp; &nbsp;
            <Button variant="contained" color="success" onClick={()=> markAsDone(todo.id)}><CheckIcon/></Button>
            
        </li>
        ))}
        </div>
        </div>
        
        
      </section>
    )
}