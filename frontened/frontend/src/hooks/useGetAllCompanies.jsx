// hooks/useGetAllCompanies.js

import { setCompanies } from '@/redux/companySlice';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetAllCompanies = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`, { withCredentials: true });
                console.log('Companies fetched');
                if (res.data.success) {
                    dispatch(setCompanies(res.data.companies));
                } else {
                    console.error('Failed to fetch companies:', res.data.message);
                }
            } catch (error) {
                console.error('Error fetching companies:', error.response?.data?.message || error.message);
            }
        };

        fetchCompanies();
    }, [dispatch]); // Include dispatch in the dependency array
};

export default useGetAllCompanies;
