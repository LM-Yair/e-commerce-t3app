import { Params } from "interfaces/query/query";
import { userProfileService } from "server/services/user/profile";

type UserProfileController = Params & {
  input: {
    id: string;
  };
};

export const userProfileController = async ({
  ctx,
  input,
}: UserProfileController) => {
  try {
    const user = await userProfileService({ ctx, input });
    return {
      error: false,
      user,
    };
  } catch (e) {
    return {
      error: true,
      data: e,
    };
  }
};
