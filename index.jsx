const imageRouter = require("./routers/image.jsx");
const userRouter = require("./routers/user.jsx");
const authRouter = require("./routers/auth.jsx");
const authMiddleware = require("./auth/middleware.jsx");

const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const jsonParser = express.json();

app.use(jsonParser);

app.use("/images", authMiddleware, imageRouter);
//app.use("/images/:image_id", imageRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => console.log("::", PORT));
