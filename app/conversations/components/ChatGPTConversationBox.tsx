// ChatGPTConversationBox.tsx

import React, { useMemo } from 'react';
import clsx from 'clsx';
import Avatar from '@/app/components/Avatar';

interface ChatGPTConversationBoxProps {
  onClick: () => void;
  selected: boolean;
}

const ChatGPTConversationBox: React.FC<ChatGPTConversationBoxProps> = ({ onClick, selected }) => {
  // Giả sử bạn muốn hiển thị nội dung tương tự như ConversationBox
  const lastMessageText = useMemo(() => {
    return "Started a conversation with ChatGPT";
  }, []);

  return (
    <div
      onClick={onClick}
      className={clsx(`
        w-full
        relative
        flex
        items-center
        space-x-3
        hover:bg-neutral-100
        rounded-lg
        transition
        cursor-pointer
        p-3
      `,
        selected ? 'bg-neutral-100' : 'bg-white'
      )}
    >
      <Avatar />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-md font-medium text-gray-900">ChatGPT</p>
            {/* Đặt thời gian ở đây nếu có */}
          </div>
          <p className={clsx(`
              truncate
              text-sm
            `,
              selected ? 'text-gray-500' : 'text-black font-medium'
            )}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChatGPTConversationBox;
