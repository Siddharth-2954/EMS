const transactionModel = require("../models/transaction");
const moment = require('moment');

exports.getAllTransaction = async (req, res) => {
    try {
        const { frequency, selectedDate, type } = req.body; // Extract frequency from request body
        const transactions = await transactionModel.find({
            ...(frequency !== 'custom' ? {
                date:{$gt : moment().subtract(Number(frequency), 'd').toDate()},
            } : {
                date : {
                    $gte : selectedDate[0],
                    $lte : selectedDate[1]
                }
            }),
           userid: req.body.userid,
           ...(type !== 'all' && {type})
        });
        res.status(200).json(transactions);
    } catch (err) {
        console.error("Error fetching transactions:", err);
        res.status(500).json({
            success: false,
            message: "Cannot get transactions"
        });
    }
};   

exports.deleteTransaction = async (req, res) => {
    try{
        await transactionModel.findOneAndDelete({_id:req.body.transactionId})
        res.status(200).json({
            success:true,
            message:"Deleted Successfully!"
        })
    }
    catch(err){
        console.error(err);
        console.log("Error generated");
        return res.status(500).json({
            success:false,
            message:"Error in deleting"
        })
    }
}

exports.editTransaction = async (req, res) => {
    try{
        await transactionModel.findOneAndUpdate({_id:req.body.transactionId}, req.body.payload);
        res.status(200).json({
            success:true,
            message:"Edit Successfully!"
        })
    }
    catch(err) {
        console.error(err);
        console.log("Error generated");
        res.status(500).json({
            success:false,
            message:"Error generated"
        })
    }
}

exports.addTransaction = async (req, res) => {
    try {
        const newTransaction = new transactionModel(req.body);
        await newTransaction.save();
        res.status(200).json({
            success: true,
            message: "Transaction successful!"
        });
    } catch (err) {
        console.error("Error adding transaction:", err);
        res.status(500).json({
            success: false,
            message: "Failed to add transaction"
        });
    }
};