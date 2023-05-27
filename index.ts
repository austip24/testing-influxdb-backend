import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "http://localhost:5173", // allow cors for the frontend
	},
});

app.get("/api/v1", (_req, res) => {
	res.json({
		project: "Testing Express server",
		from: "Austin",
	});
});

const { PORT = 5000 } = process.env;

io.on("connection", (socket) => {
  console.log("a user connected");
  
  socket.emit("hello", "world");

});

server.listen(PORT, () => {
	console.log();
	console.log(`    App running in port ${PORT}`);
	console.log();
	console.log(`    > Local:
  \x1b[36mhttp://localhost:\x1b[1m${PORT}/\x1b[0m`);
});
