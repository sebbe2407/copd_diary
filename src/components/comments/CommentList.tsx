import React from 'react';
import { format, parseISO } from 'date-fns';
import { Comment } from '../../types/comment';
import { MessageSquare } from 'lucide-react';

interface Props {
  comments: Comment[];
  onDelete: (id: string) => void;
}

export function CommentList({ comments, onDelete }: Props) {
  if (comments.length === 0) {
    return (
      <div className="flex items-center justify-center py-8 text-gray-500">
        <MessageSquare className="w-5 h-5 mr-2" />
        <span>No comments yet</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map(comment => (
        <div key={comment.id} className="flex space-x-3 p-4 bg-gray-50 rounded-lg">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-500">
                {format(parseISO(comment.createdAt), 'MMM d, yyyy HH:mm')}
              </span>
              <button
                onClick={() => onDelete(comment.id)}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Delete
              </button>
            </div>
            <p className="text-gray-700">{comment.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}