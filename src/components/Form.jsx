import React, { useState, useEffect } from 'react';

const Form = () => {
  // State to store the list of expenses
  const [expenses, setExpenses] = useState([]);

  // Get expenses from localStorage on component mount
  useEffect(() => {
    const storedExpenses = localStorage.getItem('expenses');
    if (storedExpenses) {
      setExpenses(JSON.parse(storedExpenses));
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault(); //otherwise data will be stored on the URL

    const expensename = e.target.name.value; //here name on the right side is the id of the that field which contains name and on click it will fetch the fontent of that field and store it in name 
    const category = e.target.category.value; //here category written on right side is the id of the that field
    const amount = e.target.amount.value;
    const date = e.target.date.value;

    const expense = {
      expensename,
      category,
      amount: parseFloat(amount),
      date,
    };

    // Update the list of expenses
    const updatedExpenses = [...expenses, expense];

    // Save the updated expenses to localStorage
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));

    // Update the component's state
    setExpenses(updatedExpenses);

    // Reset form fields
    e.target.reset();
  }

  return (
    <div>
      <header id="header">
        <h1>Expense Form</h1>
      </header>
      <section>
        <form id="form" onSubmit={handleSubmit}>
          <label htmlFor="name">Expense Name:</label>
          <input type="text" id="name" name="name" placeholder="Expense Name" required />

          <label htmlFor="category">Category:</label>
          <select id="category" name="category" required>
            <option value="Travel">Travel</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Utilities">Utilities</option>
            <option value="Health">Health</option>
            <option value="Other">Others</option>
          </select>

          <label htmlFor="amount">Amount:</label>
          <input type="number" id="amount" name="amount" placeholder="Amount" required />

          <label htmlFor="date">Date:</label>
          <input type="date" id="date" name="date" required />

          <button type="submit">Submit</button>
        </form>
      </section>

      <section id="expense-list">
        <h3>Expense List</h3>
        <table>
          <thead>
            <tr>
              <th>Expense Name</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={index}>
                <td>{expense.expensename}</td>
                <td>{expense.category}</td>
                <td>{expense.amount}</td>
                <td>{expense.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Form;
