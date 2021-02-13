import { useState, useEffect } from 'react';
import apiUrls from '../api';

function Main() {

    const [tasks, setTasks] = useState([]);
    const [totalTasks, setTotalTasks] = useState();
    useEffect(() => {
        fetch(apiUrls.base + '?developer=Nismoteika')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            setTasks(data.message.tasks);
            setTotalTasks(data.message.total_task_count);
        });
    }, [])

    return (
      <main>
        <h1>tasks</h1>
        <ul>
            { tasks.length === 0 ? <li>no tasks</li> : tasks.map((item, idx) => {
                return (<li key={idx}>{item.name}</li>);
            }) }
        </ul>
      </main>
    );
}
  
export default Main;
  