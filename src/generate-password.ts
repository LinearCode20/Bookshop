// import { createUser, UserType } from "./lib/auth";
import bcrypt from "bcrypt";

export interface RegisterUserInput {
  email: string;
  password: string;
  mfa_enabled?: boolean;
  mfa_secret?: string | null;
}

/**
 * Register a new user with encrypted password
 * This function hashes the password using bcrypt before creating the user
 */
export async function registerUser(input: RegisterUserInput): Promise<any> {
  // Hash the password with bcrypt (salt rounds: 10)
  const hashedPassword = await bcrypt.hash(input.password, 10);
  console.log("hashedPassword", hashedPassword);

  // Call createUser with the hashed password
  //   return createUser({
  //     email: input.email,
  //     password: hashedPassword,
  //     mfa_enabled: input.mfa_enabled,
  //     mfa_secret: input.mfa_secret,
  //   });
}

// registerUser({
//   email: "admin@admin.com",
//   password: "MyBook-shop@010101",
// });

// INSERT INTO users (email, password, mfa_enabled, mfa_secret)
// VALUES (
//   'admin@admin.com',
//   '$2b$10$F6C03df53aYTk977GUobweYYgZ1iqMrsC/8sCZCNmUemH60sX91lG',
//   false,
//   null
// );