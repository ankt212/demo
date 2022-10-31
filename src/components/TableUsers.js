import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNews";
import ModalEditUser from "./ModalEditUser";

const TableUsers = (props) => {
  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [showModalAddNew, setShowModalAddNew] = useState(false);
  const [showModalEditUser, setShowModalEditUser] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});
  const handleCloseAdd = () => {
    setShowModalAddNew(false);
  };
  const handleCloseEdit = () => {
    setShowModalEditUser(false);
  };
  const hanldeAddNewUser = () => {
    setShowModalAddNew(true);
  };

  useEffect(() => {
    // call apis
    getUsers(1);
  }, []);
  const getUsers = async (page) => {
    let res = await fetchAllUser(page);
    if (res && res.data) {
      setTotalUsers(res.total);
      setListUsers(res.data);
      setTotalPages(res.total_pages);
    }
  };
  console.log(listUsers);

  const handlePageClick = (event) => {
    console.log(event);
    getUsers(+event.selected + 1);
  };

  const handleUpdateTable = (user) => {
    setListUsers([user, ...listUsers]);
  };

  const hanldeEditUser = (user) => {
    setDataUserEdit(user);
    setShowModalEditUser(true);
  };
  return (
    <>
      <div className="my-3 add-new">
        <span>
          <b>List Users:</b>
        </span>
        <button className="btn btn-success" onClick={() => hanldeAddNewUser()}>
          Add new user
        </button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => hanldeEditUser(item)}
                    >
                      Edit
                    </button>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
      <ModalAddNew
        show={showModalAddNew}
        handleClose={handleCloseAdd}
        handleUpdateTable={handleUpdateTable}
      />
      <ModalEditUser
        show={showModalEditUser}
        dataUserEdit={dataUserEdit}
        handleClose={handleCloseEdit}
        handleUpdateTable={handleUpdateTable}
      />
    </>
  );
};

export default TableUsers;
