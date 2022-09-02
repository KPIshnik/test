import express from "express";

export const app = express();

app.use(express.json());
const db = {
	users: [
		{ id: 1, username: "Io" },
		{ id: 2, username: "Fran" },
		{ id: 3, username: "Kris" },
	],
};

app.get("/", (req, res) => {
	res.send("Aloha Mather Fucker! \n");
});

app.get("/users", (req, res) => {
	let users = db.users;

	if (req.query.username) {
		users = users.filter(
			(u) => u.username.indexOf(req.query.username as string) > -1
		);
	}

	res.json(users);
});
app.get("/users/:id", (req, res) => {
	const user = db.users.find((u) => u.id === +req.params.id);
	if (!user) {
		res.sendStatus(404);
		return;
	}

	res.json(user);
});

app.post("/users", (req, res) => {
	if (!req.body.user.username) {
		res.status(400).json({ err: "username required" });
		return;
	}

	db.users.push({ id: Date.now(), username: req.body.user.username });
	const user = db.users.find((u) => u.username === req.body.user.username);

	res.status(201).json(user);
});

app.delete("/users/:id", (req, res) => {
	const user = db.users.find((u) => u.id === +req.params.id);
	if (!user) {
		res.sendStatus(404);
		return;
	}
	db.users.splice(db.users.indexOf(user), 1);
	res.status(200).json(db.users);
});
app.put("/users/:id", (req, res) => {
	const user = db.users.find((u) => u.id === +req.params.id);
	if (!user) {
		res.sendStatus(404);
		return;
	}
	if (!req.body.user.username) {
		res.sendStatus(400);
		return;
	}

	user.username = req.body.user.username;
	res.status(201).json(user);
});

app.delete("/__test__/users", (req, res) => {
	db.users = [];
	res.sendStatus(204);
});

export const server = app.listen(3000, () => {
	console.log("started server");
});
