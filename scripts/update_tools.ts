import { db } from "../server/db";
import { tools } from "../shared/schema";
import { eq } from "drizzle-orm";

async function updateTools() {
  console.log("🔄 Updating tools...");

  // Delete Data Analysis tool if it exists
  await db.delete(tools)
    .where(eq(tools.name, "Data Analysis"));

  console.log("✅ Tools updated successfully!");
}

// Execute the update function
updateTools()
  .catch(e => {
    console.error("Error updating tools:", e);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });