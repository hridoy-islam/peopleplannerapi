export const USER_ROLE = {
  user: "user",
  admin: "admin",
  serviceUser: "serviceUser",
  staff: "staff",
  director: "director",
} as const;

export const UserStatus = ["block", "active"];

export const UserSearchableFields = ["email", "name", "role"];
