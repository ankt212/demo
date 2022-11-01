import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNews";
import ModalEditUser from "./ModalEditUser";
import ModalConfirm from "./ModalConfirm";
import _ from "lodash";

const TableUsers = (props) => {
  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [showModalAddNew, setShowModalAddNew] = useState(false);

  const [showModalEditUser, setShowModalEditUser] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});

  const [showModalDeleteUser, setModalDeleteUser] = useState(false);
  const [dataDeleteUser, setDataDeleteUser] = useState({});

  const handleClose = () => {
    setShowModalAddNew(false);
    setShowModalEditUser(false);
    setModalDeleteUser(false);
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

  const handleDeleteUser = (user) => {
    setDataDeleteUser(user);
    setModalDeleteUser(true);
  };
  const handleEditUserFromModal = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers);
    let index = listUsers.findIndex((item) => item.id === user.id);
    cloneListUsers[index].first_name = user.first_name;
    setListUsers(cloneListUsers);
  };

  const handleDeleteUserFromModal = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = cloneListUsers.filter((item) => item.id !== user.id);
    setListUsers(cloneListUsers);
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
            listUsers.map((item, index) => {
              return (
                <tr key={`key ${index}`}>
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
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteUser(item)}
                    >
                      Delete
                    </button>
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
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
      />
      <ModalEditUser
        show={showModalEditUser}
        dataUserEdit={dataUserEdit}
        handleClose={handleClose}
        handleEditUserFromModal={handleEditUserFromModal}
      />
      <ModalConfirm
        show={showModalDeleteUser}
        handleClose={handleClose}
        dataDeleteUser={dataDeleteUser}
        handleDeleteUserFromModal={handleDeleteUserFromModal}
      />
    </>
  );
};

export default TableUsers;
