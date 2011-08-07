var ex = require("express");

var app = ex.createServer();

app.use(ex.static(__dirname + "/../public"));
app.listen(process.env.PORT || 8003);

