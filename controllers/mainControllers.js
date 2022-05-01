const express = require ("express")
const fs = require ("fs")
const path = require ("path")
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const destacados = products.filter ((vino) => vino.destacado === true)


const mainControllers = {

index: (req,res) => {
    res.render ('index', { destacados })
},

products: (req,res) => {
    let routeID = Number(req.params.id)
    res.render ('products/products', { products })
},

productDetail: (req,res) => {
    let routeID = Number(req.params.id)
    let product = products.find ((p) => p.id == routeID)
    product == undefined ? res.send ("Producto no encontrado") : res.render ('products/productdetail', {"product" : product})
    },
 
productCart: (req,res) => {
    res.render ('products/productCart')
},

login: (req,res) => {
    res.render ('users/login')
},

register: (req,res) => {
    res.render ('users/register')
},

about: (req,res) => {
    res.render ('about-us')
},

newProduct: (req,res) => {
    res.render ('products/newProduct')
},
destroy : (req, res) => {
    id=req.params.id
    let aEliminar= products.filter((p)=> 
    p.id != id
    )
    console.log(aEliminar)
    fs.writeFileSync(productsFilePath, JSON.stringify(aEliminar), "utf-8");

      res.redirect("/products");  

},
edit: (req, res) => {
    let id = req.params.id
    let productToEdit = products.find(element => element.id == id);
    res.render("product-edit-form", {productToEdit})
},

update: (req, res) => {
    let id = req.params.id
    let productToEdit = products.find(element => element.id == id);
    let image ="red-wine-4813262_640.jpg";
    productToEdit = {
        ...req.body,
        id: id,
        image,
      };

      let newEditProduct= products.map( (p)=>{
          if(p.id == id){
             return (p = { ...productToEdit});
          }
          return p;

      })

      fs.writeFileSync(productsFilePath, JSON.stringify(newEditProduct), "utf-8");

      res.redirect("/");  
    

},

}


module.exports = mainControllers