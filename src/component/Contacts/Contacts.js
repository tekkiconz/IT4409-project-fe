import React, { Component } from 'react'
import { contacts } from './contact-info'
import './Contacts.css'

export default class Contacts extends Component {
  render() {
    return (
      <div className="Contacts">
        <div className="contacts-container">
          {
            contacts.map(contact => (
              <div className="contact-card" key={contact.name}>
                <h2 className="contact-card-title">{contact.name}</h2>
                <a href={contact.facebook} className="contact-card-icon"><i class="fab fa-facebook"></i></a>
                <a href={contact.github} className="contact-card-icon"><i class="fab fa-github"></i></a>
                <a href={"mailto: " + contact.mail} className="contact-card-icon"><i class="fas fa-envelope-square"></i></a>
              </div>
            ))
          }
        </div>
      </div >
    )
  }
}