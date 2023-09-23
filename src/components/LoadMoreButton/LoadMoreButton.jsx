import { LoadButton } from './LoadMoreButton.styled';
import PropTypes from 'prop-types';

export const LoadMoreButton = props => {
  return (
    <>
      <LoadButton onClick={props.loadMore}>{props.text}</LoadButton>
    </>
  );
};

LoadMoreButton.propTypes = {
  loadMore: PropTypes.func.isRequired,
};
