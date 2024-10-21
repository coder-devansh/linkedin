import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: "company",
    initialState: {
        singleCompany: null,
        companies: [],
        searchCompanyByText: "",
    },
    reducers: {
        // Action to set a single company
        setSingleCompany: (state, action) => {
            state.singleCompany = action.payload;
        },
        // Action to set the list of companies
        setCompanies: (state, action) => {
            state.companies = action.payload;
        },
        // Action to set the search text for companies
        setSearchCompanyByText: (state, action) => {
            state.searchCompanyByText = action.payload;
        },
    },
});

// Export actions for use in components
export const { setSingleCompany, setCompanies, setSearchCompanyByText } = companySlice.actions;

// Export the reducer to be used in the store
export default companySlice.reducer;
