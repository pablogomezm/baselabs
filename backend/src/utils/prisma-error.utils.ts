import { Prisma } from 'prisma-client';

export const PrismaErrorCode = {
  UNIQUE_CONSTRAINT_VIOLATION: 'P2002',
};

export function isPrismaUniqueConstraintError(error: unknown): boolean {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === PrismaErrorCode.UNIQUE_CONSTRAINT_VIOLATION
  );
}
