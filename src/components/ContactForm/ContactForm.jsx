import PropTypes from 'prop-types';
import {
  Wrapper,
  Title,
  AddBox,
  Label,
  AddContactButton,
} from './ContactForm.styled';
import React, { Component } from 'react';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleValue = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <Wrapper>
        <Title>Phonebook</Title>
        {/* <AddBox> */}
          <AddBox onSubmit={this.handleSubmit}>
            <Label>Name</Label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleValue}
              placeholder="Введите имя"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Имя может состоять только из букв, апострофа, тире и пробелов."
              required
            />

            <Label>Number</Label>

            <input
              type="tel"
              name="number"
              value={this.state.number}
              onChange={this.handleValue}
              placeholder="Введите номер телефона"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Имя может состоять только из букв, апострофа, тире и пробелов."
              required
            />
            <AddContactButton type="submit" onClick={this.handleSubmit}>
              Add contact
            </AddContactButton>
          </AddBox>
        {/* </AddBox> */}
      </Wrapper>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
