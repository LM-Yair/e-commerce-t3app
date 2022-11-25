import {QueryParams} from "Types";

export type UserIdAlreadyExists = QueryParams & { id: string; }

export const userIdAlreadyExistsService = async ({
  ctx, 
  id,
}: UserIdAlreadyExists): Promise<boolean> => {
  const existUserId = await ctx.prisma.user.findUnique({ where: { id } });
  return existUserId ? true : false;
}
