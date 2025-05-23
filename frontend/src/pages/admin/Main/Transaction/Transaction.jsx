import React, { useEffect, useState } from "react";
import DataStorage from "../../../../helper/DataStorage";
import "./Transaction.css";
import Search from "../../../../assets/images/serch.png";
import SideBar from "../../../../components/SideBar/SideBar";
import HttpHandler from "../../../../data/HttpHandler";
import Swal from "sweetalert2";

const Transaction = () => {
  const [search, setSearch] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [transactionDetails, setTransactionDetails] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await HttpHandler.request("publicTh");
      const code = JSON.parse(res).code;
      const body = JSON.parse(res).body;

      if (code === 200) {
        const data = JSON.parse(body);
        setTransactions(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetchTransactionDetails = async (transactionId) => {
    try {
      const res = await HttpHandler.request(`td?transactionHeader=${transactionId}`);
      const code = JSON.parse(res).code;
      const body = JSON.parse(res).body;

      if (code === 200) {
        const data = JSON.parse(body);
        setTransactionDetails(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSelectTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    fetchTransactionDetails(transaction.id);
  };

 const handleMarkAsDone = (transactionId) => {
  Swal.fire({
    title: "Are you sure?",
    text: "This will mark the transaction as completed",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#7B936F",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, mark as done!"
  }).then(async (result) => {
    if (result.isConfirmed) {
      await updateTransactionStatus(transactionId);
    }
  });
};

const updateTransactionStatus = async (id) => {
  Swal.fire({
    title: "Loading",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  try {
    const rBody = { status: "Completed" };

    const res = await HttpHandler.request(`th/${id}`, "PUT", null, rBody);
    const code = JSON.parse(res).code;

    Swal.close();

    if (code === 200) {
      const updatedTransactions = transactions.map(t =>
        t.id === id ? { ...t, status: "Completed" } : t
      );
      setTransactions(updatedTransactions);

      if (selectedTransaction?.id === id) {
        setSelectedTransaction({ ...selectedTransaction, status: "Completed" });
      }

      Swal.fire("Done!", "Transaction has been marked as completed.", "success");
    } else {
      Swal.fire("Error", "Failed to update transaction", "error");
    }
  } catch (err) {
    Swal.close();
    Swal.fire("Error", `${err}`, "error");
    console.log(err);
  }
};


  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SideBar />
      <div className="transaction-section">
        <h1>Transactions</h1>
        <p>{transactions.length} transactions available</p>
        
        <div className="transaction-filter-container">
          <div className="transaction-search-wrapper">
            <img src={Search} alt="" className="transaction-search-icon" />
            <input
              type="text"
              placeholder="Search Transactions"
              value={search}
              onChange={(x) => setSearch(x.target.value)}
            />
          </div>
        </div>

        <div className="transaction-table-container">
          <table className="transaction-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Customer</th>
                <th>Address</th>
                <th>Date</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {transactions
                .filter((item) =>
                  item.user.fullname.toLowerCase().includes(search.toLowerCase()) ||
                  item.address.toLowerCase().includes(search.toLowerCase())
                )
                .map((item, index) => (
                  <tr 
                    key={index} 
                    onClick={() => handleSelectTransaction(item)}
                    className={selectedTransaction?.id === item.id ? "selected-row" : ""}
                  >
                    <td>{"TRX " + item.id}</td>
                    <td>{item.user.fullname}</td>
                    <td>{item.address}</td>
                    <td>{formatDate(item.date)}</td>
                    <td>{formatPrice(item.total_price)}</td>
                    <td>
                      <span className={`status-badge ${item.status.toLowerCase()}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="done-btn" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMarkAsDone(item.id);
                        }}
                        disabled={item.status === "Completed"}
                      >
                        Done
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {selectedTransaction && (
          <>
            <h2 style={{ marginTop: "30px" }}>Transaction Details</h2>
            <p>{transactionDetails.length} items in this transaction</p>
            
            <div className="transaction-details-container">
              <table className="transaction-table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Qty</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionDetails.map((item, index) => (
                    <tr key={index}>
                      <td>{"TD " + item.id}</td>
                      <td>{item.product.name}</td>
                      <td>{item.product.category.name}</td>
                      <td>{item.qty}</td>
                      <td>{formatPrice(item.price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Transaction;