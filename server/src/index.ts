import { app } from "./app";
import { dbconfig } from "./config/db";
import { EnvVariables } from "./config/env";

dbconfig(EnvVariables.MONGO_URI)
  .then(() => {
    app.listen(EnvVariables.PORT, () => {
      console.log("Listening to PORT: " + EnvVariables.PORT);
    });
  })
  .catch(() => {
    console.log("Can't start server error occurred");
  });
