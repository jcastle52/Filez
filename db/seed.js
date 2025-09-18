import db from "#db/client";
import { createFolder } from "./queries/folders.js";
import { createFile } from "./queries/files.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // TODO
  for (let i = 0; i < 3; i++) {
    try {
      const name = `folder${i + 1}`;
      const response = await createFolder({ name });
    } catch (error) {
      console.error(error);
    }

    for (let j = 0; j < 5; j++) {
      try {
        const name = `file${i}${j + 1}`;
        const size = 5;
        const folder_id = i + 1;
        const response = await createFile({ name, size, folder_id });
      } catch (error) {
        console.error(error);
      }
    }
  }
}
