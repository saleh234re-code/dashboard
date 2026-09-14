import axios from "axios";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import EditIcon from "@mui/icons-material/Edit";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { productsContext } from "../Context/ProductsContext";
import Input from "@mui/material/Input";
import StatCard from "../Components/StatCard";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";

import Draggable from "react-draggable";
import { useEffect, useState, useContext } from "react";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import ThreeDRotation from "@mui/icons-material/ThreeDRotation";

import "../Projectstyle.css";

export default function Products() {
  const context = useContext(productsContext);

  console.log(context);
  const [form, setForm] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
    image: null,
  });
  const [editproduct, setEditproduct] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [search, setSearch] = useState("");
  const { product, setproduct } = useContext(productsContext);
  const [category, setCategory] = useState("all");
  function cancleFilter() {
    setCategory("all");
  }

  const showProduct = product
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => category === "all" || p.category === category)
    .map((p) => {
      return (
        <div key={p.id} id="productsShow" dir="rtl">
          <Box
            sx={{
              width: 300,
              p: 3,
              borderRadius: 4,
              background: "linear-gradient(135deg, #ffffff, #f5f7fb)",
              border: "1px solid #e5e7eb",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              transition: "0.3s",
              cursor: "pointer",

              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 15px 35px rgba(0,0,0,0.12)",
              },
            }}
          >
            <img src={p.image} id="productimage" />
            <h4
              dir="ltr"
              style={{
                width: "100%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {p.title}
            </h4>
            <span id="category">{p.category}</span>
            <p>{p.price}$</p>
            <span id="rating" dir="ltr" style={{ color: "black" }}>
              {"⭐".repeat(Math.round(p.rating.rate))}
              {p.rating.rate} ({p.rating.count})
            </span>
            <div style={{ display: "flex", gap: "5px" }}>
              {" "}
              <DeleteIcon
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  "&:hover": {
                    color: "blue",
                  },
                }}
                onClick={() => HandleDelete(p.id)}
              />
              <EditIcon
                onClick={() => HandleEdit(p)}
                sx={{
                  "&:hover": {
                    color: "blue",
                  },
                }}
              />
            </div>
          </Box>
        </div>
      );
    });
  function HandleDelete(i) {
    const updatedProducts = product.filter((p) => p.id !== i);

    setproduct(updatedProducts);
  }
  function HandleEdit(p) {
    setEditproduct(p);
    setForm({
      title: p.title,
      price: p.price,
      description: p.description,
      category: p.category,
      image: p.image,
    });
    handleClickOpen();
  }

  return (
    <div>
      <div>
        <Button
          variant="contained"
          sx={{ float: "right", mr: 2 }}
          onClick={() => {
            setEditproduct(null);
            handleClickOpen();
          }}
        >
          + Add Product
        </Button>{" "}
        <h2 style={{ textAlign: "start", paddingLeft: "10px" }}>
          Products
        </h2>{" "}
      </div>
      <div dir="rtl" id="productsElements">
        <Box
          sx={{
            width: "100%",
            p: 2,
            borderRadius: 4,
            background: "linear-gradient(135deg, #ffffff, #f5f7fb)",
            border: "1px solid #e5e7eb",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            transition: "0.3s",
            cursor: "pointer",

            "&:hover": {
              boxShadow: "0 15px 35px rgba(0,0,0,0.12)",
            },
          }}
        >
          <TextField
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            variant="outlined"
            placeholder="ابحث عن منتج..."
            sx={{
              width: "600px",
              marginLeft: "10px",
            }}
          />
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option>اختار الفئة</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="jewelery">jewelery</option>
            <option value="electronics">electronics</option>
            <option value="women's clothing">women's clothing</option>
          </select>
          <div id="restart">
            <sup style={{ marginRight: "10px" }}>إلغاء الفلترة</sup>
            <RestartAltIcon
              sx={{
                cursor: "pointer",
                color: "rgb(0, 112, 120)",
                marginRight: "3px",
              }}
              onClick={() => {
                setSearch("");
                setCategory("all");
              }}
            />
          </div>
        </Box>
      </div>

      {showProduct}

      <div>
        <Dialog
          dir="rtl"
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();

              if (editproduct) {
                setproduct((prev) =>
                  prev.map((p) =>
                    p.id === editproduct.id
                      ? {
                          ...p,
                          title: form.title,
                          price: form.price,
                          description: form.description,
                          image:
                            form.image instanceof File
                              ? URL.createObjectURL(form.image)
                              : p.image,

                          category: form.category,
                          rating: {
                            rate: 0,
                            count: 0,
                          },
                        }
                      : p
                  )
                );
              } else {
                const NewProducts = {
                  id: Date.now(),
                  title: form.title,
                  price: form.price,
                  description: form.description,
                  category: form.category,
                  image:
                    form.image instanceof File
                      ? URL.createObjectURL(form.image)
                      : "",
                  rating: {
                    rate: 0,
                    count: 0,
                  },
                };

                setproduct((prev) => [...prev, NewProducts]);
              }

              console.log(form);
              handleClose();
            },
          }}
        >
          <DialogTitle>إضافة منتج جديد</DialogTitle>
          <DialogContent>
            <TextField
              sx={{
                "& .MuiInputLabel-root": {
                  right: 0,
                  left: "auto",
                  transformOrigin: "top right",
                },
              }}
              autoFocus
              required
              value={form.title}
              onChange={(e) => {
                setForm({
                  ...form,
                  title: e.target.value,
                });
              }}
              margin="dense"
              id="title"
              name="title"
              label="اسم النتج"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              sx={{
                "& .MuiInputLabel-root": {
                  right: 0,
                  left: "auto",
                  transformOrigin: "top right",
                },
              }}
              autoFocus
              required
              value={form.category}
              onChange={(e) => {
                setForm({
                  ...form,
                  category: e.target.value,
                });
              }}
              margin="dense"
              id="category"
              name="category"
              label="فئة المنتج"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              sx={{
                "& .MuiInputLabel-root": {
                  right: 0,
                  left: "auto",
                  transformOrigin: "top right",
                },
              }}
              autoFocus
              required
              margin="dense"
              id="price"
              value={form.price}
              onChange={(e) => {
                setForm({
                  ...form,
                  price: e.target.value,
                });
              }}
              name="price"
              label="السعر"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              sx={{
                "& .MuiInputLabel-root": {
                  right: 0,
                  left: "auto",
                  transformOrigin: "top right",
                },
              }}
              autoFocus
              required
              margin="dense"
              id="describtion"
              name="description"
              value={form.description}
              onChange={(e) => {
                setForm({
                  ...form,
                  description: e.target.value,
                });
              }}
              label="الوصف"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="image"
              onChange={(e) => {
                setForm({
                  ...form,
                  image: e.target.files[0],
                });
              }}
              name="image"
              label="صورة المنتج"
              type="file"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>إلغاء</Button>
            <Button type="submit">{editproduct ? "تعديل" : "إضافة"}</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
