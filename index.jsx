const imageRouter = require("./routers/image.jsx");
const userRouter = require("./routers/user.jsx");

const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const jsonParser = express.json();
app.use(jsonParser);

app.use("/images", imageRouter);
app.use("/users", userRouter);

app.listen(PORT, () => console.log("::", PORT));
