// this file serves the backend
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json"); // <== Will be created later
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3200; // <== You can change the port

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post("/cards", (req, res) => {
  const db = router.db; // Access the database object
  // Handle the POST request here
  const customResponse = { id: db.get("nextId").value().id, ...req.body };
  db.update("nextId", (n) => {
    return { id: n.id + 1 };
  }).write();
  // Manually append the data to db.json
  db.get("cards").push(customResponse).write();
res.redirect(`http://localhost:3200/cards.html?id=${db.get("nextId").value().id - 1}`)
});

server.get("/echo", (req, res) => {
  return res.send("<h1>hey</h1>");
});

server.use(router);
server.listen(port);

console.log("server running on port", port);
