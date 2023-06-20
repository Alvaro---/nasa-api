import styles from "./components.module.css";
const CardPhoto = ({ photo }) => {
    return (
        <div className={styles.card}>
            <div className={styles.card_content}>
                <h3 className={styles.card_title}>{photo.camera.full_name}</h3>
                <h4>Rover: {photo.rover.name}</h4>
                <p>{photo.earth_date}</p>
            </div>
            <div className={styles.card_image}>
                <img src={photo.img_src} alt={`Mars Rover - ${photo.id}`} />
            </div>
        </div>
    )
}

export default CardPhoto
