import React, { useState } from 'react';

interface Props {
  onSubmit: (text: string) => void;
}

export function CommentForm({ onSubmit }: Props) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    onSubmit(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment..."
        className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
        rows={3}
      />
      <div className="mt-2 flex justify-end">
        <button
          type="submit"
          disabled={!text.trim()}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add Comment
        </button>
      </div>
    </form>
  );
}