import { db } from "../server/db";
import { certifications } from "../shared/schema";
import { eq } from "drizzle-orm";

async function updateCertifications() {
  console.log("🔄 Updating certifications with file paths...");

  // Update GE Aerospace certificate
  await db.update(certifications)
    .set({
      certificate_path: "/attached_assets/GE aerospace explore engineering job simulaion certificate.pdf",
      details: "Explore Engineering Job Simulation - April 2025"
    })
    .where(eq(certifications.name, "GE Aerospace"));

  // Update Energy Literacy Training certificate
  await db.update(certifications)
    .set({
      certificate_path: "/attached_assets/ARJITH A V-Energy swaraj foundation.pdf",
      details: "Energy Swaraj Foundation - Sustainable Energy Solutions"
    })
    .where(eq(certifications.name, "Energy Literacy Training"));

  // Update Web GIS Certificate
  await db.update(certifications)
    .set({
      certificate_path: "/attached_assets/WEB GIS CERTIFICATE BY ISRO.pdf",
      details: "ISRO Web GIS Technology Certificate"
    })
    .where(eq(certifications.name, "Web GIS Technology"));

  // Add Aerovania Certificate
  const aerovaniaExists = await db.select()
    .from(certifications)
    .where(eq(certifications.name, "Aerovania"))
    .then(res => res.length > 0);

  if (!aerovaniaExists) {
    await db.insert(certifications).values({
      name: "Aerovania",
      description: "Aeromodelling Workshop",
      details: "Technical training in aeromodelling and UAV design principles",
      icon: "fas fa-plane",
      color: "primary",
      certificate_path: "/attached_assets/Aerovania cerificate Arjith A V.jpg"
    });
  }

  // Add Technical Publication & AI/Data Science Certificate
  const aiCertExists = await db.select()
    .from(certifications)
    .where(eq(certifications.name, "Technical Publication & AI/Data Science"))
    .then(res => res.length > 0);

  if (!aiCertExists) {
    await db.insert(certifications).values({
      name: "Technical Publication & AI/Data Science",
      description: "Webinar Participant – AI in Aerospace",
      details: "Advanced training in applying AI and data science to aerospace engineering problems",
      icon: "fas fa-brain",
      color: "secondary",
      certificate_path: null // Add path if available
    });
  }

  // Add SARC Certificate
  const sarcExists = await db.select()
    .from(certifications)
    .where(eq(certifications.name, "SARC"))
    .then(res => res.length > 0);

  if (!sarcExists) {
    await db.insert(certifications).values({
      name: "SARC",
      description: "Space Advancement And Research Cell",
      details: "Research and development in advanced space technologies and applications",
      icon: "fas fa-satellite",
      color: "accent",
      certificate_path: null // Add path if available
    });
  }

  console.log("✅ Certificates updated successfully!");
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