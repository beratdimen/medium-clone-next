"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function SaveComments(formData) {
  const formObj = Object.fromEntries(formData);
  const commentId = Number(formObj.commentItem);
  const content = formObj.content;
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user);

  if (!user) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("comments")
    .insert({ content, user_id: user.id, post_id: commentId })
    .select()
    .single();

  if (error) {
    console.log(error);
  }
  console.log(commentId);
}
