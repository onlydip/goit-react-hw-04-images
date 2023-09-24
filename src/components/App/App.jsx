import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppSection } from './App.styled';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { ImageGallery } from '../ImageGallery/index';
import { getPic, options } from '../../services/api';
import { Loader } from 'components/Loader/index';

export function  App  ()  {
  const [name, setName] = useState('');
  const [pictures, setPictures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [totalHits, setTotalHits] = useState(null);

  useEffect(() => {
    const prevImgName = localStorage.getItem('imgName');
    if (prevImgName) {
      setName(prevImgName);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('imgName', name);
  }, [name]);

  useEffect(() => {
    if (currentPage === totalPages - 1) {
      toast.error('Кінець галереї');
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    if (name === '') return;
    setIsLoading(true);

    const fetchPictures = async () => {
      try {
        const pics = await getPic(name, currentPage);
        setPictures((prevPictures) => [...prevPictures, ...pics.hits]);
        setTotalPages(options.params.totalPages);
        setTotalHits(options.params.totalHits);

        if (currentPage === 1 && pics.total > 0) {
          toast.success(`Found ${pics.total} images!!!`);
        }
      } catch (error) {
        toast.error('Oops! Something went wrong!');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPictures();
  }, [name, currentPage]);

  const handleImageNameSubmit = (name) => {
   if (name !== '') {
  setName(name);
  setCurrentPage(1);
  setPictures([]);
}
  };

  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <AppSection>
      <SearchBar onSubmit={handleImageNameSubmit} />
      {pictures.length > 0 && (
        <ImageGallery pics={pictures} loadMore={loadMore} totalHits={totalHits} totalPages={totalPages} />
      )}
      {isLoading && <Loader />}
      <ToastContainer autoClose={3000} />
    </AppSection>
  );
};


