var express = require("express"),
	app     = express(),
	bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine','ejs');

var products = [
	{ 
	id: 1,
	name: "Blue Shoes", 
	image:"https://assets.ajio.com/medias/sys_master/root/h5a/h59/13018715881502/-1117Wx1400H-460342492-blue-MODEL.jpg",
	description: "This is the description for the product" 
	},
	{
	id: 2,
	name: "OnePlus Phone", 
	image:"https://i.guim.co.uk/img/media/2ce8db064eabb9e22a69cc45a9b6d4e10d595f06/392_612_4171_2503/master/4171.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=fa5c416cc5ad5ee73b326f246a90134b" ,
	description: "This is the description for the product" 
	},
	{
	id: 3, 
	name: "DSLR Camera", 
	image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyT4a_gJEKqAZrwVQvXFNd5-d4f4Ao6gT-Kg&usqp=CAU",
	description: "This is the description for the product"
	},
	{
	id: 4, 
	name: "Palm Phone", 
	image:"https://cdn57.androidauthority.net/wp-content/uploads/2018/10/Palm-Phone-9-of-13-1340x754.jpg",
	description: "This is the description for the product"
	},
	{ 
	id: 5,	
	name: "Shades", 
	image:"https://media.gq-magazine.co.uk/photos/5ea2c205101de100087b2044/master/w_1000,c_limit/20200424-sunglasses-08.jpg",
	description: "This is the description for the product" 
	},
	{
	id: 6, 
	name: "White Shoes", 
	image:"https://rukminim1.flixcart.com/image/300/300/kl6wx3k0/shoe/b/9/c/7-springw-luxury-fashion-white-original-imagyd39gk8whjbv.jpeg?q=90",
	description: "This is the description for the product"
	},
	{ 
	id: 7,	
	name: "Watch", 
	image:"https://cdn-image.departures.com/sites/default/files/1577827227/header-holzkern-alfama-womens-watch-WOODWATCH0120.jpg",
	description: "This is the description for the product" 
	},
	{
	id: 8,
	name: "iPhone", 
	image:"https://cdn.vox-cdn.com/thumbor/0vkUlE9CGelZsRZlY1XZZGqsZVQ=/1400x0/filters:no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/22015272/cgartenberg_201105_4276_004.0.jpg",
	description: "This is the description for the product"
	},
	{ 
	id: 9,
	name: "Skate Board", 
	image:"https://cdn.vox-cdn.com/thumbor/HW-LF6BxSbljrJrxVFYCAUK4_7o=/0x0:4000x2250/1400x1050/filters:focal(1680x805:2320x1445):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/67369155/Skateboard_.0.jpg",
	description: "This is the description for the product" 
	}
];

app.get('/', function(req, res){
	res.render('home');
});

app.get('/products', function(req, res){
	res.render('products', {products: products});
});


app.post('/products', function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newid = Math.floor(Math.random() * 10000) + 1; 

	var product = { 
	name: name, 
	image:image , 
	description: desc,
	id: newid }
	products.push(product);
	
	res.redirect('/products');
});

app.get('/products/new', function(req, res){
	res.render('new');
});

app.get('/product/:id', function(req, res){
	products.forEach((product) =>{
		if(product.id === parseInt(req.params.id)){
			res.render('show', {product: product});
		}
	});
});

app.listen(3000, function() { 
  console.log('Server has started'); 
});