import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { v4 as uuidV4 } from "uuid";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import { DEFAULT_STATE } from "./TasksList";

const AddTasksForm = ({ addTask, editTask, edit, setEdit }) => {
  const [textField, setTextField] = useState(() => {
    return {
      value: edit ? edit.value : "",
      valid: true,
    };
  });

  const inputRef = useRef(null);

  useEffect(() => {
    edit && inputRef.current.select();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    const trimmedValue = textField.value.trim();
    if (trimmedValue.length) {
      editTask
        ? editTask({ value: trimmedValue, id: edit.id, isComplete: false })
        : addTask({ value: trimmedValue, id: uuidV4(), isComplete: false });
      setTextField({
        value: "",
        valid: true,
      });
    } else {
      setTextField({ value: "", valid: false });
    }
    inputRef.current.focus();
  };

  const validateForm = () => {
    const value = textField.value.trim();
    if (value.length) {
      setTextField({ value, valid: true });
      return true;
    } else {
      setTextField({ value: "", valid: false });
      return false;
    }
  };

  return (
    <Container>
      <Form onSubmit={submitHandler}>
        <Textfield
          type='text'
          placeholder='Wpisz'
          ref={inputRef}
          value={textField.value}
          onChange={(e) =>
            setTextField({ ...textField, value: e.target.value })
          }
        />
        {!editTask ? (
          <Button>Dodaj</Button>
        ) : (
          <ButtonsContainer>
            <Button type='submit' background='transparent'>
              <SaveIcon />
            </Button>
            <Button
              type='button'
              background='transparent'
              onClick={() => setEdit(DEFAULT_STATE)}
            >
              <CancelIcon />
            </Button>
          </ButtonsContainer>
        )}
      </Form>
      <ValidationOutput>
        {textField.valid ? "" : "Nieprawidłowa wartość"}
      </ValidationOutput>
    </Container>
  );
};

export default AddTasksForm;

const Container = styled.div``;
const Form = styled.form`
  display: flex;
  height: 45px;
`;
const Textfield = styled.input`
  min-width: 0;
  flex-grow: 1;
  border: 2px solid rgba(93, 12, 255, 1);
  border-radius: 6px 0 0 6px;
  background: transparent;
  padding: 0 10px;
  font-size: 1em;
  :focus {
    outline: none;
  }
`;
const Button = styled.button`
  height: 100%;
  flex-basis: 88px;
  padding: 0 10px;
  border: none;
  cursor: pointer;
  font-size: 1em;
  background: ${(props) =>
    props.background ||
    "linear-gradient(90deg, rgba(93, 12, 255, 1) 0%, rgba(155, 0, 250, 1) 100%)"};
  :last-child {
    border-radius: 0 6px 6px 0;
  }
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ValidationOutput = styled.div`
  color: red;
  margin-top: 5px;
  font-size: 1em;
  height: 21px;
  @media (min-width: 600px) {
    height: 25px;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  background: linear-gradient(
    90deg,
    rgba(93, 12, 255, 1) 0%,
    rgba(155, 0, 250, 1) 100%
  );
  border-radius: 0 6px 6px 0;
`;
