import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

const ADMIN_EMAIL = 'admin@admin.com';

export const findOrCreateUser = async (profile: any) => {
  const id = `${profile.provider}-${profile.id}`;
  let user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    const role = (profile.emails?.[0]?.value === ADMIN_EMAIL) ? Role.ADMIN : Role.USER;
    user = await prisma.user.create({
      data: {
        id,
        provider: profile.provider,
        name: profile.displayName,
        email: profile.emails?.[0]?.value || '',
        role,
      },
    });
  }

  return user;
};

export const getAllUsers = () => prisma.user.findMany();
