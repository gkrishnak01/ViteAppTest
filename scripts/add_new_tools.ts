import { db } from "../server/db";
import { tools } from "../shared/schema";

async function addNewTools() {
  console.log("🔄 Adding new tools...");
  
  try {
    // Add MATLAB
    await db.insert(tools).values({
      name: "MATLAB",
      icon: "fas fa-calculator",
      tags: ["Data Analysis"],
    });
    
    // Add Python
    await db.insert(tools).values({
      name: "Python",
      icon: "fab fa-python",
      tags: ["Programming"],
    });
    
    // Add C/C++
    await db.insert(tools).values({
      name: "C/C++",
      icon: "fas fa-code",
      tags: ["Programming"],
    });
    
    console.log("✅ New tools added successfully!");
  } catch (error) {
    console.error("❌ Error adding new tools:", error);
  } finally {
    process.exit(0);
  }
}

addNewTools();