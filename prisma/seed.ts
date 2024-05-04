import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: {
      email: "rolltest@gmail.com",
    },
    update: {},
    create: {
      email: "rolltest@gmail.com",
      password:
        "$argon2id$v=19$m=65536,t=3,p=4$wP3y7oRgtXMX2+a9ENZRng$900Fey+89DKNB0C0EyVn8wVB6MEziXs7v5G3nSBLUPU",
      activated: true,
    },
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
