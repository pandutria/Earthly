  import React from "react";
  import "./Product.css";
  import SideBar from "../../../../components/SideBar/SideBar";
  import SearchIcon from "../../../../assets/images/serch.png"; // Typo in filename? Should be "search.png"?
  import { useState, useEffect } from "react";
  import HttpHandler from "../../../../data/HttpHandler";
  import EditIcon from "../../../../assets/images/edit.png";
  import DeleteIcon from "../../../../assets/images/delete.png";
  import Swal from "sweetalert2";
  import { useNavigate } from "react-router-dom";
  import DataStorage from "../../../../helper/DataStorage";

  const Product = () => {
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    // Format price as IDR
    const formatPrice = (price) =>
      new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(price);

    // Fetch products
    const fetchProducts = async () => {
      try {
        Swal.fire({
          title: "Loading",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const res = await HttpHandler.request("products", "GET");
        const parsedRes = JSON.parse(res);
        const { code, body } = parsedRes;

        if (code === 200) {
          const data = JSON.parse(body);
          setProducts(data);
        } else {
          Swal.fire("Error", "Failed to load products.", "error");
        }

        Swal.close();
      } catch (err) {
        Swal.fire("Error", "Something went wrong.", "error");
        console.error(err);
      }
    };

    useEffect(() => {
      fetchProducts();
    }, []);

    // Navigate to add or edit product page
    const handleAddOrEdit = (id) => {
      if (id == null) {
        DataStorage.mode = "add";
      } else {
        DataStorage.mode = "update";
        DataStorage.products_id = id;
      }
      navigate("/admin/manage/product");
    };

    // Navigate directly to edit route
    const handleEdit = (id) => {
      navigate(`/admin/manage/product/${id}`);
    };

    // Delete product
    const handleDelete = async (id) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        try {
          Swal.fire({
            title: "Deleting...",
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });

          const res = await HttpHandler.request(`products/${id}`, "DELETE");
          const parsedRes = JSON.parse(res);
          const { code } = parsedRes;

          Swal.close();

          if (code === 204) {
            fetchProducts(); // Refresh list
            Swal.fire("Deleted!", "Product has been deleted.", "success");
          } else {
            Swal.fire("Error", "Failed to delete product.", "error");
          }
        } catch (err) {
          Swal.close();
          Swal.fire("Error", "Something went wrong.", "error");
          console.error(err);
        }
      }
    };

    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <SideBar />
        <div className="container">
          <h1>Manage Product</h1>
          <p>{products.length} products available</p>

          <div className="filter-container">
            <div className="login-input-wrapper">
              <img alt="Search" src={SearchIcon} className="login-input-icon" />
              <input
                type="text"
                placeholder="Search Products"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="plus">
              <p className="link" onClick={() => handleAddOrEdit(null)}>
                <i className="bx bx-plus"></i>
                <span>Add New Product</span>
              </p>
            </div>
          </div>

          <div className="category-table-container">
            <table className="category-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category Name</th>
                  <th>Description</th>
                  <th>Unit Price</th>
                  <th>Total Review</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products
                  .filter((x) =>
                    x.name?.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((item, index) => (
                    <tr key={index}>
                      <td>
                        <div className="container-product">
                          <img src={item.image_url} alt={item.name} />
                          <div>
                            <h1>{item.name}</h1>
                            <p>PRO {item.id}</p>
                          </div>
                        </div>
                      </td>
                      <td>{item.category?.name || "-"}</td>
                      <td
                        style={{
                          textOverflow: "ellipsis",
                          maxWidth: "150px",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.description || "-"}
                      </td>
                      <td>{formatPrice(item.price)}</td>
                      <td>{item.total_reviews || 0} Reviews</td>
                      <td>
                        <div className="btn-container">
                          <button
                            className="edit-btn"
                            onClick={() => handleAddOrEdit(item.id)}
                          >
                            <img src={EditIcon} alt="Edit" />
                            <p>Edit</p>
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => handleDelete(item.id)}
                          >
                            <img src={DeleteIcon} alt="Delete" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  export default Product;