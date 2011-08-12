var ex = require("express");
var sio = require("socket.io");

var app = ex.createServer();
var io = sio.listen(app);

/*
var cradleConnect = function(args) {
  return new cradle.Connection(
    process.env.CLOUDANT_URL || "localhost").database("db");
};


var db = cradleConnect({
  // couchdb host adress the env variable or localhost(dev) 
  host: process.env.CLOUDANT_URL || "localhost",
  db: "db"
});

var db = 
db.exists(function(err, ex) {
  if(!ex) {
    db.create();
  }

  db.save('_design/scope', {
    tips: {
      map: function (doc) {
        if (doc.type == "tip") {
          emit(null, doc);
        }
      }
    }
  });
});

*/

var reportToCont = function(cont) {
  return function(err) {
    if(err) {
      cont({ error: err, success: false });
    } else {
      cont({ success: true });
    }
  };
};

/*
io.sockets.on("connection", function(socket) {
  socket.on("create-tip", function(data, res) {
    db.save(data.href, { type: "tip", href: data.href }, reportToCont(res));
  });
});

*/

/*

app.get("/tips", function(req, res) {
  db.view("scope/tips", function(err, data) {
    res.send(data);
  });
});
*/

app.use(ex.static(__dirname + "/../public"));
app.listen(process.env.PORT || 8003);

