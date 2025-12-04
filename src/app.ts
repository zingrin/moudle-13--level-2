import config from "./config";
import app from "./server";

const port = config.port;


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});