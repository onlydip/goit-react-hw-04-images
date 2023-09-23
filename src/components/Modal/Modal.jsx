import { Component } from 'react';
import { Overlay, ModalDiv } from './Modal.styled';
import PropTypes from 'prop-types';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleEscClose);
  }

  handleEscClose = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleMouseClickClose = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscClose);
  }

  render() {
    const { largeImageURL, tags } = this.props;
    return (
      <Overlay onClick={this.handleMouseClickClose}>
        <ModalDiv>
          <img src={largeImageURL} alt={tags} />
        </ModalDiv>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
