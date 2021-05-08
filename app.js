let os = require("os");
let express = require("express");
let app = express();
let http = require("http");
var bodyParser = require("body-parser");

let socketIO = require("socket.io");

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

var currentUser = [];

var products = [{
		id: 1,
		name: "Blue Shoes",
		image: "https://assets.ajio.com/medias/sys_master/root/h5a/h59/13018715881502/-1117Wx1400H-460342492-blue-MODEL.jpg",
		description: "This is the description for the product",
		user: "Goutham"
	},
	{
		id: 2,
		name: "OnePlus Phone",
		image: "https://i.guim.co.uk/img/media/2ce8db064eabb9e22a69cc45a9b6d4e10d595f06/392_612_4171_2503/master/4171.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=fa5c416cc5ad5ee73b326f246a90134b",
		description: "This is the description for the product",
		user: "Joel"
	},
	{
		id: 3,
		name: "DSLR Camera",
		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyT4a_gJEKqAZrwVQvXFNd5-d4f4Ao6gT-Kg&usqp=CAU",
		description: "This is the description for the product",
		user: "Eric"
	},
	{
		id: 4,
		name: "Palm Phone",
		image: "https://cdn57.androidauthority.net/wp-content/uploads/2018/10/Palm-Phone-9-of-13-1340x754.jpg",
		description: "This is the description for the product",
		user: "Regi"
	},
	{
		id: 5,
		name: "Shades",
		image: "https://media.gq-magazine.co.uk/photos/5ea2c205101de100087b2044/master/w_1000,c_limit/20200424-sunglasses-08.jpg",
		description: "This is the description for the product",
		user: "Bale"
	},
	{
		id: 6,
		name: "White Shoes",
		image: "https://rukminim1.flixcart.com/image/300/300/kl6wx3k0/shoe/b/9/c/7-springw-luxury-fashion-white-original-imagyd39gk8whjbv.jpeg?q=90",
		description: "This is the description for the product",
		user: "Kane"
	},
	{
		id: 7,
		name: "Watch",
		image: "https://cdn-image.departures.com/sites/default/files/1577827227/header-holzkern-alfama-womens-watch-WOODWATCH0120.jpg",
		description: "This is the description for the product",
		user: "Son"
	},
	{
		id: 8,
		name: "iPhone",
		image: "https://cdn.vox-cdn.com/thumbor/0vkUlE9CGelZsRZlY1XZZGqsZVQ=/1400x0/filters:no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/22015272/cgartenberg_201105_4276_004.0.jpg",
		description: "This is the description for the product",
		user: "John"
	},
	{
		id: 9,
		name: "Skate Board",
		image: "https://cdn.vox-cdn.com/thumbor/HW-LF6BxSbljrJrxVFYCAUK4_7o=/0x0:4000x2250/1400x1050/filters:focal(1680x805:2320x1445):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/67369155/Skateboard_.0.jpg",
		description: "This is the description for the product",
		user: "Noel"
	}
];

app.get('/', function (req, res) {
	res.render('home');
});

app.get('/products', function (req, res) {
	res.render('products', {
		products: products
	});
});

app.post('/random', function (req, res) {
	var name = req.body.name;
	//console.log(currentUser);
	currentUser.push(name);
	res.redirect('/products');
});

app.post('/products', function (req, res) {
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newid = Math.floor(Math.random() * 10000) + 1;
	var user = req.body.user;

	var product = {
		name: name,
		image: image,
		description: desc,
		id: newid,
		user: user
	}
	products.push(product);

	res.redirect('/products');
});

app.get('/products/new', function (req, res) {
	res.render('new', {
		currentUser: currentUser
	});
});

app.get('/product/:id', function (req, res) {
	products.forEach((product) => {
		if (product.id === parseInt(req.params.id)) {
			res.render('show', {
				product: product
			});
		}
	});
});

app.get("/videoRoom", function (req, res) {
	// render the view
	res.render("video.ejs");
});

let server = http.createServer(app);
server.listen(process.env.PORT || 3000, () => {
	console.log("server running at localhost:3000");
});


let io = socketIO(server);


io.on("connection", function (socket) {

	function log() {
		let array = ["Message from server: "];
		array.push.apply(array, arguments);
		socket.emit("log", array);
	}

	socket.on('message', function (message, room) {
		log('Client said: ', message);
		socket.in(room).emit('message', message, room);
	});


	socket.on('create or join', function (room) {
		log('Received request to create or join room ' + room);

		var clientsInRoom = io.sockets.adapter.rooms[room];
		var numClients = clientsInRoom ? Object.keys(clientsInRoom.sockets).length : 0;
		log('Room ' + room + ' now has ' + numClients + ' client(s)');


		if (numClients === 0) {
			socket.join(room);
			log('Client ID ' + socket.id + ' created room ' + room);
			socket.emit('created', room, socket.id);
		} else if (numClients === 1) {
			log('Client ID ' + socket.id + ' joined room ' + room);
			io.sockets.in(room).emit('join', room);
			socket.join(room);
			socket.emit('joined', room, socket.id);
			io.sockets.in(room).emit('ready');
		} else {
			socket.emit('full', room);
		}
	});

	socket.on('ipaddr', function () {
		var ifaces = os.networkInterfaces();
		for (var dev in ifaces) {
			ifaces[dev].forEach(function (details) {
				if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
					socket.emit('ipaddr', details.address);
				}
			});
		}
	});

	socket.on('bye', function () {
		console.log('received bye');
	});

});