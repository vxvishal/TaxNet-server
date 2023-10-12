import mongoose from "mongoose";

const MonthlySalesSummarySchema = new mongoose.Schema({
    monthAndYear: String,
    summary: {
        total: Number,
        total18Percent: Number,
        total28Percent: Number,
    },
});

const MonthlySalesSummary = new mongoose.model("MonthlySalesSummary", MonthlySalesSummarySchema);

export default MonthlySalesSummary;