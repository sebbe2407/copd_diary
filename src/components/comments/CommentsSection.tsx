import React, { useState } from 'react';
import { Comment } from '../../types/comment';
import { CommentList } from './CommentList';
import { CommentForm } from './CommentForm';
import { MessageSquare } from 'lucide-react';

interface Props {
  healthDataId: string;
  date: string;
}

export function CommentsSection({ healthDataId, date }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAddComment = (text: string) => {
    const newComment: Comment = {
      id: crypto.randomUUID(),
      date,
      text,
      healthDataId,
      createdAt: new Date().toISOString(),
    };
    setComments(prev => [...prev, newComment]);
  };

  const handleDeleteComment = (id: string) => {
    setComments(prev => prev.filter(comment => comment.id !== id));
  };

  return (
    <div className="mt-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <MessageSquare className="w-5 h-5" />
        <span>Comments ({comments.length})</span>
      </button>
      
      {isExpanded && (
        <div className="mt-4">
          <CommentList comments={comments} onDelete={handleDeleteComment} />
          <CommentForm onSubmit={handleAddComment} />
        </div>
      )}
    </div>
  );
}