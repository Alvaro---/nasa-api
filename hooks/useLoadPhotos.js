"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const useLoadPhotos = () => {
	const [photos, setPhotos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
    const [page, setPage] = useState(1);

	useEffect(() => {
		const fetchPhotos = async () => {
			setLoading(true);
			try {
				const response = await axios.get(
					"https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos",
					{
						params: {
							sol: 1000,
                            page: page,
							api_key: "DEMO_KEY",
						},
					}
				);
				setPhotos(response.data.photos);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching data photos:", error);
				setError(error);
				setLoading(false);
			}
		};
		fetchPhotos();
	}, []);

    const loadMorePhotos = () => {
        setPage(page + 1);
      };

	return { photos, loading, error, loadMorePhotos };
};

export default useLoadPhotos;
