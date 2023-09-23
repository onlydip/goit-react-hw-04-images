import { Formik } from 'formik';
import * as yup from 'yup';
import { FaSearch } from 'react-icons/fa';
import {
  StyledHeader,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from '../../components/SearchBar/Searchbar.styled';
import PropTypes from 'prop-types';

export function SearchBar({ onSubmit }) {
  const schema = yup.object().shape({
    name: yup.string().required('This field cannot be empty'),
  });

  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values.name);
    resetForm();
  };

  return (
    <>
      <Formik
        initialValues={{ name: '' }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <StyledHeader>
          <SearchForm>
            <SearchFormButton type="submit">
              <FaSearch size={25} />
            </SearchFormButton>
            <SearchFormInput
              name="name"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </SearchForm>
        </StyledHeader>
      </Formik>
    </>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
