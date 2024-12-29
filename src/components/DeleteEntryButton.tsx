import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';

interface Props {
  onDelete: () => Promise<void>;
}

export function DeleteEntryButton({ onDelete }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDeleting) return;

    const confirmed = window.confirm('Are you sure you want to delete this entry?');
    if (!confirmed) return;

    setIsDeleting(true);
    try {
      await onDelete();
    } catch (error) {
      console.error('Failed to delete entry:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-1 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
      title="Delete entry"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}