const mongoose = require("mongoose")
const expenseModel = require("../models/ExpenseModel")
const uploadFileToCloudinary = require("../utils/CloudinaryUtil")

const createExpense = async (req, res) => {
    try {
        const userId = req.user._id
        const expenseData = { ...req.body, userId: userId }

        if (expenseData.expCategory && !mongoose.Types.ObjectId.isValid(expenseData.expCategory)) {
            return res.status(400).json({
                message: "Invalid expense category id"
            })
        }

        const savedExpense = await expenseModel.create(expenseData)
        res.status(201).json({
            message: "Expense created successfully",
            data: savedExpense
        })
    } catch (err) {
        res.status(500).json({
            message: "Error while creating expense",
            err: err.message
        })
        console.log(err);
    }
}

const getExpesneByUserId = async (req, res) => {

    try {

        const userId = req.user._id
        const expenses = await expenseModel.find({ userId: userId }).populate("expCategory")
        res.status(200).json({
            message: "Expenses fetched successfully",
            data: expenses
        })
    } catch (err) {
        res.status(500).json({
            message: "Error while fetching expenses",
            err: err
        })
    }
}

const deleteMyExpense= async(req,res)=>{
    await expenseModel.findByIdAndDelete(req.params.id)

    try
    {
        res.status(201).json({
            message:"expense deleted successfully",
            data:expenseModel
        })
    }
    catch(err)
    {
        res.status(500).json({
        message:"expense is not deleted",
        err:err
    })
    } 
} 

const serachExpesneByUserId = async (req,res)=>{
    
    const userId = req.user._id
    const expName = req.query.expName || ""
    var expAmount = req.query.expAmount || ""
    var query = {}

    if(expAmount){
        expAmount =  parseInt(expAmount)
        query = {expAmount:expAmount}
    }
    
    try{
    const expenses = await expenseModel.find({userId:userId,
        $or:[{title:{$regex:expName,$options:"i"}},
            {description:{$regex:expName,$options:"i"}},
            
        ]
    }).populate("expCategory")

    res.status(200).json({
        message:"Expenses searched successfully",
        data:expenses
    })
    }catch(err)
    {
        res.status(500).json({
        message:"expense is not searched",
        err:err
    })
    } 
}

const uploadExpenseReceipt = async(req,res)=>{
    
    const expId = req.body.expenseId
    const file = req.file

    //clodudiary upload --> req.file.path
    //return cloudinaryResponse --> secure_url
    try
    {
    const cloudinaryResponse = await uploadFileToCloudinary(req.file.path)
    const updateExp = await expenseModel.findByIdAndUpdate(expId,{expReceipt:cloudinaryResponse.secure_url})
    res.status(200).json({
        message:"Expense receipt uploaded successfully",
        data:updateExp
    })
    }
    catch(err)
    {
        res.status(500).json({
        message:"expense receipt is not uploaded",
        err:err
    })
    } 
}

module.exports = {
    createExpense,
    getExpesneByUserId,
    deleteMyExpense,
    serachExpesneByUserId,
    uploadExpenseReceipt
    
}