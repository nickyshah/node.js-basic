import express from 'express'



const app = express()
const PORT = 8000

app.use(express.json())

let fakeDb = [];

app.get("/api/v1/task", (req, res)=>{
    res.json({
        status: "Success",
        message: "To-Do Soon",
        fakeDb,
    })
})

app.post("/api/v1/task", (req, res)=>{
    // console.log(req.body)
    fakeDb.push(req.body)
    res.json({
        status: "Success",
        message: "To-Do Soon post"
    })
})

app.patch("/api/v1/task", (req, res)=>{
    res.json({
        status: "Success",
        message: "To-Do Soon patch"
    })
})
app.delete("/api/v1/task", (req, res)=>{
    res.json({
        status: "Success",
        message: "To-Do Soon delete"
    })
})


app.listen(PORT, error => error ? console.log(error) : console.log("Your Server is running at http://localhost:" + PORT))