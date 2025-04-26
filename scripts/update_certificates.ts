import { db } from "../server/db";
import { certifications } from "../shared/schema";
import { eq } from "drizzle-orm";

async function updateCertifications() {
  console.log("🔄 Updating certifications...");

  // Delete existing certifications
  await db.delete(certifications);

  // Insert updated certifications
  const certificationsData = [
    {
      name: 'GE Aerospace',
      description: 'Explore Engineering Job Simulation',
      details: 'Specialized training in aerospace engineering workflows, energy source design, and performance implications. Completed April 2025.',
      icon: 'fas fa-certificate',
      color: 'primary',
      certificate_path: '/assets/ge-aerospace-certificate.pdf'
    },
    {
      name: 'ISRO',
      description: 'Overview of Web GIS Technology',
      details: 'Comprehensive training on Web GIS technologies by Indian Institute of Remote Sensing (IIRS), ISRO. Completed July 2021.',
      icon: 'fas fa-globe',
      color: 'secondary',
      certificate_path: '/assets/webgis-certificate.pdf'
    },
    {
      name: 'Energy Swaraj Foundation',
      description: 'Energy Literacy Training',
      details: 'Comprehensive understanding of energy systems, sustainability principles, and alternative energy solutions. Completed March 2023.',
      icon: 'fas fa-bolt',
      color: 'accent',
      certificate_path: '/assets/energy-swaraj-certificate.pdf'
    },
    {
      name: 'SARC & AeroVania',
      description: 'Technical Publication & AI/Data Science in Aerospace',
      details: 'Webinar participation on technical publication and use of AI & Data Science in aerospace. Credential ID: SARCA00402078. Completed August 2021.',
      icon: 'fas fa-rocket',
      color: 'primary',
      certificate_path: '/assets/aerovania-certificate.jpg'
    }
  ];

  await db.insert(certifications).values(certificationsData);

  console.log("✅ Certifications updated successfully!");
}

// Execute the update function
updateCertifications()
  .catch(e => {
    console.error("Error updating certifications:", e);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });