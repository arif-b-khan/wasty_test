import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Form, Row, Col } from "react-bootstrap";
import "./TodoList.scss";
import TodoAction from "./TodoActionPanel";

const schema = yup.object().shape({
  name: yup.string().required(),
});

export default function TodoList({ todo, handleDelete, handleFormSubmit, handleFavUpdate = () => { } }) {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(todo.name);
  let formikRef = React.createRef();

  function handleEditForm(values, actions) {
    console.log(JSON.stringify(values));
    let formResult = false;
    (async () => { formResult = await handleFormSubmit(todo.id, values, actions); })();
    console.log(`FormResult: ${formResult}`);
    if (formResult) setEdit(false);
  }

  function handleEdit(e) {
    e.preventDefault();
    setEdit(!edit);
  }

  function handleTodoDelete(e) {
    e.preventDefault();
    handleDelete(e);
  }

  function handleTodoClear(e) {
    e.preventDefault();
    console.log("Clearing Todo form");
    setName(todo.name);
    setEdit(false);
  }

  function onFormikSubmit() {
    formikRef.handleSubmit();
  }

  function handleFav(id) {
    console.log(`Fav id: ${id}`);
    handleFavUpdate(id);
  }

  const readOnlyForm = (
    <div className="row">
      <div className="col">{name}</div>
      <TodoAction
        id={todo.id}
        isSubmitting={false}
        isFav={todo.isFav}
        handleEdit={handleEdit}
        handleDelete={handleTodoDelete}
        updateFav={id => handleFav(id)}
      ></TodoAction>
    </div>
  );
  const editForm = (
    <Formik
      innerRef={(p) => (formikRef = p)}
      validationSchema={schema}
      onSubmit={handleEditForm}
      initialValues={{
        name: name,
        isFav: false
      }}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        touched,
        isValid,
        errors,
        status,
        isSubmitting,
      }) => {
        const isInvalid = !isValid;
        return (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group
              as={Row}
              className="Todo-form-group mb-3"
              controlId="handleName"
            >
              <Col sm="10">
                <Form.Control
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={touched.name && !!errors.name}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Col>
              <Col sm="2">
                <TodoAction
                  id={todo.id}
                  editMode={edit}
                  isSubmitting={false}
                  handleEdit={onFormikSubmit}
                  handleDelete={handleTodoClear}
                  updateFav={handleFav}
                ></TodoAction>
              </Col>
            </Form.Group>

            {status && status.name && (
              <div className="myapp-error">{status.name}</div>
            )}
          </Form>
        );
      }}
    </Formik>
  );

  return (
    <div className="todo container">{edit ? editForm : readOnlyForm}</div>
  );
}
