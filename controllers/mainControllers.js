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
}

}


module.exports = mainControllers