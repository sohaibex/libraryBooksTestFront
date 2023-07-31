import { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

export default class ActionsCellRenderer extends Component {
  buttonClicked = (action, id) => {
    const { api, node, data, colDef, handleDelete, handleEdit } = this.props;
    const { field } = colDef;

    if (action === "edit") {
      api.startEditingCell({ rowIndex: node.rowIndex, colKey: field });
      const updatedBook = {
        ...data,
      };
      handleEdit(data.id, updatedBook);
    } else if (action === "delete") {
      Swal.fire({
        title: "Are you sure?",
        text: `Do you want to delete ${id}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          handleDelete(id);
        }
      });
    }
  };

  render() {
    const { data } = this.props;

    return (
      <span>
        <a
          className="actionsButton editButton"
          href="#"
          onClick={() => this.buttonClicked("edit", data.id)}
        >
          <FontAwesomeIcon icon={faEdit} />
        </a>
        <a
          className="actionsButton deleteButton"
          href="#"
          onClick={() => this.buttonClicked("delete", data.id)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </a>
      </span>
    );
  }

  static propTypes = {
    api: PropTypes.object.isRequired,
    node: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    colDef: PropTypes.object.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
  };
}