const Koa = require("koa");
const route = require("koa-route");
const websockify = require("koa-websocket");

const app = websockify(new Koa());

// Using routes
app.ws.use(
	route.all("/", ({ websocket: socket }) => {
		socket.send("Hello World");
		socket.on("message", message => {
			console.log({ message });
			socket.send(JSON.stringify({ message }));
		});
	})
);

app.listen(3000);
console.log("Listening at 3000");
