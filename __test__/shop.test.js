const axios = require("axios");

test("Register Test : ", async () => {
  const res = await axios.post("http://localhost:4000/home/register", {
    fullName: "Test Test",
    username: "Test004011",
    password: "Test001t",
    role: "admin",
  });

  expect(res.status).toBe(201);
  expect(res.data).toBe("Created Successfully");
});

test("Login Test : ", async () => {
  const res = await axios.post("http://localhost:4000/home/login", {
    username: "Test004011",
    password: "Test001t",
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
    "http://localhost:4000/item/65410c2e235437de3f936291",
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
    "http://localhost:4000/item/65410c2e235437de3f936291",
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
    "http://localhost:4000/item/65411129f146ad05881c336a",
    {
      headers: {
        Authorization: `Bearer ${global.token}`,
      },
    }
  );

  expect(res.data).toBe("Item has been deleted sucessfully!");
});

test("Delete User Profile Test : ", async () => {
  const res = await axios.get("http://localhost:4000/home/deleteuser", {
    headers: {
      Authorization: `Bearer ${global.token}`,
    },
  });

  expect(typeof res.data).toBe("object");
});
