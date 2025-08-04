import React, { use, useEffect, useState } from "react";
import { addComment, getProductById } from "../../API/HandleProductDetail";

const Comment = ({ listeComments,productId }) => {
  const [comments, setComments] = useState(listeComments);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const newEntry = {
      _id: Date.now(),
      user: "You",
      text: newComment.trim(),
    };
    setComments([newEntry, ...comments]);
    setNewComment("");
  };
  const addNewComment = (e) => {
    if (e.key === 'Enter') {
      if(newComment.trim()) {
        addComment(productId, newComment)
        setNewComment('')
        setComments([...comments])
      }
    }
  };

  return (
    <div className="p-4 bg-white  space-y-4  ">
      <div className="space-y-3 w-full">
        {comments.map((c) => (
          <div key={c._id} className="border-b pb-2">
            <p className="font-semibold text-sm">{c.userId.name}</p>
            <p className="ml-4 mt-1 text-sm text-gray-700">{c.commentText}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 pt-4 border-t border-[#d58a94]">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          onKeyDown={addNewComment}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#d58a94]"
        />
      </div>
    </div>
  );
};

export default Comment;
