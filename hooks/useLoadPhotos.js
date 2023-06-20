"use client";
import { MyContext } from "@/context/Context";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

const useLoadPhotos = () => {
	const { filters } = useContext(MyContext);
	console.log(filters);
	const { rover, camera, sunDate, earthDate } = filters;
	const [photos, setPhotos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [page, setPage] = useState(1);

	const apiKey = process.env.API_KEY || 'DEMO_KEY';

	const fetchPhotos = async () => {
		setLoading(true);
		try {
			const response = await axios.get(
				`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos`,
				{
					params: {
						page: page,
						api_key: "DEMO_KEY",
						...(camera && { camera: camera }),
						...(sunDate ? { sol: sunDate } : { sol: 1000 }),
						...(earthDate && { earth_date: earthDate }),
					},
				}
			);
			setLoading(false);
			return response.data.photos;
		} catch (error) {
			console.error("Error fetching data photos:", error);
			setError(error);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetchPhotos();
			const updatedPhotos = [...res];
			setPhotos(updatedPhotos);
		};
		setPage(1);

		fetchData();
	}, [rover, camera, earthDate, sunDate]);

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetchPhotos();
			const updatedPhotos = [...photos, ...res];
			setPhotos(updatedPhotos);
		};

		fetchData();
	}, [page]);

	const loadMorePhotos = () => {
		setPage((page) => page + 1);
	};

	return { photos, loading, error, loadMorePhotos };
};

export default useLoadPhotos;
