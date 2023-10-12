import express from 'express';
import connectDB from '../database/db.js';
import CurrentMonth from '../models/CurrentMonth.js';
import SalesMonths from '../models/SalesMonths.js';
import PurchaseMonths from '../models/PurchaseMonths.js';
import AllMonthlySalesDetails from '../models/AllMonthlySalesDetails.js';
import AllMonthlyPurchaseDetails from '../models/AllMonthlyPurchaseDetails.js';
import MonthlySalesSummary from '../models/MonthlySalesSummary.js';
import MonthlyPurchaseSummary from '../models/MonthlyPurchaseSummary.js';

const getRouter = express.Router();

connectDB();

getRouter.get('/home', async (req, res) => {

    let currentMonthAndYear;
    let salesTax;
    let purchaseTax;

    const formatMonthAndYear = (monthAndYear) => {
        return monthAndYear.toLowerCase().replace(' ', '-');
    }

    await CurrentMonth.find()
        .then(data => currentMonthAndYear = data.length === 0 ? '' : data[0].month + ' ' + data[0].year)
        .catch(err => console.log(err));

    await MonthlySalesSummary.find({ monthAndYear: formatMonthAndYear(currentMonthAndYear) })
        .then(data => salesTax = data.length === 0 ? 0 : data[0].summary.total)
        .catch(err => console.log(err));

    await MonthlyPurchaseSummary.find({ monthAndYear: formatMonthAndYear(currentMonthAndYear) })
        .then(data => purchaseTax = data.length === 0 ? 0 : data[0].summary.total)
        .catch(err => console.log(err));

    const response = {
        currentMonthAndYear,
        salesTax,
        purchaseTax,
    };

    res.json(response);
});

getRouter.get('/sales', async (req, res) => {
    await SalesMonths.find()
        .then(data => res.json(data.reverse()))
        .catch(err => console.log(err));
});

getRouter.get('/purchase', async (req, res) => {
    await PurchaseMonths.find()
        .then(data => res.json(data.reverse()))
        .catch(err => console.log(err));
});

getRouter.get('/viewSales', async (req, res) => {

    const allSales = await AllMonthlySalesDetails.find({ monthAndYear: req.query.monthYear });

    const salesSummary = await MonthlySalesSummary.find({ monthAndYear: req.query.monthYear });

    const response = {
        salesSummary: salesSummary[0].summary,
        allSales: allSales[0].allSales.reverse(),
    }

    res.send(response);
});

getRouter.get('/viewPurchase', async (req, res) => {

    const allPurchase = await AllMonthlyPurchaseDetails.find({ monthAndYear: req.query.monthYear });

    const purchaseSummary = await MonthlyPurchaseSummary.find({ monthAndYear: req.query.monthYear });

    const response = {
        purchaseSummary: purchaseSummary[0].summary,
        allPurchase: allPurchase[0].allPurchase.reverse(),
    }

    res.send(response);
});

export default getRouter;