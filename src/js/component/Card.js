import React, { useState } from "react";
import rigoBaby from "../../img/rigo-baby.jpg";

export const Card = ({ contact, updateContact, deleteContact }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedContact, setUpdatedContact] = useState(contact);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedContact({ ...updatedContact, [name]: value });
  };

  const handleUpdate = () => {
    updateContact(contact.id, updatedContact);
    setIsEditing(false);
  };

  return (
    <div className="container-md card contact p-3">
      <div className="row w-100">
        <div className="col-3 d-flex align-items-center justify-content-center">
          <img src={rigoBaby} className="avatar" />
        </div>
        <div className="col-9 d-flex align-items-start flex-column">
          <div className="row w-100">
            <div className="col-12 d-flex align-items-start flex-column">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    name="name"
                    value={updatedContact.name}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="address"
                    value={updatedContact.address}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="phone"
                    value={updatedContact.phone}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="email"
                    value={updatedContact.email}
                    onChange={handleChange}
                  />
                  <button onClick={handleUpdate}>Save</button>
                </>
              ) : (
                <>
                  <div className="row w-100">
                    <div className="col-10">
                      <p className="h6 name">{contact.name}</p>
                    </div>
                    <div className="col-2 d-flex align-items-center justify-content-end">
                      <i
                        className="fa-solid fa-pencil btn btn-primary"
                        id="btn-edit"
                        onClick={() => setIsEditing(true)}
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
