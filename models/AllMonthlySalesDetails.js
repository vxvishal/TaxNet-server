import mongoose from "mongoose";

const AllMonthlySalesDetailsSchema = new mongoose.Schema({
    monthAndYear: String,
    allSales: [{
        invoiceNumber: Number,
        date: String,
        gstRate: Number,
        gstAmount: Number,
        totalAmount: Number,
    }]
});

const AllMonthlySalesDetails = new mongoose.model("AllMonthlySalesDetails", AllMonthlySalesDetailsSchema);

export default AllMonthlySalesDetails;