import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  componentDidMount() {
    const localContacts = localStorage.getItem('contact');
    if (localContacts) {
      this.setState({ contacts: JSON.parse(localContacts) });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    
    if (JSON.stringify(this.state.contacts) !== '') {
      localStorage.setItem('contact', JSON.stringify(this.state.contacts));
    }
  }
  checkNewName = newName => {
    
    return this.state.contacts.find(
      ({ name }) => name.toLowerCase() === newName.toLowerCase()
    );
  };

  addContact = ({ name, number }) => {
    if ( name  !== '' && number!== '') {
      if (!this.checkNewName(name)) {
        const nameId = nanoid();
        const contact = {
          id: nameId,
          name,
          number,
        };
        this.setState(({ contacts }) => ({
          contacts: [...contacts, contact],
        }));
      } else {
        alert(`${name} is already in contacts!`);
      }
    } else { alert(`${name} is EMPTY! Please enter valid name or number`); };
  } 
  removeContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  filterValue = e => {
    this.setState({ filter: e.currentTarget.value.trim() });
  };

  filteredContacts = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase()) ||
        contact.number.includes(filter)
    );
  };

  render() {
    const { filter } = this.state;
    const ResultFiltered = this.filteredContacts();
    return (
      <div>
        <ContactForm onSubmit={this.addContact} />
        <Filter value={filter} onChange={this.filterValue} />
        {this.state.contacts[0] && ResultFiltered[0] ? (
          <ContactList
            contacts={ResultFiltered}
            removeContact={this.removeContact}
          />
        ) : (
          <p>There’s nothing here yet...</p>
        )}
      </div>
    );
  }
}
