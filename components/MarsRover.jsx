"use client"
import useLoadPhotos from '@/hooks/useLoadPhotos';
import CardPhoto from './CardPhoto';
import styles from "./components.module.css";
import { useEffect } from 'react';

const MarsRover = () => {

  const { photos, loading, error, loadMorePhotos } = useLoadPhotos();
  console.log(photos)

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight
      ) {
        loadMorePhotos();
      }
    };

    const debouncedHandleScroll = debounce(handleScroll, 200);

    window.addEventListener('scroll', debouncedHandleScroll);
  }, [loadMorePhotos]);

  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  if (error) {
    return <div>Error fetching Mars photos.</div>;
  }
  return (
    <div className={styles.container}>
      <h1>Mars Photos</h1>
      <div className={styles.cards_box}>
        {photos.map((photo) => (
          <CardPhoto key={photo.id} photo={photo} />
        ))}
      </div>
      {
        loading && <div className={styles.loading}>Loading...</div>
      }
    </div>
  );
}

export default MarsRover
