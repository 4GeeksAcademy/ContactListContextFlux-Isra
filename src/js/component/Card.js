import React, { useContext } from "react";

import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import avatar from "../../img/avatar.jpeg";

export const Card = ({ contact, updateContact, deleteContact }) => {
  const { actions } = useContext(Context);

  const navigate = useNavigate();

  const handleUpdate = (contact) => {
    actions.isEditing(contact);
    navigate("/form/" + contact.id);
  };

  return (
    <div className="container-md card contact p-3">
      <div className="row w-100">
        <div className="col-3 d-flex align-items-center justify-content-center">
          <img src={avatar} className="img-fluid rounded-circle" />
        </div>
        <div className="col-9 d-flex align-items-start flex-column">
          <div className="row w-100">
            <div className="col-12 d-flex align-items-start flex-column">
              <>
                <div className="row w-100">
                  <div className="col-10">
                    <p className="h6 name">{contact.name}</p>
                  </div>
                  <div className="col-2 d-flex align-items-center justify-content-end">
                    <i
                      className="fa-solid fa-pencil btn btn-primary"
                      id="btn-edit"
                      onClick={() => handleUpdate(contact)}
                    ></i>

                    <i
                      className="fa-solid fa-trash-can btn btn-danger mx-2"
                      id="btn-delete"
                      onClick={() => deleteContact(contact.id)}
                    ></i>
                  </div>
                </div>

                <p className="phone">
                  <i className="fa-solid fa-phone-flip me-3"></i>
                  {contact.phone}
                </p>
                <p className="email">
                  <i className="fa-solid fa-envelope me-3"></i>
                  {contact.email}
                </p>
                <p className="address">
                  <i className="fa-solid fa-location-dot me-3"></i>
                  {contact.address}
                </p>
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
