export const USER_ROLE = {
  user: "user",
  admin: "admin",
  serviceUser: "serviceUser",
  staff: "staff",
  director: "director",
  company: "company",
} as const;

export const UserStatus = ["block", "active"];

export const UserSearchableFields = ["email", "name", "role"];
