import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: {
      email: "rolca@rolca.com",
    },
    update: {},
    create: {
      email: "rolca@rolca.com",
      password:
        "$argon2id$v=19$m=65536,t=3,p=4$PjYhxr2+5QepkVuhYvv2xA$80pLh3cM3vwGuWEPih6i91Ki6Uey0234qoDynGnNe5Q",
      activated: true,
    },
  });
  // console.log(user);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
