import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        // Basic validation
        if (!companyName) {
            toast.error("Company name is required.");
            return;
        }

        try {
            setLoading(true); // Set loading state to true
            const { data } = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            // Destructure response data
            const { success, message, company } = data;

            if (success) {
                dispatch(setSingleCompany(company));
                if (company) { // Ensure company and _id are defined
                    
                    toast.success(message);
                    setCompanyName(''); // Clear the input field
                    navigate(`/admin/companies/${company._id}`); // Safely use _id
                } else {
                    toast.error("Company created, but ID is missing."); // Handle missing ID case
                }
            } else {
                toast.error(message); // Show error message from server
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "An error occurred while registering the company.");
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto'>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl'>Your Company Name</h1>
                    <p className='text-gray-500'>What would you like to give your company name? You can change this later.</p>
                </div>

                <Label>Company Name</Label>
                <Input
                    type="text"
                    className="my-2"
                    placeholder="JobHunt, Microsoft etc."
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                />
                <div className='flex items-center gap-2 my-10'>
                    <Button variant="outline" onClick={() => navigate("/admin/companies")}>Cancel</Button>
                    <Button onClick={registerNewCompany} disabled={loading}>
                        {loading ? 'Loading...' : 'Continue'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CompanyCreate;
