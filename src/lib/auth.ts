
import { supabase } from "@/lib/supabase/server";
import bcrypt from "bcrypt";

export interface UserType {
  id: string; // uuid
  email: string; // text
  password: string | null; // VARCHAR(20)
  mfa_enabled: boolean; // boolean
  mfa_secret?: string | null; // text (optional / nullable)
  created_at: string; // timestamp with time zone
  updated_at: string; // timestamp with time zone
}

export interface CreateUserInput {
  email: string;
  password: string;
  mfa_enabled?: boolean;
  mfa_secret?: string | null;
}
export async function getUserByEmail(email: string): Promise<UserType> {
  const { error, data } = await supabase
    .from("users")
    .select(
      "id, email, password, mfa_enabled, mfa_secret, created_at, updated_at",
    )
    .eq("email", email)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      throw new Error(`User not found with email: ${email}`);
    }
    console.error("Supabase user fetch error:", error);
    throw new Error(`Failed to get user: ${error.message}`);
  }

  return data;
}

export async function getUserById(id: string): Promise<UserType> {
  const { error, data } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      throw new Error(`User not found with id: ${id}`);
    }
    console.error("Supabase user fetch error:", error);
    throw new Error(`Failed to get user: ${error.message}`);
  }

  return data;
}

export async function createUser(input: CreateUserInput): Promise<UserType> {
  const { error, data } = await supabase
    .from("users")
    .insert({
      email: input.email,
      password: input.password,
      mfa_enabled: input.mfa_enabled ?? false,
      mfa_secret: input.mfa_secret ?? null,
    })
    .select()
    .single();

  if (error) {
    console.error("Supabase user creation error:", error);
    throw new Error(`Failed to create user: ${error.message}`);
  }

  return data;
}

export async function updateUser(
  id: string,
  updates: Partial<Pick<UserType, "email" | "password" | "mfa_enabled" | "mfa_secret">>
): Promise<UserType> {
  const { error, data } = await supabase
    .from("users")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      throw new Error(`User not found with id: ${id}`);
    }
    console.error("Supabase user update error:", error);
    throw new Error(`Failed to update user: ${error.message}`);
  }

  return data;
}

/**
 * Verify a password against a hashed password
 * @param plainPassword - The plain text password to verify
 * @param hashedPassword - The hashed password stored in the database
 * @returns Promise<boolean> - True if password matches, false otherwise
 */
export async function verifyPassword(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

