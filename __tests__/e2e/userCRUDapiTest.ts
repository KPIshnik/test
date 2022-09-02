import request from "supertest";
import { server } from "../../index";

describe("Testing CRUD API", () => {
	test("Should dell all users and return 204", async () => {
		await request(server).delete("/__test__/users").expect(204);
	});

	test("should add  user Tolic", async () => {
		const res = await request(server)
			.post("/users")
			.send({ user: { username: "tolic" } })
			.expect(201);

		expect(res.body).toEqual({
			id: expect.any(Number),
			username: "tolic",
		});
	});

	test("should add  user Vera", async () => {
		const res = await request(server)
			.post("/users")
			.send({ user: { username: "Vera" } })
			.expect(201);

		expect(res.body).toEqual({
			id: expect.any(Number),
			username: "Vera",
		});
	});

	test("should fail adding user", async () => {
		const res = await request(server)
			.post("/users")
			.send({ user: { uername: "Fail" } })
			.expect(400);

		expect(res.body).toEqual({ err: "username required" });
	});

	test("should get 2 users", async () => {
		const res = await request(server).get("/users").expect(200);
		console.log(res.body);

		expect(res.body).toEqual([
			{
				id: expect.any(Number),
				username: "tolic",
			},
			{
				id: expect.any(Number),
				username: "Vera",
			},
		]);
	});

	test("should get user by id", async () => {
		const res = await request(server).get("/users");
		const id = res.body[0].id;

		await request(server).get(`/users/${id}`).expect({
			id,
			username: "tolic",
		});
	});

	test("shouldn't get user by wrong id", async () => {
		await request(server).get(`/users/0`).expect(404);
	});

	test("should get user by username part", async () => {
		const res = await request(server).get("/users?username=to");
		expect(res.body).toEqual([
			{
				id: expect.any(Number),
				username: "tolic",
			},
		]);
	});

	test("shouldn't get user by wrong username part", async () => {
		const res = await request(server)
			.get("/users?username=$321234^&*())2312")
			.expect(200, []);
	});

	test("shouldn't chenge user by wrong id", async () => {
		const res = await request(server).put("/users/0").expect(404);
	});

	test("shouldn't chenge user by wrong request", async () => {
		const res = await request(server).get("/users");
		const id = res.body[0].id;

		await request(server)
			.put(`/users/${id}`)
			.send({ user: { usr: "lala" } })
			.expect(400);
	});

	test("should chenge user", async () => {
		const res = await request(server).get("/users");
		const id = res.body[0].id;

		await request(server)
			.put(`/users/${id}`)
			.send({ user: { username: "Lyala" } })
			.expect(201, { id, username: "Lyala" });
	});

	///////////
	test("should delete user by id", async () => {
		const res = await request(server).get("/users");
		const id = res.body[1].id;

		await request(server)
			.delete(`/users/${id}`)
			.expect(200, [{ id: res.body[0].id, username: "Lyala" }]);
	});

	test("shouldn't delete user by wrong id", async () => {
		await request(server).delete(`/users/0`).expect(404);
	});

	afterAll(() => {
		server.close();
	});
	// test("Should return all users", anc () => {
	// 	await request(app)
	// 		.post("/users")
	// 		.send({ user: { username: "tolic" } });

	// 	const users = await request(app).get("/users").expect(200);

	// 	expect(users.body).toEqual([
	// 		{
	// 			id: expect.any(Number),
	// 			username: "tolic",
	// 		},
	// 	]);
	// });
});
