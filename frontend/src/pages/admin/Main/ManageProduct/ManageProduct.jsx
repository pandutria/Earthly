import React, { useTransition } from "react";
import SideBar from "../../../../components/SideBar/SideBar";
import { useState, useEffect } from "react";
import "./ManageProduct.css";
import Add from "../../../../assets/images/add.png";
import { storage } from "../../../../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Swal from "sweetalert2";
import HttpHandler from "../../../../data/HttpHandler";
import { useNavigate } from "react-router-dom";
import DataStorage from "../../../../helper/DataStorage";

const ManageProduct = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [weight, setWeight] = useState("");
  const [tags, setTags] = useState("null");
  const [dimensions, setDimensions] = useState("");
  const [materials, setMaterials] = useState("null");
  const [image_url, setImage] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    fecthCategoryData();
    if (DataStorage.mode === "update") fecthProductsData()
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Swal.fire({
      title: "Uploading...",
      text: "Please wait while your image is uploading",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const imageRef = ref(storage, `product-images/${file.name}`);
    await uploadBytes(imageRef, file);
    const downloadURL = await getDownloadURL(imageRef);
    setImage(downloadURL); // Set ke input

    Swal.close(); // tutup loading
    Swal.fire("Success", "Image uploaded successfully", "success");
  };

  const openFileExplorer = () => {
    document.getElementById("hiddenFileInput").click();
  };

  const handleData = () => {
    if (DataStorage.mode === "add") handlePost()
    else handlePut(DataStorage.products_id)
  }

  const handlePost = async () => {
    if (
      !name ||
      !desc ||
      !price ||
      !weight ||
      !tags ||
      !dimensions ||
      !materials ||
      !image_url
    ) {
      alert("All field must be filled");
      return;
    }

    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });


    try {
      const json = {
        name: name,
        description: desc,
        price: price,
        image_url: image_url,
        tags: tags,
        materials: materials,
        weight: weight,
        dimensions: dimensions,
        category_id: selectedCategoryId
      }

      const data = await HttpHandler.request("products", "POST", null, json);
      const code = JSON.parse(data).code;

      Swal.close();

      if (code === 201) {
        
        Swal.fire("Success", "Add data Successful", "success");
        navigate("/main/admin/product");
      }
    } catch (err) {
      console.log(err);
      Swal.fire("Error", `${err}`, "error");
    }
  };

  const handlePut = async () => {
    if (
      !name ||
      !desc ||
      !price ||
      !weight ||
      !tags ||
      !dimensions ||
      !materials ||
      !image_url
    ) {
      alert("All field must be filled");
      return;
    }

    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const json = {
        name: name,
        description: desc,
        price: price,
        image_url: image_url,
        tags: tags,
        materials: materials,
        weight: weight,
        dimensions: dimensions,
        category_id: selectedCategoryId
      }

      const data = await HttpHandler.request(`products/${DataStorage.products_id}`, "PUT", null, json);
      const code = JSON.parse(data).code;

      Swal.close();

      if (code === 200) {
        
        Swal.fire("Success", "Update data Successful", "success");
        navigate("/main/admin/product");
      }
    } catch (err) {
      console.log(err);
      Swal.fire("Error", `${err}`, "error");
    }
  };

  const fecthProductsData = async () => {
    try {
      const res = await HttpHandler.request(`products/${DataStorage.products_id}`, "GET")
      const code = JSON.parse(res).code
      const body = JSON.parse(res).body

    if (code === 200) {
        const data = JSON.parse(body)
        setName(data.name);
        setDesc(data.description);
        setPrice(data.price);
        setWeight(data.weight);
        setTags(data.tags);
        setDimensions(data.dimensions);
        setMaterials(data.materials);
        setImage(data.image_url);
        setSelectedCategoryId(data.category_id.toString()); 
        
      }
    } catch(err) {
      console.log(err)
    }
  }

  const fecthCategoryData = async () => {
    try {
      const res = await HttpHandler.request(`categories`, "GET");
      const code = JSON.parse(res).code;
      const body = JSON.parse(res).body;

      if (code === 200) {
        const data = JSON.parse(body); // array of categories
        setCategories(data);
      }
    } catch (err) {
      Swal.fire("Error", `${err}`, "error");
      console.log(err);
    }
  };

  const navToMain = () => {
    navigate("/main/admin/product")
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SideBar />
      <div className="section">
        <div className="add-container">
          <div className="add-text">
            <h1>Add Product</h1>
            <p>Add the product to support the customer</p>
          </div>
          <div className="add-btn">
            <button className="btn-discard" onClick={navToMain}>Discard Changes</button>
            <button className="btn-add" onClick={handleData}>Add Product</button>
          </div>
        </div>

        <div className="input-data-container">
          <div className="input-container">
            <div className="data-container" style={{ height: "250px" }}>
              <h1>General Information</h1>
              <p>Product Name</p>
              <input
                type="text"
                placeholder="Enter your product"
                value={name}
                onChange={(x) => setName(x.target.value)}
              />
              <p style={{ marginTop: "10px" }}> Description</p>
              <input
                type="text"
                placeholder="Enter your descirption"
                value={desc}
                onChange={(x) => setDesc(x.target.value)}
              />
            </div>
            <div className="data-container" style={{ height: "150px" }}>
              <h1>Category</h1>
              <p>Category Name</p>
              <select
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
              >
                <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="input-container">
            <div className="data-container  " style={{ height: "160px" }}>
              <h1>Product Media</h1>
              <p>Photo Product</p>
              <div className="add-image">
                <input
                  type="text"
                  placeholder="Image URL"
                  value={image_url}
                  readOnly
                  style={{ width: "500px" }}
                />
                <img src={Add} alt="" onClick={openFileExplorer} />
                <input
                  type="file"
                  accept="image/*"
                  id="hiddenFileInput"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
              </div>
            </div>
            <div className="data-container" style={{ height: "240px" }}>
              <h1>Price</h1>
              <p>Base Price</p>
              <input type="number" placeholder="Rp"
              value={price}
              onChange={(x) => setPrice(x.target.value)} />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "15px",
                  marginTop: "10px",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p>Dimensions</p>
                  <input
                    style={{ width: "270px" }}
                    type="text"
                    placeholder="Enter Dimensions"
                    value={dimensions}
                    onChange={(x) => setDimensions(x.target.value)}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p>Weight</p>
                  <input
                    style={{ width: "270px" }}
                    type="text"
                    placeholder="Enter Weight"
                    value={weight}
                    onChange={(x) => setWeight(x.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProduct;
