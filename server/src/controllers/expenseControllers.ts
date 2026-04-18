import { NextFunction, Request, Response } from "express";
import { ExpenseCategory } from "../types";
import { asyncHandler, sendSuccess } from "../utils/responseHelpers";
import { AppError } from "../middleware/errorHandler";
import Expense from "../models/Expense";


// export let fakeExpenses: Expense[] = [
//   {
//     id: "1",
//     userId: "user123",
//     amount: 45.99,
//     category: ExpenseCategory.FOOD,
//     description: "Lunch at restaurant",
//     date: new Date("2025-05-25"),
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: "2",
//     userId: "user456",
//     amount: 20.0,
//     category: ExpenseCategory.TRANSPORT,
//     description: "Uber to work",
//     date: new Date("2025-06-14"),
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: "3",
//     userId: "user123",
//     amount: 120.5,
//     category: ExpenseCategory.SHOPPING,
//     description: "Clothes shopping",
//     date: new Date("2025-10-10"),
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: "4",
//     userId: "user456",
//     amount: 300,
//     category: ExpenseCategory.UTILITIES,
//     description: "Monthly UTILITIES",
//     date: new Date("2025-10-01"),
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: "5",
//     userId: "user123",
//     amount: 60,
//     category: ExpenseCategory.FOOD,
//     description: "Dinner with friends",
//     date: new Date("2025-05-12"),
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: "6",
//     userId: "user456",
//     amount: 15,
//     category: ExpenseCategory.TRANSPORT,
//     description: "Bus ticket",
//     date: new Date("2025-03-08"),
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: "7",
//     userId: "user123",
//     amount: 200,
//     category: ExpenseCategory.ENTERTAINMENT,
//     description: "Movie tickets",
//     date: new Date("2025-02-09"),
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: "8",
//     userId: "user456",
//     amount: 80,
//     category: ExpenseCategory.SHOPPING,
//     description: "Groceries",
//     date: new Date("2025-10-11"),
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: "9",
//     userId: "user123",
//     amount: 25,
//     category: ExpenseCategory.FOOD,
//     description: "Snacks",
//     date: new Date("2025-10-13"),
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: "10",
//     userId: "user456",
//     amount: 500,
//     category: ExpenseCategory.UTILITIES,
//     description: "Office UTILITIES",
//     date: new Date("2025-10-02"),
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: "11",
//     userId: "user123",
//     amount: 70,
//     category: ExpenseCategory.TRANSPORT,
//     description: "Fuel",
//     date: new Date("2025-10-15"),
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: "12",
//     userId: "user456",
//     amount: 40,
//     category: ExpenseCategory.FOOD,
//     description: "Breakfast",
//     date: new Date("2025-10-16"),
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: "13",
//     userId: "user123",
//     amount: 150,
//     category: ExpenseCategory.SHOPPING,
//     description: "Electronics",
//     date: new Date("2025-10-05"),
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: "14",
//     userId: "user456",
//     amount: 90,
//     category: ExpenseCategory.ENTERTAINMENT,
//     description: "Concert ticket",
//     date: new Date("2025-10-06"),
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: "15",
//     userId: "user123",
//     amount: 35,
//     category: ExpenseCategory.FOOD,
//     description: "Lunch",
//     date: new Date("2025-10-17"),
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: "16",
//     userId: "user456",
//     amount: 18,
//     category: ExpenseCategory.TRANSPORT,
//     description: "Auto fare",
//     date: new Date("2025-10-18"),
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: "17",
//     userId: "user123",
//     amount: 220,
//     category: ExpenseCategory.UTILITIES,
//     description: "Shared apartment",
//     date: new Date("2025-10-03"),
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: "18",
//     userId: "user456",
//     amount: 55,
//     category: ExpenseCategory.FOOD,
//     description: "Dinner",
//     date: new Date("2025-10-19"),
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: "19",
//     userId: "user123",
//     amount: 75,
//     category: ExpenseCategory.ENTERTAINMENT,
//     description: "Game subscription",
//     date: new Date("2025-10-07"),
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: "20",
//     userId: "user456",
//     amount: 110,
//     category: ExpenseCategory.SHOPPING,
//     description: "Accessories",
//     date: new Date("2025-10-20"),
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
// ];

export const getExpenses = asyncHandler(async (req:Request, res:Response, next: NextFunction) => {
  const userId = req.userId;
  const { category, sort } = req.query;

  const filter: { userId: string, category? : string} = {
    userId,
  };

  if(category && typeof category === "string"){
    filter.category = category;
  }

  let query = Expense.find(filter);

  if(sort && typeof sort === "string"){
    if(sort === "amount"){
      query = query.sort({amount: 1});
    } else if(sort === "-amount"){
      query = query.sort({amount: -1});
    } else if(sort === "date"){
      query = query.sort({date: 1});
    } else if(sort === "-date") {
      query = query.sort({date: -1});
    }
  }

  const expenses = await query;

  sendSuccess(res, expenses, `Found ${expenses.length} expenses`);
});

