const express = require("express");
const path = require("path");

//express 앱 객체
const app = express();

//static으로 들어오는 경우 
//ex) /static/home/
//ex2) /static/go/
//이경우에는 무조건 frontend/static/하위에서 처리되도록 한다
app.use("/static", express.static(path.resolve(__dirname, "frontend","static")));
//get 요청이 어떤 경로로 들어오더라도 index.html을 돌려준다.
app.get("/*",(req, res)=>{
	res.sendFile(path.resolve("frontend", "index.html"));
});

app.listen(process.env.PORT || 8080, ()=> console.log("Server running"));