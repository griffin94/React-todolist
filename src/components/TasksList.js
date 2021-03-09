import React, { useState } from "react";
import styled from "styled-components";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import AddTasksForm from "./AddTasksForm";

export const DEFAULT_STATE = {
  id: null,
  value: "",
};

const TasksList = ({ tasks, removeTask, editTask, changeTaskStatus }) => {
  const [edit, setEdit] = useState(DEFAULT_STATE);

  const editHandler = (updatedTask) => {
    editTask(updatedTask);
    setEdit(DEFAULT_STATE);
  };

  const keyPressHandler = (e, id) => {
    e.code === "Enter" && changeTaskStatus(id);
  };

  return (
    <List>
      {tasks.map((task, index) =>
        task.id === edit.id ? (
          <AddTasksForm
            key={task.id}
            editTask={editHandler}
            edit={edit}
            setEdit={setEdit}
          />
        ) : (
          <ListItem
            key={task.id}
            complete={task.isComplete}
            tabIndex='0'
            onClick={() => changeTaskStatus(task.id)}
            onKeyPress={(e) => keyPressHandler(e, task.id)}
          >
            {`${index + 1}. ${task.value}`}
            <ButtonsContainer>
              <Button
                onClickCapture={() =>
                  setEdit({ id: task.id, value: task.value })
                }
              >
                <EditIcon style={{ fontSize: "24px" }} />
              </Button>
              <Button onClickCapture={() => removeTask(task.id)}>
                <DeleteForeverIcon style={{ fontSize: "24px" }} />
              </Button>
            </ButtonsContainer>
          </ListItem>
        )
      )}
    </List>
  );
};

export default TasksList;

const List = styled.ul`
  list-style: none;
  margin-top: 20px;
  text-align: justify;
`;
const ListItem = styled.li`
  cursor: pointer;
  min-height: 71px;
  font-size: 1.15em;
  padding: 20px;
  margin: 10px 0;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  opacity: ${(props) => (props.complete ? "0.2" : "1")};
  text-decoration: ${(props) => (props.complete ? "line-through" : "none")};

  @media (min-width: 600px) {
    min-height: 75px;
  }

  background: linear-gradient(
    90deg,
    rgba(255, 118, 20, 1) 0%,
    rgba(255, 84, 17, 1) 100%
  );

  :nth-child(4n + 1) {
    background: linear-gradient(
      90deg,
      rgba(93, 12, 255, 1) 0%,
      rgba(155, 0, 250, 1) 100%
    );
  }

  :nth-child(4n + 2) {
    background: linear-gradient(
      90deg,
      rgba(255, 12, 241, 1) 0%,
      rgba(250, 0, 135, 1) 100%
    );
  }

  :nth-child(4n + 3) {
    background: linear-gradient(
      90deg,
      rgba(20, 159, 255, 1) 0%,
      rgba(17, 122, 255, 1) 100%
    );
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  margin-left: 20px;
  align-self: flex-start;
`;

const Button = styled.button`
  cursor: pointer;
  background: transparent;
  display: flex;
  justify-content: center;
  border: none;
  padding: 5px;
`;
