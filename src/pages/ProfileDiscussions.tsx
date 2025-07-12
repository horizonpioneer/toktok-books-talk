
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Users, Clock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfileDiscussions = () => {
  const navigate = useNavigate();
  
  const discussions = [
    {
      id: 1,
      title: '클린 코드의 함수 작성 원칙에 대한 토론',
      description: '함수는 한 가지 일만 해야 한다는 원칙에 대해 실무에서 어떻게 적용하고 계신가요?',
      participants: 8,
      messages: 15,
      lastActivity: '2시간 전',
      tags: ['클린코드', '함수설계']
    },
    {
      id: 2,
      title: '리팩토링 시점과 방법',
      description: '언제 리팩토링을 시작해야 하는지, 어떤 방법으로 접근하는 것이 좋을까요?',
      participants: 12,
      messages: 23,
      lastActivity: '1일 전',
      tags: ['리팩토링', '코드품질']
    },
    {
      id: 3,
      title: '자바스크립트 비동기 처리 패턴',
      description: 'Promise, async/await, 콜백 패턴 중 어떤 것을 선호하시나요?',
      participants: 6,
      messages: 9,
      lastActivity: '2일 전',
      tags: ['자바스크립트', '비동기']
    }
  ];

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/profile')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-lg font-bold">참여 토론</h1>
      </div>

      <div className="space-y-4">
        {discussions.map((discussion) => (
          <Card 
            key={discussion.id} 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate(`/discussion/${discussion.id}`)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{discussion.title}</CardTitle>
              <p className="text-gray-600 text-sm line-clamp-2">
                {discussion.description}
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>{discussion.participants}명 참여</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" />
                    <span>{discussion.messages}개 댓글</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{discussion.lastActivity}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {discussion.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {discussions.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">아직 참여한 토론이 없습니다.</p>
          <Button 
            className="bg-[#A8D17B] hover:bg-[#96C169] text-white"
            onClick={() => navigate('/discussions')}
          >
            토론 참여하기
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfileDiscussions;
