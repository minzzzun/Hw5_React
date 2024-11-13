import React, { useState, useEffect } from 'react';
import { Modal, Button, Table, Form } from 'react-bootstrap';

export default function ShowList() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ count: '', title: '', author: '', publisher: '', year: '' });
  const [editBook, setEditBook] = useState({ id: '', count: '', title: '', author: '', publisher: '', year: '' });
  const [deleteBookId, setDeleteBookId] = useState('');
  

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);


  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowEditModal = (book) => {
    setEditBook(book);
    setShowEditModal(true);
  };
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowDeleteModal = (id) => {
    setDeleteBookId(id);
    setShowDeleteModal(true);
  };
  const handleCloseDeleteModal = () => setShowDeleteModal(false);


  const fetchBooks = async () => {
    try {
      const response = await fetch("https://672cc4affd89797156401d7c.mockapi.io/book");
      if (!response.ok) throw new Error("데이터 불러오기에 실패했습니다.");
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error(error);
      alert("데이터 불러오는데 실패했습니다!");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);


  const addBook = async () => {
    try {
      const response = await fetch("https://672cc4affd89797156401d7c.mockapi.io/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBook),
      });
      if (response.ok) {
        fetchBooks();
        alert("도서가 성공적으로 추가되었습니다!");
        setNewBook({ count: '', title: '', author: '', publisher: '', year: '' });
        handleCloseAddModal();
      } else {
        alert("도서 추가에 실패했습니다.");
      }
    } catch (error) {
      alert("네트워크 오류가 발생했습니다.");
    }
  };


  const updateBook = async () => {
    try {
      const response = await fetch(`https://672cc4affd89797156401d7c.mockapi.io/book/${editBook.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editBook),
      });
      if (response.ok) {
        fetchBooks();
        alert("도서가 성공적으로 수정되었습니다!");
        setEditBook({ id: '', count: '', title: '', author: '', publisher: '', year: '' });
        handleCloseEditModal();
      } else {
        alert("도서 수정에 실패했습니다.");
      }
    } catch (error) {
      alert("네트워크 오류가 발생했습니다.");
    }
  };


  const deleteBook = async () => {
    try {
      const response = await fetch(`https://672cc4affd89797156401d7c.mockapi.io/book/${deleteBookId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchBooks();
        alert("도서가 성공적으로 삭제되었습니다!");
        setDeleteBookId('');
        handleCloseDeleteModal();
      } else {
        alert("도서 삭제에 실패했습니다.");
      }
    } catch (error) {
      alert("네트워크 오류가 발생했습니다.");
    }
  };

  return (
    <div className="container">
      <h2>도서관리</h2>
      <Button className="btn btn-primary" onClick={handleShowAddModal}>추가</Button>
      
      <Table striped bordered>
        <thead>
          <tr>
            <th>ID</th>
            <th>번호</th>
            <th>도서명</th>
            <th>저자</th>
            <th>출판사</th>
            <th>출판년도</th>
            <th>액션</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.count}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
              <td>{book.year}</td>
              <td>
                <Button variant="warning" onClick={() => handleShowEditModal(book)}>수정</Button>
                <Button variant="danger" onClick={() => handleShowDeleteModal(book.id)}>삭제</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>


      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>도서 추가</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>번호</Form.Label>
              <Form.Control type="text" value={newBook.count} onChange={(e) => setNewBook({ ...newBook, count: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>도서명</Form.Label>
              <Form.Control type="text" value={newBook.title} onChange={(e) => setNewBook({ ...newBook, title: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>저자</Form.Label>
              <Form.Control type="text" value={newBook.author} onChange={(e) => setNewBook({ ...newBook, author: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>출판사</Form.Label>
              <Form.Control type="text" value={newBook.publisher} onChange={(e) => setNewBook({ ...newBook, publisher: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>출판년도</Form.Label>
              <Form.Control type="text" value={newBook.year} onChange={(e) => setNewBook({ ...newBook, year: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>취소</Button>
          <Button variant="primary" onClick={addBook}>추가하기</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>도서 수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>번호</Form.Label>
              <Form.Control type="text" value={editBook.count} onChange={(e) => setEditBook({ ...editBook, count: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>도서명</Form.Label>
              <Form.Control type="text" value={editBook.title} onChange={(e) => setEditBook({ ...editBook, title: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>저자</Form.Label>
              <Form.Control type="text" value={editBook.author} onChange={(e) => setEditBook({ ...editBook, author: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>출판사</Form.Label>
              <Form.Control type="text" value={editBook.publisher} onChange={(e) => setEditBook({ ...editBook, publisher: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>출판년도</Form.Label>
              <Form.Control type="text" value={editBook.year} onChange={(e) => setEditBook({ ...editBook, year: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>취소</Button>
          <Button variant="primary" onClick={updateBook}>수정하기</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>도서 삭제</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>정말로 도서 ID {deleteBookId}을 삭제하시겠습니까?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>취소</Button>
          <Button variant="danger" onClick={deleteBook}>삭제하기</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
