import React, { useEffect, useState } from 'react';
import { getProductById } from '../../API/HandleProductDetail';

const Comment = ({ productId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(()=>{
  getProductById(productId).then(data => {
  setComments(data);
}); 

  },[productId])
  
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const newEntry = {
      _id: Date.now(),
      user: 'You',
      text: newComment.trim(),
    };
    setComments([newEntry, ...comments]);
    setNewComment('');
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow space-y-4 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold" style={{ color: '#d58a94' }}>
        Comments
      </h2>

      {/* <div className="space-y-3">
        {comments.map((c) => (
          <div key={c._id} className="border-b pb-2">
            <p className="font-medium">{c.user}</p>
            <p className="text-gray-700">{c.text}</p>
          </div>
        ))}
      </div> */}

      <div className="flex gap-2 pt-4 border-t">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2"
        />
        <button
          onClick={handleAddComment}
          className="bg-[#d58a94] text-white px-4 py-2 rounded hover:bg-pink-600"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default Comment;
