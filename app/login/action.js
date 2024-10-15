"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

const defaultUserMetadata = {
  firstName: "",
  lastName: "",
};

export async function login(formData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.log(error);
    return;
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const {
    data: { user, error },
  } = await supabase.auth.signUp({
    email: formData.get("email"),
    password: formData.get("password"),
    options: {
      data: {
        ...defaultUserMetadata,
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
      },
    },
  });

  if (error) {
    console.log(error);
    return;
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signout() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect("/");
}
