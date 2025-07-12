
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, Send, Flag, MoreVertical, BookOpen, Users } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const DiscussionRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState('');

  const discussion = {
    id: 1,
    title: '클린 코드의 함수 작성 원칙에 대해',
    author: '개발자김씨',
    bookTitle: '클린 코드',
    content: '함수는 한 가지 일만 해야 한다는 원칙에 대해 토론해보고 싶습니다. 실제 프로젝트에서 이 원칙을 지키기가 쉽지 않은데, 여러분은 어떻게 적용하고 계신가요?',
    excerpt: '깨끗한 코드는 한 가지를 제대로 한다.',
    participants: 12,
    createdAt: '2시간 전',
    tags: ['함수', '코드품질']
  };

  const comments = [
    {
      id: 1,
      author: '코드마스터',
      content: '저는 함수를 작성할 때 항상 SRP(Single Responsibility Principle)를 염두에 둡니다. 함수명에서 "and"나 "or"가 들어간다면 분리를 고려해봅니다.',
      createdAt: '1시간 전',
      likes: 5
    },
    {
      id: 2,
      author: '신입개발자',
      content: '실제로는 비즈니스 로직이 복잡해서 하나의 함수에 여러 일을 하게 되는 경우가 많은데, 이럴 때는 어떻게 해야 할까요?',
      createdAt: '30분 전',
      likes: 2
    }
  ];

  const handleSendComment = () => {
    if (!newComment.trim()) return;
    
    console.log('댓글 전송:', newComment);
    setNewComment('');
    alert('댓글이 등록되었습니다!');
  };

  const handleReport = (type: 'discussion' | 'comment', targetId: number) => {
    console.log(`${type} 신고:`, targetId);
    alert('신고가 접수되었습니다.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b p-4 flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => navigate('/discussions')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="font-semibold text-lg truncate">{discussion.title}</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <BookOpen className="h-3 w-3" />
            {discussion.bookTitle}
            <span>•</span>
            <Users className="h-3 w-3" />
            {discussion.participants}명 참여
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleReport('discussion', discussion.id)}>
              <Flag className="h-4 w-4 mr-2" />
              신고하기
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="p-4 space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>{discussion.author[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{discussion.author}</p>
                  <p className="text-sm text-gray-500">{discussion.createdAt}</p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {discussion.excerpt && (
              <div className="bg-gray-50 p-3 rounded-lg border-l-4 border-[#A8D17B]">
                <p className="text-sm italic text-gray-700">"{discussion.excerpt}"</p>
              </div>
            )}
            <p className="text-gray-800">{discussion.content}</p>
            <div className="flex flex-wrap gap-1">
              {discussion.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <h3 className="font-medium text-gray-800">댓글 {comments.length}개</h3>
          {comments.map((comment) => (
            <Card key={comment.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs">{comment.author[0]}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-sm">{comment.author}</span>
                    <span className="text-xs text-gray-500">{comment.createdAt}</span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <MoreVertical className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleReport('comment', comment.id)}>
                        <Flag className="h-4 w-4 mr-2" />
                        신고하기
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p className="text-gray-800 text-sm">{comment.content}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
                    👍 {comment.likes}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t p-4">
        <div className="flex gap-2">
          <Textarea
            placeholder="댓글을 작성하세요..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 min-h-[40px] max-h-[120px] resize-none"
          />
          <Button 
            onClick={handleSendComment}
            className="bg-[#A8D17B] hover:bg-[#96C169] text-white px-3"
            disabled={!newComment.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DiscussionRoom;
