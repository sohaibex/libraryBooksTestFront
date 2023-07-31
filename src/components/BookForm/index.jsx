import { useState } from "react";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import "./BookForm.css";

const BookForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");

  const saveBook = ({ title, author, isbn }) => {
    if (!title || !author || !isbn) {
      Swal.fire("Validation error", "All fields are required", "error");
      return;
    }

    if (!/^[0-9]*-[0-9]*-[0-9]*-[0-9]*-[0-9]*$/.test(isbn)) {
      Swal.fire("Validation error", "ISBN format is invalid", "error");
      return;
    }

    onAdd({ title, author, isbn });

    setTitle("");
    setAuthor("");
    setIsbn("");
  };

  const cancelModal = () => {
    Swal.close();
  };

  const OpenModal = () => {
    Swal.fire({
      title: "Create new  Book",
      html: `
        <input type="text" id="title" class="swal2-input" placeholder="Title" value="${title}" />
        <input type="text" id="author" class="swal2-input" placeholder="Author" value="${author}" />
        <input type="text" id="isbn" class="swal2-input" placeholder="ISBN" value="${isbn}" />`,
      focusConfirm: false,
      confirmButtonText: "Save",
      preConfirm: () => {
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const isbn = document.getElementById("isbn").value;

        return { title, author, isbn };
      },
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        saveBook(result.value);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        cancelModal();
      }
    });
  };

  return (
    <button className="saveButton" onClick={OpenModal}>
      Create new Book
    </button>
  );
};

BookForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default BookForm;
