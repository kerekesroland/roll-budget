import AlreadyActivated from '@/components/AlreadyActivated';
import NotFound from '@/components/NotFound';
import RegisterForm from '@/components/RegisterForm';
import { prisma } from '@/lib/prisma';
import { ActivateToken } from '@prisma/client';

interface IActivateParams {
  params: {
    token: string;
  };
}

const ActivateAccount = async ({ params: { token } }: IActivateParams) => {
  const accountToken: ActivateToken | null =
    await prisma.activateToken.findUnique({
      where: {
        token: token,
      },
    });

  // If the token itself doesn't exist
  if (!accountToken) {
    return <NotFound />;
  }

  // If it is already registered to a user
  if (accountToken?.userId) {
    return <AlreadyActivated />;
  }
  return <RegisterForm accountToken={accountToken} />;
};

export default ActivateAccount;
