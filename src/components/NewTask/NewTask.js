import { useState } from 'react';
import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from '../../hooks/use-http';

const NewTask = (props) => {
  console.log('new Task')
  const { isLoading, error, sendRequest } = useHttp();

  const enterTaskHandler = async (taskText) => {
    console.log('enterTaskHandler')
    sendRequest({
      url: 'https://react-udemy-4cfda-default-rtdb.europe-west1.firebasedatabase.app/.json',
      method: 'POST',
      body: { text: taskText },
      headers: {
        'Content-Type': 'application/json',
      },
    }, addTask.bind(this, taskText));
    // this func is now binded to the tastText in 'this' context
  };

  function addTask(taskText, taskData) {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };
    props.onAddTask(createdTask);
  }

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};


export default NewTask;
