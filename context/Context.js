"use client";
import React, { createContext, useState } from "react";

const MyContext = createContext();

const MyProvider = ({ children }) => {
	const [filters, setFilters] = useState({
		rover: "curiosity",
		camera: "",
		earthDate: "",
		sunDate: "",
		filters: ""
	})

	const applyFilters = (filters) => {
		const { rover, camera, earthDate, sunDate } = filters;
		setFilters({rover, camera, earthDate, sunDate })
	};

	const contextValue = {
		applyFilters,
		filters
	};

	return <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>;
};

export { MyContext, MyProvider };
