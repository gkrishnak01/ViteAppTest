import { db } from "../server/db";
import { skills } from "../shared/schema";

async function addBusinessSkills() {
  console.log("🔄 Adding business skills...");
  
  try {
    // Add additional business skills
    const businessSkills = [
      {
        name: "Market Research",
        percentage: 80,
        type: "business",
      },
      {
        name: "Investor Pitching",
        percentage: 85,
        type: "business",
      },
      {
        name: "Supply Chain Management",
        percentage: 75,
        type: "business",
      },
      {
        name: "ESG Compliance",
        percentage: 85,
        type: "business",
      }
    ];
    
    // Insert all skills
    for (const skill of businessSkills) {
      await db.insert(skills).values(skill);
    }
    
    console.log("✅ Business skills added successfully!");
  } catch (error) {
    console.error("❌ Error adding business skills:", error);
  } finally {
    process.exit(0);
  }
}

addBusinessSkills();