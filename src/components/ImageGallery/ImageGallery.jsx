import { ImageGalleryItem } from '../ImageGalleryItem/index';
import { GalleryList } from './ImageGallery.styled';
import { LoadMoreButton } from '../LoadMoreButton/index';
import { Modal } from '../Modal/index';
import PropTypes from 'prop-types';
import { Component } from 'react';

export class ImageGallery extends Component {
  state = {
    isOpen: false,
    largeImageURL: '',
  };

  onModalOpen = largeImageURL => {
    this.setState({
      isOpen: true,
      largeImageURL: largeImageURL,
    });
  };

  onModalClose = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const NumberOfPics = this.props.pics.length;
    const largeImageURL = this.state.largeImageURL;
    const { loadMore, pics, tags, totalHits } = this.props;
    return (
      <>
        <GalleryList>
          <ImageGalleryItem pics={pics} onModalOpen={this.onModalOpen} />
        </GalleryList>
        {NumberOfPics >= 12 && NumberOfPics < totalHits && (
          <LoadMoreButton loadMore={loadMore} text={'Load more'} />
        )}
        {this.state.isOpen && (
          <Modal
            onClose={this.onModalClose}
            largeImageURL={largeImageURL}
            tags={tags}
          />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  pics: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  loadMore: PropTypes.func.isRequired,
};
