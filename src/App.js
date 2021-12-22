import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

function App() {
  console.log('app');

  const [tasks, setTasks] = useState([]);

  const httpData = useHttp();
  const { sendRequest: fetchTasks } = httpData;

  useEffect(() => {
    const transformTasks = (data) => {
      console.log('transform')
      const loadedTasks = [];
      for (const taskKey in data) {
        loadedTasks.push({ id: taskKey, text: data[taskKey].text });
      }
      setTasks(loadedTasks);
    };

    fetchTasks(
      { url: 'https://react-udemy-4cfda-default-rtdb.europe-west1.firebasedatabase.app/.json' },
      transformTasks
    );
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={httpData.isLoading}
        error={httpData.error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
