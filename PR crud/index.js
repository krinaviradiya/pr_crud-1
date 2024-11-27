const express = require("express");
const port = 8000;
const app = express();

app.set("view engine","ejs");
app.use(express.urlencoded());

let works = [
    {id:1,awaiting:"project",progress:"exam preparation",completed :"home work"},
    {id:2,awaiting:"project",progress:"exam preparation",completed :"home work"},
];

app.get("/",(req,res)=>{
    res.render("index",{works});
});

app.post("/addData",(req,res)=>{
    req.body.id=works.length+1;
    works.push(req.body);
    res.redirect("/");
});
app.get("/deleteData",(req,res)=>{
    let deleteRecord = works.filter((item) => item.id != req.query.id);
    works=deleteRecord;
    res.redirect("/");
});
app.get("/editData/:id",(req,res)=>{
    let singleData = works.find((item)=>item.id == req.params.id);
    res.render("edit",{singleData});
});
app.post("/updateData",(req,res)=>{
    works.forEach((work)=>{
        if(work.id == req.body.id){
            (work.id=req.body.id),
            (work.awaiting=req.body.awaiting),
            (work.progress=req.body.progress);
            (work.completed=req.body.completed);
        }else{
            work;
        }
    });
    res.redirect("/");
});


app.listen(port,(err)=>{
    err ? console.log(err): console.log(`server started on port ${port}`);

})