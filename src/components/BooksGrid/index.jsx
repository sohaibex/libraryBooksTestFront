import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import ActionsCellRenderer from "../../utils/ActionsCellRenderer";
import BookForm from "../BookForm/index";
import "./BookGrid.css";
import {
  createBook,
  editBook,
  getAllBooks,
  removeBook,
} from "../../service/BookService";

const MainComponent = () => {
  const [rowData, setRowData] = useState(null);

  const onGridReady = async () => {
    const books = await getAllBooks();
    if (books.error) {
      console.error(books.error);
    } else {
      setRowData(books);
    }
  };

  const handleAdd = async (newBook) => {
    const response = await createBook(newBook);
    if (response.error) {
      console.error(response.error);
    } else {
      onGridReady();
    }
  };

  const handleDelete = async (id) => {
    const response = await removeBook(id);
    if (response.error) {
      console.error(response.error);
    } else {
      onGridReady();
    }
  };

  const handleEdit = async (id, updatedBook) => {
    const response = await editBook(id, updatedBook);
    if (response.error) {
      console.error(response.error);
    } else {
      onGridReady();
    }
  };

  return (
    <div className="container">
      <div className="title-container">
        <h1>Books Library</h1>
        <BookForm onAdd={handleAdd} />
      </div>
      <div className="ag-theme-alpine grid-container">
        <AgGridReact
          columnDefs={[
            {
              field: "id",
              headerClass: "header",
              cellClass: "center-content",
            },
            {
              field: "title",
              headerClass: "header",
              cellClass: "center-content",
            },
            {
              field: "author",
              headerClass: "header",
              cellClass: "center-content",
            },
            {
              field: "isbn",
              headerClass: "header",
              cellClass: "center-content",
            },
            {
              field: "Actions",
              headerClass: "header",
              cellClass: "center-content",
              minWidth: 175,
              cellRenderer: "ActionsCellRenderer",
              cellRendererParams: (params) => ({
                handleDelete: handleDelete,
                handleEdit: handleEdit,
                data: params.data,
              }),
              editable: false,
              suppressClickEdit: true,
              filter: false,
            },
          ]}
          defaultColDef={{
            editable: true,
            sortable: true,
            flex: 1,
            minWidth: 100,
            filter: true,
            resizable: true,
          }}
          editType={"fullRow"}
          onGridReady={onGridReady}
          onCellValueChanged={(params) => {
            const { data } = params;
            const updatedBook = {
              id: data.id,
              title: data.title,
              author: data.author,
              isbn: data.isbn,
            };
            handleEdit(data.id, updatedBook);
          }}
          rowData={rowData}
          components={{
            ActionsCellRenderer: ActionsCellRenderer,
          }}
        />
      </div>
    </div>
  );
};

export default MainComponent;
