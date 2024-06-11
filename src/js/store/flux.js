const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      contacts: [],
      isEditing: false,
    },
    actions: {
      isEditing: async (contact) => {
        await setStore({ isEditing: true });
        await setStore({ editContact: contact });
      },

      createUser: async () => {
        try {
          const resp = await fetch(
            "https://playground.4geeks.com/contact/agendas/agendaIsra",
            {
              method: "GET",
              headers: {
                accept: "application/json",
              },
            }
          );
          if (resp.status == 404) {
            const resp = await fetch(
              "https://playground.4geeks.com/contact/agendas/agendaIsra",
              {
                method: "POST",
                headers: {
                  accept: "application/json",
                },
              }
            );
          }
        } catch (error) {
          console.log(error);
        }
      },

      getContact: async () => {
        try {
          const resp = await fetch(
            "https://playground.4geeks.com/contact/agendas/agendaIsra/contacts",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                accept: "application/json",
              },
            }
          );
          if (!resp.ok) {
            throw new Error(`HTTP error! status: ${resp.status}`);
          }
          const data = await resp.json();
          if (data.contacts && Array.isArray(data.contacts)) {
            setStore({ contacts: data.contacts });
          } else {
            console.error("LaAPI no contiene contactos:", data);
          }
        } catch (err) {
          console.error(err);
        }
      },

      addContact: async (contact) => {
        try {
          const resp = await fetch(
            "https://playground.4geeks.com/contact/agendas/agendaIsra/contacts",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                accept: "application/json",
              },
              body: JSON.stringify(contact),
            }
          );

          if (resp.ok) {
            const newContact = await resp.json();
            setStore({ contacts: [...getStore().contacts, newContact] });
            console.log("Contacto agregado correctamente:", newContact);
          } else {
            console.error("Error al intentar agregar un contacto");
          }
        } catch (error) {
          console.error("Error al intentar agregar un contacto:", error);
        }
      },

      updateContact: async (contactId, updatedContact) => {
        try {
          const resp = await fetch(
            `https://playground.4geeks.com/contact/agendas/agendaIsra/contacts/${contactId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                accept: "application/json",
              },
              body: JSON.stringify(updatedContact),
            }
          );
          if (resp.ok) {
            const data = await resp.json();
            const updatedContacts = getStore().contacts.map((contact) => {
              if (contact.id === contactId) {
                return data;
              }
              return contact;
            });
            setStore({ contacts: updatedContacts });
            getActions().getContact();
            setStore({ isEditing: false });
          } else {
            console.error("Error al intentar actualizar un contacto");
            setStore({ isEditing: false });
          }
        } catch (error) {
          console.error(
            `Error al actualizar el contacto con ID ${contactId}:`,
            error
          );
          setStore({ isEditing: false });
        }
      },

      deleteContact: async (contactId) => {
        try {
          const resp = await fetch(
            `https://playground.4geeks.com/contact/agendas/agendaIsra/contacts/${contactId}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                accept: "application/json",
              },
            }
          );
          if (resp.ok) {
            const updatedContacts = getStore().contacts.filter(
              (contact) => contact.id !== contactId
            );
            setStore({ contacts: updatedContacts });
          } else {
            console.error("Error al intentar eliminar un contacto");
          }
        } catch (error) {
          console.error(
            `Error al eliminar el contacto con ID ${contactId}:`,
            error
          );
        }
      },
    },
  };
};

export default getState;
