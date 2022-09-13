const imageRouter = require("./routers/image.jsx");
const userRouter = require("./routers/user.jsx");
const authRouter = require("./routers/auth.jsx");

const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const jsonParser = express.json();

app.use(jsonParser);

app.use("/images", imageRouter);
//app.use("/images/:image_id", imageRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => console.log("::", PORT));
