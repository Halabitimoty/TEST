test("Login Test : ", async () => {
  const res = await axios.post("http://localhost:4000/home/login", {
    username: "Timohty0040",
    password: "Tassk001t",
  });

  global.token = res.data.token;
  expect(typeof res.data).toBe("object");
});

test("Get all Items Test : ", async () => {
  const res = await axios.get("http://localhost:4000/item/", {
    headers: {
      Authorization: `Bearer ${global.token}`,
      "Content-Type": "application/json",
    },
  });

  expect(typeof res.data).toBe("object");
});

test("Create Item Test : ", async () => {
  const res = await axios.post(
    "http://localhost:4000/item/",
    {
      name: "req.body.name",
      description: "req.body.description",
      isInStock: true,
      price: 40,
    },
    {
      headers: {
        Authorization: `Bearer ${global.token}`,
        "Content-Type": "application/json",
      },
    }
  );

  global.token = res.data.token;
  expect(typeof res.data).toBe("object");
});

test("Edit Item Test : ", async () => {
  const res = await axios.patch(
    "http://localhost:4000/item/",
    {
      name: "req.body.name",
      description: "req.body.description",
      isInStock: true,
      price: 40,
    },
    {
      headers: {
        Authorization: `Bearer ${global.token}`,
        "Content-Type": "application/json",
      },
    }
  );

  global.token = res.data.token;
  expect(typeof res.data).toBe("object");
});

test("Get Items By ID Test : ", async () => {
  const res = await axios.get(
    "http://localhost:4000/item/653c82135a98fb7d93d02251",
    {
      headers: {
        Authorization: `Bearer ${global.token}`,
        "Content-Type": "application/json",
      },
    }
  );

  expect(typeof res.data).toBe("object");
});

test("Delete Item Test : ", async () => {
  const res = await axios.delete(
    "http://localhost:4000/item/653c87b988b86e63d684aaaa",
    {
      headers: {
        Authorization: `Bearer ${global.token}`,
        "Content-Type": "application/json",
      },
    }
  );

  expect(res.data).toBe("Item has been deleted sucessfully!");
});
