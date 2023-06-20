"use client"
import useLoadPhotos from '@/hooks/useLoadPhotos';
import CardPhoto from './CardPhoto';
import styles from "./components.module.css";
import { useContext, useEffect } from 'react';
import { MyContext } from '@/context/Context';

const MarsRover = () => {

  const { data, setData } = useContext(MyContext);
  console.log("aaaaaaa",data);
  const { photos, loading, error, loadMorePhotos } = useLoadPhotos();
  console.log(photos)

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        loadMorePhotos();
        setTimeout(()=>{
          console.log("time")
        }, 10000)
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loadMorePhotos]);


  if (loading) {
    return <div>Loading...</div>;
  }

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
    </div>
  );
}

export default MarsRover
