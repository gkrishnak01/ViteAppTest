import { db } from "../server/db";
import { certifications } from "../shared/schema";
import { eq } from "drizzle-orm";

async function updateCertifications() {
  console.log("🔄 Updating certifications with new URLs...");

  // Update GE Aerospace certificate
  await db.update(certifications)
    .set({
      certificate_path: "https://drive.google.com/file/d/1puzg7oJcfaghEEE5kTCKJ3LK0fKli_Cf/view?usp=drive_link",
      details: "Explore Engineering Job Simulation - April 2025"
    })
    .where(eq(certifications.name, "GE Aerospace"));

  // Update Energy Literacy Training certificate
  await db.update(certifications)
    .set({
      certificate_path: "https://drive.google.com/file/d/1sDMwElWBKhvd3K_VGRoIf1bL_CypNg7Z/view?usp=drive_link",
      details: "Energy Swaraj Foundation - Sustainable Energy Solutions"
    })
    .where(eq(certifications.name, "Energy Literacy Training"));

  // Update Web GIS Certificate
  await db.update(certifications)
    .set({
      certificate_path: "https://drive.google.com/file/d/1kqrUrpPxNliKC6tZAZF-BtrCKtnM4Dd1/view?usp=drive_link",
      details: "ISRO Web GIS Technology Certificate"
    })
    .where(eq(certifications.name, "Web GIS Technology"));

  // Update Aerovania Certificate
  await db.update(certifications)
    .set({
      certificate_path: "https://drive.google.com/file/d/1gIHYGFv5iU2hAUaxqgTM9z9sg2aFWrmz/view?usp=drive_link",
      description: "Aeromodelling Workshop",
      details: "Technical training in aeromodelling and UAV design principles"
    })
    .where(eq(certifications.name, "Aerovania"));

  console.log("✅ Certificate links updated successfully!");
}

// Execute the update function
updateCertifications()
  .catch(e => {
    console.error("Error updating certificates:", e);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });