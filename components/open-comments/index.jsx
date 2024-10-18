"use client";

import { CloseIcon, CommentsIcon } from "@/helpers/icons";
import CommentsList from "../main-comments-list";
import NewComments from "../main-comments/page";
import { useState } from "react";
import "./openComments.css";

export default function OpenComments({ commentCount, params }) {
  console.log(params.id);
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(!open)} className="commentsBtn">
        <CommentsIcon /> {commentCount}
      </button>

      <div
        className="commentsRightSideBar"
        style={{ width: open ? "23%" : "0%", padding: open ? " 20px" : "0" }}
      >
        <div className="sideBarHeader">
          <h3>Toplam Yorum ({commentCount})</h3>
          <button onClick={() => setOpen(false)} className="commentsBtn">
            <CloseIcon />
          </button>
        </div>

        <div className="commentsGeneral">
          <NewComments postId={params.id} />
          <CommentsList commentId={params.id} />
        </div>
      </div>
    </div>
  );
}
