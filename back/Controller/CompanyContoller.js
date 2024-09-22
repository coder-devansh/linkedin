const Company = require("../Models/CompanyModel");

module.exports.registerCompany = async function registerCompany(req,res) {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required",
                success: false
            });
        }
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "You can't register the same company",
                success: false
            });
        }
        console.log("User ID:", req.id);
        const compan = await Company.create({
            name: companyName,
            userId: req.id
        });
        await compan.save();
        return res.status(201).json({
            message: "Company registered successfully",
            data: compan,
            success: true
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false
        });
    }
}

module.exports.getCompany = async function getCompany(req, res) {
    try {
        const userId = req.id;
        const companies = await Company.find({ userId });
        if (companies.length === 0) {
            return res.status(404).json({
                message: "No companies found",
                success: false
            });
        }
        res.status(200).json({
            message: "Companies found",
            data: companies,
            success: true
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false
        });
    }
}

module.exports.getCompanyById = async function getCompanyById(req, res) {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }
        res.status(200).json({
            message: "Company found",
            data: company,
            success: true
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false
        });
    }
}

module.exports.updateCompany = async function updateCompany(req, res) {
    console.log("req.body-> ", req.body);
    try {
        let id = req.params.id;
        console.log(id);
        let company = await Company.findById(id);
        if (company) {
            console.log('inside company');
            const dataToBeUpdated = req.body;
            for (let key in dataToBeUpdated) {
                company[key] = dataToBeUpdated[key];
            }
            const updatedData = await company.save();
            console.log(updatedData);
            res.status(200).json({
                message: "Data updated successfully",
                data: updatedData,
                success: true
            });
        } else {
            res.status(404).json({
                message: "Company not found",
                success: false
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false
        });
    }
};
