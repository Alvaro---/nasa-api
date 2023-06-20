"use client";
import React, { createContext, useState } from "react";

const MyContext = createContext();

const MyProvider = ({ children }) => {
	const [filteredData, setFilteredData] = useState([]);
	const [originalData, setOriginalData] = useState([]);

	const applyFilters = (filters) => {
		const { rover, camera, earthDay, sunDay } = filters;
		// Apply the filters to the original data
		let filteredResult = originalData;
		if (rover) filteredResult = filteredResult.filter((item) => item.rover === rover);
		if (camera) filteredResult = filteredResult.filter((item) => item.camera === camera);
		if (earthDay)filteredResult = filteredResult.filter((item) => item.earthDay === earthDay);
		if (sunDay) filteredResult = filteredResult.filter((item) => item.sunDay === sunDay);
		setFilteredData(filteredResult);
	};

	const contextValue = {
		originalData,
		filteredData,
		setOriginalData,
		applyFilters,
	};

	return <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>;
};

export { MyContext, MyProvider };
