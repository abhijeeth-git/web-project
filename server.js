const express = require("express");
const app = express();
const port = process.env.PORT || 8081;
app.use(express.static("frontend")); //webserver-->express
app.use(express.json());
//api server
const users = [
  {
    id: 1,
    name: "Alik Kuaks",
    gender: "Female",
    image: "https://randomuser.me/api/portraits/women/67.jpg",
  },
  {
    id: 2,
    name: "Samay Raina",
    gender: "Male",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
  },
  {
    id: 3,
    name: "Set Wussy",
    gender: "Female",
    image: "https://randomuser.me/api/portraits/women/69.jpg",
  },
  {
    id: 4,
    name: "Kirky Charlie",
    gender: "Male",
    image: "https://randomuser.me/api/portraits/men/68.jpg",
  },
  {
    id: 5,
    name: "Scarlett Johannson",
    gender: "Female",
    image: "https://randomuser.me/api/portraits/women/69.jpg",
  },
];
// send/call/get all users
app.get("/api/users", function (req, res) {
  res.status(200).json(users);
});

function getUserById(uid) {
  for (var i = 0; i < users.length; i++) {
    if (uid == users[i].id) return i;
  }
  return -1;
}

//get user by id
app.get("/api/users/:id", function (req, res) {
  var uid = req.params.id;
  var userid = getUserById(uid);
  if (userid == -1) {
    res.status(404).json({ message: "user not found" });
  }
  res.status(200).json(users[userid]);
});
//get random user
app.get("/api/randomuser", function (req, res) {
  var n = users.length;
  const randomid = Math.floor(Math.random() * n);
  res.status(200).json(users[randomid]);
});

var newuserID = users.length + 1;
//post: add a new user
app.post("/api/users", function (req, res) {
  let user = req.body;
  if (!req.body.image || !req.body.name || !req.body.gender) {
    return res.json({ message: "All the details are required" });
  }
  // console.log(user)
  user.id = newuserID;
  newuserID++;
  users.push(users);
  res.status(200).json({ message: "Added Successfully" });
});
//put:change one single parameter
app.put("/api/users/:id", function (req, res) {
  var userid = getUserById(req.params.id);

  if (userid == -1) {
    return res.json({ message: "user not found" });
  }
  if (req.body.name) users[userid].name = req.body.name;
  if (req.body.gender) users[userid].gender = req.body.gender;
  if (req.body.image) users[userid].gender = req.body.image;
  return res.status(200).json({
    message: "user details updates successfully",
    user: users[userid],
  });
});

app.delete("/api/users/:id", function (req, res) {
  var userid = getUserById(req.params.id);
  if (userid == -1) return res.json({ message: "user not found" });
  users.splice(userid, 1);
  res.status(200).json({ message: "user deleted successfully" });
});

app.listen(port, function () {
  console.log("my app is running at http://localhost:" + port);
});
