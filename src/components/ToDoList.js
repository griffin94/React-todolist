import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AddTasksForm from "./AddTasksForm";
import Header from "./Header";
import TasksList from "./TasksList";

const KEY = "todolist-tasks";

const ToDoList = () => {
  const [tasks, setTasks] = useState(() => {
    const data = JSON.parse(localStorage.getItem(KEY));
    return data ? data : [];
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const removeTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const editTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === updatedTask.id) {
          return updatedTask;
        } else {
          return task;
        }
      })
    );
  };

  const changeTaskStatus = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          task.isComplete = !task.isComplete;
        }
        return task;
      })
    );
  };

  return (
    <Container>
      <Header />
      <AddTasksForm addTask={addTask} />
      <TasksList
        tasks={tasks}
        removeTask={removeTask}
        editTask={editTask}
        changeTaskStatus={changeTaskStatus}
      />
    </Container>
  );
};

export default ToDoList;

const Container = styled.div``;
