import React from "react";
import { Progress } from "antd";

const Analytics = ({ allTransaction }) => {
  const categories = [
    "salary",
    "project",
    "food",
    "tax",
    "movie",
    "electric-bill",
    "clothes",
    "medicine",
    "fees",
  ];

  // Total transactions
  const totalTransaction = allTransaction.length;
  const totalIncomeTransaction = allTransaction.filter(
    (transaction) => transaction.type === "income"
  );
  const totalExpenseTransaction = allTransaction.filter(
    (transaction) => transaction.type === "expense"
  );
  const totalIncomePercent =
    (totalIncomeTransaction.length / totalTransaction) * 100;
  const totalExpensePercent =
    (totalExpenseTransaction.length / totalTransaction) * 100;

  // Total turnover
  const totalTurnover = allTransaction.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  const totalIncomeTurnover = allTransaction
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpenseTurnover = allTransaction
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalIncomeTurnoverPercent =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverPercent =
    (totalExpenseTurnover / totalTurnover) * 100;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header">
              Total Transactions: {totalTransaction}
            </div>
            <div className="card-body">
              <h4 className="mb-3">Income: {totalIncomeTransaction.length}</h4>
              <h4 className="mb-3">Expense: {totalExpenseTransaction.length}</h4>
              <div className="d-flex justify-content-center">
                <Progress
                  type="circle"
                  strokeColor={"blue"}
                  className="mx-2"
                  percent={totalIncomePercent.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2"
                  percent={totalExpensePercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header ">
              Total Turnover: {totalTurnover}
            </div>
            <div className="card-body">
              <h4 className="mb-3">Income: {totalIncomeTurnover}</h4>
              <h4 className="mb-3">Expense: {totalExpenseTurnover}</h4>
              <div className="d-flex justify-content-center">
                <Progress
                  type="circle"
                  strokeColor={"blue"}
                  className="mx-2"
                  percent={totalIncomeTurnoverPercent.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2"
                  percent={totalExpenseTurnoverPercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <h4 className="mb-4">Category-wise Income</h4>
          {categories.map((category) => {
            const amount = allTransaction
              .filter(
                (transaction) =>
                  transaction.type === "income" && transaction.category === category
              )
              .reduce((acc, transaction) => acc + transaction.amount, 0);
            return (
              amount > 0 && (
                <div className="card mb-3" key={category}>
                  <div className="card-body">
                    <h5 className="mb-3">{category}</h5>
                    <Progress
                      percent={((amount / totalIncomeTurnover) * 100).toFixed(0)}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>

        <div className="col-md-6">
          <h4 className="mb-4">Category-wise Expense</h4>
          {categories.map((category) => {
            const amount = allTransaction
              .filter(
                (transaction) =>
                  transaction.type === "expense" && transaction.category === category
              )
              .reduce((acc, transaction) => acc + transaction.amount, 0);
            return (
              amount > 0 && (
                <div className="card mb-3" key={category}>
                  <div className="card-body">
                    <h5 className="mb-3">{category}</h5>
                    <Progress
                      percent={((amount / totalExpenseTurnover) * 100).toFixed(0)}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Analytics;