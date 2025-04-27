import { db } from "../server/db";
import { skills } from "../shared/schema";
import { eq } from "drizzle-orm";

async function updateSkills() {
  console.log("🔄 Updating skills...");
  
  try {
    // Delete all existing skills
    await db.delete(skills);
    
    // Add new technical skills
    const technicalSkills = [
      {
        name: "Finite Element Analysis (FEA)",
        percentage: 85,
        type: "technical",
      },
      {
        name: "Additive Manufacturing (3D Printing)",
        percentage: 70,
        type: "technical",
      },
      {
        name: "Materials Characterization",
        percentage: 80,
        type: "technical",
      },
      {
        name: "Compression Molding Techniques",
        percentage: 85,
        type: "technical",
      },
      {
        name: "Propulsion System Design",
        percentage: 75,
        type: "technical",
      },
      {
        name: "Thermal Analysis (Heat Transfer)",
        percentage: 80,
        type: "technical",
      },
      {
        name: "Problem-Solving & Analytical Thinking",
        percentage: 90,
        type: "technical",
      },
      {
        name: "Structural Design & Analysis",
        percentage: 85,
        type: "technical",
      }
    ];
    
    // Add business skill
    const businessSkills = [
      {
        name: "Business Development",
        percentage: 80,
        type: "business",
      }
    ];
    
    // Insert all skills
    for (const skill of [...technicalSkills, ...businessSkills]) {
      await db.insert(skills).values(skill);
    }
    
    console.log("✅ Skills updated successfully!");
  } catch (error) {
    console.error("❌ Error updating skills:", error);
  } finally {
    process.exit(0);
  }
}

updateSkills();