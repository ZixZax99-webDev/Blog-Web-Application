import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let numOfBlog = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true}));

app.get("/", (req, res) => {
    res.render("index.ejs", {
        numOfBlog
    });
});

app.get("/view", (req, res) => {
    res.render("view.ejs", {
        numOfBlog,
    });
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});


app.get("/create", (req, res) => {
    res.render("create.ejs");
});

app.post("/", (req, res) => {

    //get date blog posted
    let day = new Date().getDate();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = months[new Date().getMonth()];
    let year = new Date().getFullYear();

    //blog object
    let blog = {
        blogID: numOfBlog.length,
        postedDate: day + " " + month + " " + year,
        title: req.body["title"],
        post: req.body["post-content"]
    }
    
    //register blog data into array
    numOfBlog.push(blog);
    
    res.render("index.ejs", {
        numOfBlog
    });
});

app.post("/delete", (req, res) => {

    //delete blog 
    numOfBlog.splice(req.body["blogID"], 1);

    //rearrange the blogID
    for (let i = 0; i < numOfBlog.length; i++) {
        numOfBlog[i].blogID = i;
    }

    res.redirect("/");
});

//view blog
app.post("/view", (req, res) => {
    res.render("view.ejs", {
        numOfBlog,
        blogID : req.body["blogID"]
    });
});


app.listen(port, (req, res) => {
    console.log(`Server running on port ${port}.`);
});