export const getExpenseById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId;
  const {id} = req.params;

  const expense = await Expense.findById(id);

  if(!expense){
    //404 --> it means data not found
    throw new AppError("Expense Not Found",404);
  }

  if(expense.userId.toString() !== userId){
    throw new AppError("Unauthorized access to this expense", 403);
  }

  //200 --> it means loading date successful
  sendSuccess(res, expense, "Expense retrieved successfully");
});

export const createExpense = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId;
  const {amount, category, description, date} = req.body;

  if(!amount){
     //400 --> error in request object
    throw new AppError("Amount is required", 400);
  }

  if(!category){
     //400 --> error in request object
    throw new AppError("Category is required", 400);
  }

  if(!description){
     //400 --> error in request object
    throw new AppError("Description is required", 400);
  }

  //Validation - DataTypes
  if(typeof amount !== "number"){
    throw new AppError("Amount must be a number", 400);
  }

  //Validation - BusinessLogic
  if(amount <= 0){
    throw new AppError("Amount must be greater than 0", 400);
  }

  if(amount > 1000000){
    throw new AppError("Amount cannot exceed 1,000,000", 400);
  }

  //Validation - Category
  const validCategories = Object.values(ExpenseCategory);
  if(!validCategories.includes(category)){
    throw new AppError(`Invalid category. Must be one of: ${validCategories.join(", ")}`,400);
  }

  //Validation - description
  if(description.length < 3){
    throw new AppError("Description must be at least 3 characters", 400);
  }

  if(description.length > 300){
    throw new AppError("Description cannot exceed 300 characters", 400);
  }
  const expenseDate = date ? new Date(date) : new Date();
  const today = new Date();
  //today.setHours(0,0,0,0);
  if(expenseDate > today) {
    throw new AppError("Cannot create an expense for a future date", 400);
  }

  const newExpense = new Expense({
    userId: userId,
    amount,
    category,
    description,
    date: expenseDate,
  });

  const createdExpense = await newExpense.save();

  //201 --> it means created 
  sendSuccess(res, createdExpense,"Expense created successfully", 201);
});

export const updateExpense = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

  const userId = req.userId;
  const {id} = req.params;
  const {amount, category, description, date} = req.body;

  const expense = await Expense.findById(id);
  
  if(!expense) {
    throw new AppError("Expense not found", 404);
  }

  if(expense.userId.toString() !== userId){
    throw new AppError("Unauthorized access to this expense", 403);
  }

  //Validation - Provided Fields
  if(amount !== undefined ){
    //Validation - DataTypes
    if(typeof amount !== "number"){
      throw new AppError("Amount must be a number", 400);
    }

    //Validation - BusinessLogic
    if(amount <= 0){
      throw new AppError("Amount must be greater than 0", 400);
    }

    if(amount > 1000000){
      throw new AppError("Amount cannot exceed 1,000,000", 400);
    }
  }

  //Validation - Category
  if(category !== undefined){
    const validCategories = Object.values(ExpenseCategory);
    if(!validCategories.includes(category)){
      throw new AppError(
        `Invalid category. Must be one of: ${validCategories.join(", ")}`,
        400
      );
    }
  }

  //Validation - Description
  if(description !== undefined){
    if(description.length < 3){
      throw new AppError("Description must be at least 3 characters", 400);
    }
    
    if(description.length > 300){
      throw new AppError("Description cannot exceed 300 characters", 400);
    }
  }

  const expenseDate = date ? new Date(date) : new Date();
  const today = new Date();
  //today.setHours(0,0,0,0);
  if(expenseDate > today) {
    throw new AppError("Cannot create an expense for a future date", 400);
  }

  if(amount !== undefined){
    expense.amount = amount;
  }

  if(category !== undefined){
    expense.category = category;
  }

  if(description !== undefined){
    expense.description = description;
  }

  if(date !== undefined){
    expense.date = new Date(date);
  }

  const updatedExpense = await expense.save();

  sendSuccess(res, updatedExpense, "Expense updated successfully");
});

export const deleteExpense = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId;
  const { id } = req.params; 

  const expense = await Expense.findById(id);

  if(!expense) {
    throw new AppError("Expense not found", 404);
  }

  if(expense.userId.toString() !== userId){
    throw new AppError("Unauthorized access to this expense", 403);
  }

  await Expense.findByIdAndDelete(id);

  sendSuccess(res, null, "Expense deleted successfully");
});