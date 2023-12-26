import mongoose from "mongoose";

import app from "./app";
import confiq from "./confiq";

async function main() {
  try {
    await mongoose.connect(confiq.database_url as string);

    app.listen(confiq.port, () => {
      console.log(` app is listening on port ${confiq.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
