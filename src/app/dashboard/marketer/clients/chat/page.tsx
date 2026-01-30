
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface Message {
  sender: 'You' | 'Client';
  avatar: string;
  text: string;
  timestamp: string;
}

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'Client', avatar: 'QS', text: 'Hey Alex, do you have a minute to chat about the Q3 campaign?', timestamp: '10:30 AM' },
    { sender: 'You', avatar: 'AR', text: 'Of course! I was just reviewing the latest performance metrics. What\'s on your mind?', timestamp: '10:31 AM' },
    { sender: 'Client', avatar: 'QS', text: 'I was thinking about allocating some more budget to the video ads. They seem to be performing really well.', timestamp: '10:32 AM' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const newMessages: Message[] = [
      ...messages,
      {
        sender: 'You',
        avatar: 'AR',
        text: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];
    setMessages(newMessages);
    setNewMessage('');
  };

  return (
    <div className="w-full">
      <Button
          variant="outline"
          className="mb-4"
          onClick={() => router.back()}
      >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Clients
      </Button>
      <Card className="flex flex-col h-[calc(100vh-12rem)]">
        <CardHeader className="flex-row items-center border-b">
            <Avatar className="h-9 w-9">
                <AvatarFallback>QS</AvatarFallback>
            </Avatar>
            <div className="ml-4">
                <CardTitle>Quantum Solutions</CardTitle>
            </div>
        </CardHeader>
        <CardContent className="flex-1 p-0">
          <ScrollArea className="h-full p-6">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={cn("flex items-end gap-2", message.sender === 'You' ? 'justify-end' : '')}>
                  {message.sender === 'Client' && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{message.avatar}</AvatarFallback>
                    </Avatar>
                  )}
                  <div className={cn(
                    "rounded-lg p-3 max-w-xs md:max-w-md",
                    message.sender === 'You' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  )}>
                    <p className="text-sm">{message.text}</p>
                    <p className={cn("text-xs mt-1", message.sender === 'You' ? 'text-primary-foreground/70' : 'text-muted-foreground')}>{message.timestamp}</p>
                  </div>
                   {message.sender === 'You' && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{message.avatar}</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              autoComplete="off"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
