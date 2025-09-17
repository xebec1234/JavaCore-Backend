import prisma from "./prisma";
import fs from "fs";
import path from "path";

async function main() {
    const filePath = path.join(__dirname, "data.json");
  const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  for (const areaData of jsonData.areas) {
    const area = await prisma.area.create({
      data: {
        name: areaData.name,
        equipmentGroups: {
          create: areaData.equipmentGroups.map((group: any) => ({
            name: group.name,
            equipmentNames: {
              create: group.equipmentNames.map((equipment: any) => ({
                name: equipment.name,
                components: {
                  create: equipment.components.map((component: any) => ({
                    name: component.name,
                  })),
                },
              })),
            },
          })),
        },
      },
    });
    console.log(`✅ Created Area: ${area.name}`);
  }
}

main()
  .catch((error) => {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
