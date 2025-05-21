
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ChatMessageProps {
  message: {
    id: number;
    sender: string;
    avatar: string;
    message: string;
    time: string;
    isAdmin?: boolean;
    isSelf?: boolean;
  };
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  if (message.isSelf) {
    return (
      <div className="flex flex-row-reverse items-end">
        <Avatar className="h-6 w-6 ml-2 mb-1">
          <AvatarImage src={message.avatar} />
          <AvatarFallback>You</AvatarFallback>
        </Avatar>
        <div className="max-w-[80%]">
          <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-none p-3">
            <p>{message.message}</p>
          </div>
          <p className="text-xs text-muted-foreground mt-1 text-right mr-2">{message.time}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-end">
      <Avatar className="h-6 w-6 mr-2 mb-1">
        <AvatarImage src={message.avatar} />
        <AvatarFallback>
          {message.sender.split(" ").map(n => n[0]).join("")}
        </AvatarFallback>
      </Avatar>
      <div className="max-w-[80%]">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-xs font-medium">{message.sender}</p>
          {message.isAdmin && <Badge variant="outline" className="text-xs py-0 h-4">Admin</Badge>}
        </div>
        <div className={`${message.isAdmin ? "bg-accent/10 border border-accent/30" : "bg-muted"} rounded-2xl rounded-tl-none p-3`}>
          <p>{message.message}</p>
        </div>
        <p className="text-xs text-muted-foreground mt-1 ml-2">{message.time}</p>
      </div>
    </div>
  );
};
