const axios = require("axios");

test("Register Test : ", async () => {
  const res = await axios.post("http://localhost:4000/home/register", {
    fullName: "Timothy Team",
    username: "Timohty00401",
    password: "Tassk001t",
    role: "admin",
  });

  expect(res.status).toBe(201);
  expect(res.data).toBe("Created Successfully");
});

test("Login Test : ", async () => {
  const res = await axios.post("http://localhost:4000/home/login", {
    username: "Timohty00401",
    password: "Tassk001t",
  });

  global.token = res.data.token;
  expect(typeof res.data).toBe("object");
});

test("Get all Items Test : ", async () => {
  const res = await axios.get("http://localhost:4000/item/", {
    headers: {
      Authorization: `Bearer ${global.token}`,
    },
  });

  expect(typeof res.data).toBe("object");
});

test("Create Item Test : ", async () => {
  const res = await axios.post(
    "http://localhost:4000/item/",
    {
      name: "Test name 1",
      description: "Test description 1",
      isInStock: false,
      price: 50,
    },
    {
      headers: {
        Authorization: `Bearer ${global.token}`,
      },
    }
  );
  expect(typeof res.data).toBe("object");
});

test("Edit Item Test : ", async () => {
  const res = await axios.patch(
    "http://localhost:4000/item/65410b2b0fe9c757cad6bb73",
    {
      name: "req.body.name",
      description: "req.body.description",
      isInStock: true,
      price: 40,
    },
    {
      headers: {
        Authorization: `Bearer ${global.token}`,
      },
    }
  );

  expect(typeof res.data).toBe("object");
});

test("Get Items By ID Test : ", async () => {
  const res = await axios.get(
    "http://localhost:4000/item/65410b300fe9c757cad6bb7f",
    {
      headers: {
        Authorization: `Bearer ${global.token}`,
      },
    }
  );

  expect(typeof res.data).toBe("object");
});

test("Delete Item Test : ", async () => {
  const res = await axios.delete(
    "http://localhost:4000/item/6541112cf146ad05881c3375",
    {
      headers: {
        Authorization: `Bearer ${global.token}`,
      },
    }
  );

  expect(res.data).toBe("Item has been deleted sucessfully!");
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
