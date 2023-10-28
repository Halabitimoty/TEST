const axios = require("axios");
const auth = require("../Schema/userSchema");

test("Register Test : ", async () => {
  const res = await axios.post("http://localhost:4000/home/register", {
    fullName: "Timothy Team",
    username: "Timohty0040",
    password: "Tassk001t",
    role: "admin",
  });

  expect(res.status).toBe(201);
  expect(res.data).toBe("Created Successfully");
});

test("Login Test : ", async () => {
  const res = await axios.post("http://localhost:4000/home/login", {
    username: "Timohty0040",
    password: "Tassk001t",
  });

  global.token = res.data.token;
  expect(typeof res.data).toBe("object");
});

test("User Profile Test : ", async () => {
  const res = await axios.get("http://localhost:4000/home/profile", {
    headers: {
      Authorization: `Bearer ${global.token}`,
    },
  });

  expect(typeof res.data).toBe("object");
});

test("Delete User Profile Test : ", async () => {
  const res = await axios.get("http://localhost:4000/home/deleteuser", {
    headers: {
      Authorization: `Bearer ${global.token}`,
    },
  });

  expect(typeof res.data).toBe("object");
});
