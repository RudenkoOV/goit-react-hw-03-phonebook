import PropTypes from 'prop-types';

import { Wrapper, Label, Title } from './Filter.styled';

export const Filter = ({ value, onChange }) => {
  return (
    <Wrapper>
      <Title>Contacts</Title>
      <Label>Find contacts by name</Label>
      <input type="text" value={value} onChange={onChange} />
    </Wrapper>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
