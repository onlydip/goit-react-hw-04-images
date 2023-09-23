import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { AppSection } from './App.styled';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { ImageGallery } from '../ImageGallery/index';
import { getPic, options } from '../../services/api';
import { Loader } from 'components/Loader/index';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    name: '',
    pictures: [],
    isLoading: false,
    currentPage: 1,
    totalPages: null,
    totalHits: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevImgName = prevState.name;
    const currentImgName = this.state.name;
    const prevPage = prevState.currentPage;
    const currentPage = this.state.currentPage;
    if (currentImgName !== prevImgName || prevPage !== currentPage) {
      this.setState({ isLoading: true });
      this.fetchPictures();
    }
  }

  handleImageNameSubmit = name => {
    if (name !== this.state.name) {
      this.setState({ name, currentPage: 1, pictures: [] });
    }
  };

  loadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
    if (this.state.currentPage === this.state.totalPages - 1) {
      toast.error('End of gallery');
    }
  };

  fetchPictures = async () => {
    try {
      const currentImgName = this.state.name;
      const currentPage = this.state.currentPage;
      await getPic(currentImgName, currentPage).then(pics => {
        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...pics.hits],
          totalPages: options.params.totalPages,
          totalHits: options.params.totalHits,
          isLoading: false,
        }));
        if (currentPage === 1 && pics.total > 0) {
          toast.success(`Found ${pics.total} images!!!`);
        }
      });
    } catch (error) {
      toast.error('Oops! Something went wrong!');
    }
  };

  render() {
    const { totalHits, pictures, totalPages } = this.state;
    return (
      <AppSection>
        <SearchBar onSubmit={this.handleImageNameSubmit} />
        {this.state.pictures.length > 0 && (
          <ImageGallery
            pics={pictures}
            loadMore={this.loadMore}
            totalHits={totalHits}
            totalPages={totalPages}
          />
        )}
        {this.state.isLoading && <Loader />}
        <ToastContainer autoClose={3000} />
      </AppSection>
    );
  }
}
