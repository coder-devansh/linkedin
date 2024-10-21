import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Get companies from Redux store
    const { companies} = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput(prev => ({ ...prev, [name]: value }));
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find(company => company.name.toLowerCase() === value.toLowerCase());
        setInput(prev => ({ ...prev, companyId: selectedCompany ? selectedCompany._id : "" }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        // Simple validation to check for empty fields
        for (const key in input) {
            if (!input[key] && key !== "companyId") {
                toast.error(`${key.charAt(0).toUpperCase() + key.slice(1)} is required`);
                return;
            }
        }

        try {
            console.log("done1");

            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                console.log("done");
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred while posting the job.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5'>
                <form onSubmit={submitHandler} className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md'>
                    <div className='grid grid-cols-2 gap-2'>
                        {['title', 'description', 'requirements', 'salary', 'location', 'jobType', 'experience'].map((field) => (
                            <div key={field}>
                                <Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                                <Input
                                    type={field === 'position' ? 'number' : 'text'}
                                    name={field}
                                    value={input[field]}
                                    onChange={changeEventHandler}
                                    required
                                    className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                />
                            </div>
                        ))}
                        <div>
                            <Label>No of Positions</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                required
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        {companies.length > 0 && (
                            <Select onValueChange={selectChangeHandler}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a Company" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {companies.map(company => (
                                            <SelectItem key={company._id} value={company.name.toLowerCase()}>
                                                {company.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    </div>
                    {loading ? 
                        <Button className="w-full my-4" >
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                        </Button>
                    : 
                        <Button type="submit" className="w-full my-4">Post New Job</Button>
                    }
                    {companies.length === 0 && (
                        <p className='text-xs text-red-600 font-bold text-center my-3'>*Please register a company first, before posting a job</p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default PostJob;
