import React from "react";
import { Pencil, X, PlusSquare, Star, StarFill } from "react-bootstrap-icons";

export default function TodoAction({ id, isSubmitting, isFav, editMode, handleEdit, handleDelete, updateFav }) {

  return (<div className="todo-float-right col" disabled={isSubmitting}>
    <a onClick={() => updateFav(id)}>
      {isFav ? <StarFill /> : <Star />}
    </a>
    <a onClick={handleEdit}>
      {editMode ?
        <PlusSquare color="royalblue" size={20}></PlusSquare> :
        <Pencil color="royalblue" size={20}></Pencil>
      }
    </a>
    <a onClick={handleDelete}>
      <X color="royalblue" size={20}>
        Delete
      </X>
    </a>
  </div>);
}