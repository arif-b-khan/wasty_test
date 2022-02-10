import React from "react";
import { useQueryClient, useIsFetching } from "react-query";
import { Formik } from "formik";
import * as yup from "yup";

import { Form, Button, ListGroup, Row, Col } from "react-bootstrap";

import CustomSpinner from "../Shared/CustomSpinner";
import useFetch from "../Services/useFetch";
import postData from "../Services/postData";
import deleteData from "../Services/deleteData";
import updateData from "../Services/updateData";
import "./Todos.scss";
import withPagination from "./Shared/PaginationWrapper";

const schema = yup.object().shape({
  name: yup.string().required(),
});

let counter = 0;
function Todos(props) {
  const API_PATH = "todos";
  const isFetching = useIsFetching();
  const queryClient = useQueryClient();
  let { data: todos, error, isLoading } = useFetch(API_PATH);

  const {
    mutateAsync: postMutateAsync,
    error: postError,
    isLoading: postLoading,
  } = postData(API_PATH);

  const {
    mutateAsync: deleteMutateAsync,
    error: deleteError,
    isLoading: deleteLoading,
  } = deleteData(API_PATH);


  const {
    mutateAsync: updateMutateAsync,
    error: updateError,
    isLoading: updateLoading,
  } = updateData(API_PATH);

  const todoError = error && postError && deleteError;
  console.log(
    `IsLoading: ${isLoading}, PostLoading: ${postLoading} DeleteLoading: ${deleteLoading}, Fetching: ${isFetching}`
  );
  if (isLoading || postLoading || deleteLoading || updateLoading || isFetching)
    return <CustomSpinner />;
  if (error || postError || deleteError || updateError) throw todoError;
  counter = counter + 1;
  console.log(counter);

  const PagedTodo = withPagination(ListGroup, todos);

  function invalidateTodos() {
    queryClient.invalidateQueries(API_PATH, { exact: true });
  }

  async function deleteTodo(id) {
    console.log(`Todo deletion id ${id}`);
    try {
      todos = [...todos.filter((a) => a.id !== id)];
      await deleteMutateAsync(id);
      console.log(`Todo has been delete`);
      invalidateTodos();
    } catch (err) {
      console.error(err);
    }
  }

  async function addTodoForm(data, actions) {
    if (todos.find((a) => a.name === data.name)) {
      console.log("Todo exists");
      actions.setStatus({
        name: `Todo: "${data.name}" already exists`,
      });
      return;
    }
    try {
      const newTodo = await postMutateAsync(data);
      invalidateTodos();
      console.log(newTodo);
      actions.resetForm();
    } catch (error) {
      console.error(error);
    } finally {
      console.log("Completed");
    }
  }

  async function updateTodoForm(todoId, data, actions) {
    console.log(`TodoId: ${todoId}`);
    if (todos.find((a) => (todoId !== a.id && a.name === data.name))) {
      console.log("Todo exists");
      actions.setStatus({
        name: `Todo: "${data.name}" already exists`,
      });
      return false;
    }
    try {
      const updateTodo = await updateMutateAsync({ ...data, id: todoId });
      invalidateTodos();
      console.log(updateTodo);
      actions.resetForm();
    } catch (error) {
      console.error(error);
    } finally {
      console.log("Completed");
    }
    return true;
  }

  async function updateFav(todoItem) {
    console.log(`Todo name (UpdateFav) : ${todoItem.name}`);
    try {
      todoItem.isFav = !todoItem.isFav;
      const updateTodo = await updateMutateAsync({ ...todoItem, id: todoItem.id });
      invalidateTodos();
      console.log(updateTodo);
    } catch (error) {
      console.error(error);
    } finally {
      console.log("Completed");
    }
  }

  return (
    <>
      <Formik
        validationSchema={schema}
        onSubmit={addTodoForm}
        initialValues={{
          name: "",
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
                className="todo-form-group mb-3"
                controlId="handleName"
              >
                <Form.Label className="todo-form-label" column sm="2">
                  Todo:
                </Form.Label>
                <Col sm="8">
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
                <div className="col-sm-2">
                  <Button type="submit" disabled={isInvalid || isSubmitting}>
                    +
                  </Button>
                </div>
              </Form.Group>
              {status && status.name && (
                <div className="myapp-error">{status.name}</div>
              )}
            </Form>
          );
        }}
      </Formik>
      <PagedTodo deleteTodo={deleteTodo} updateTodoForm={updateTodoForm} size={4} updateFav={(td) => updateFav(td)} />
    </>
  );
}

export default Todos;
