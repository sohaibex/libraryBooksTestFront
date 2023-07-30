import { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

export default class ActionsCellRenderer extends Component {
  buttonClicked = (action) => {
    const { api, node, colDef, handleDelete } = this.props;
    const { field } = colDef;
    const { data } = node;

    if (action === "edit") {
      api.startEditingCell({ rowIndex: node.rowIndex, colKey: field });
    } else if (action === "delete") {
      handleDelete(data.athlete);
    }
  };

  render() {
    return (
      <span>
        <a
          className="actionsButton editButton"
          href="#"
          onClick={() => this.buttonClicked("edit")}
        >
          <FontAwesomeIcon icon={faEdit} />
        </a>
        <a
          className="actionsButton deleteButton"
          href="#"
          onClick={() => this.buttonClicked("delete")}
        >
          <FontAwesomeIcon icon={faTrash} />
        </a>
      </span>
    );
  }

  static propTypes = {
    api: PropTypes.object.isRequired,
    node: PropTypes.object.isRequired,
    colDef: PropTypes.object.isRequired,
    handleDelete: PropTypes.func.isRequired,
  };
}
