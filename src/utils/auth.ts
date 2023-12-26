import { AuthChecker } from "type-graphql";
import { MyContext } from "./context";

export const authChecker: AuthChecker<MyContext> = async (
  { context: { user } },
  roles
) => {
  if (!user) {
    throw new Error("Please login to continue.");
  }
  if (roles.length === 0) return true;
  if (roles.length > 0 && roles.includes(user.role)) return true;

  return false;
};