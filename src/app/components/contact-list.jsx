'use client';
import { useState } from 'react';
import '@/app/components/contact-list.css'

export default function ContactList() {
    const [contactSearch, setContactSearch] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [list, setList] = useState([]);
    const [id, setId] = useState(1);
    const [idInEdit, setIdInEdit] = useState("");

    function updateContactList() {
        if (idInEdit === "") {
            if (name === "" || phone === "") {
                return
            }
            else {
                setList(prevList => [
                    ...prevList,
                    {
                        id: id,
                        name: name,
                        phone: phone,
                        email: email,
                    }
                ])
                setId(prevId => prevId + 1);
            }
        }
        else {
            setList(prevList => prevList.map(contact => contact.id === idInEdit ?
                {
                    ...contact,
                    name: name,
                    phone: phone,
                    email: email
                }
                : contact
            ))
        };
        setName("");
        setPhone("");
        setEmail("");
        setIdInEdit("")
    };

    function editContact(id) {
        const contactToEdit = list.find(contact => contact.id === id);
        setName(contactToEdit.name);
        setPhone(contactToEdit.phone);
        setEmail(contactToEdit.email);
        setIdInEdit(id);
    };

    function deleteContact(id) {
        setList(prevList => prevList.filter(contact => contact.id !== id))
    }

    return (
        <div className='contact-list-full-wrapper'>
            <div className='search-wrapper'>
                <input type="text" id='search-contact-input' placeholder='Search contact...' value={contactSearch} onChange={(event) => setContactSearch(event.target.value)} />
            </div>
            <div className='searched-contact-list' hidden={list.filter(contact => contact.name.toLowerCase().startsWith(contactSearch.toLowerCase())).length === 0}>
                    {contactSearch !== "" &&
                    list
                        .filter(contact => contact.name.toLowerCase().startsWith(contactSearch.toLowerCase()))
                        .map(contact => (
                            <div key={contact.id} className='searched-contact-item'>
                                {contact.name}
                            </div>
                        ))}
            </div>
            <div className='add-contact-wrapper'>
                <div className='contact-input-wrapper'>
                    <label htmlFor="contact-name-input" className='input-label'>Name</label>
                    <input type="text" className='contact-input-field' id='contact-name-input' value={name} onChange={(event) => setName(event.target.value)} />
                </div>
                <div className='contact-input-wrapper'>
                    <label htmlFor="contact-phone-input" className='input-label'>Phone Number</label>
                    <input type="tel" className='contact-input-field' id='contact-phone-input' value={phone} onChange={(event) => setPhone(event.target.value)} />
                </div>
                <div className='contact-input-wrapper'>
                    <label htmlFor="contact-email-input" className='input-label'>Email</label>
                    <input type="email" className='contact-input-field' id='contact-email-input' value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
                <button id='add-contact-btn' onClick={updateContactList}>{idInEdit === "" ? "Add Contact" : "Save Changes"}</button>
            </div>
            <div className='all-contacts'>
                {list.map(contact => (
                    <div className='contact-card' key={contact.id}>
                        <div className='contact-details'>
                            <p className='contact-name'>{contact.name}</p>
                            <p className='contact-phone'>{contact.phone}</p>
                            <p className='contact-email'>{contact.email}</p>
                        </div>
                        <div className='contact-mod-btns'>
                            <button className='edit-btn' onClick={() => editContact(contact.id)}>Edit</button>
                            <button className='delete-btn' onClick={() => deleteContact(contact.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}