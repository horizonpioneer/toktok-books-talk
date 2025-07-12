
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Plus, Users, Clock, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Discussions = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  const discussions = [
    {
      id: 1,
      title: '클린 코드의 함수 작성 원칙에 대해',
      author: '개발자김씨',
      bookTitle: '클린 코드',
      participants: 12,
      comments: 23,
      createdAt: '2시간 전',
      tags: ['함수', '코드품질'],
      isHot: true
    },
    {
      id: 2,
      title: '리팩토링 기법 중 가장 효과적인 방법은?',
      author: '코드마스터',
      bookTitle: '리팩토링',
      participants: 8,
      comments: 15,
      createdAt: '5시간 전',
      tags: ['리팩토링', '설계'],
      isHot: false
    }
  ];

  const myRecords = [
    { id: 1, bookTitle: '클린 코드', content: '함수는 한 가지 일만 해야 한다...' },
    { id: 2, bookTitle: '리팩토링', content: '작은 단위로 자주 리팩토링하는 것이...' }
  ];

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-[#A8D17B]" />
          <h1 className="text-xl font-bold">토론</h1>
        </div>
        <Button 
          className="bg-[#A8D17B] hover:bg-[#96C169] text-white"
          onClick={() => navigate('/discussion/new')}
        >
          <Plus className="h-4 w-4 mr-1" />
          토론 시작
        </Button>
      </div>

      <div className="flex gap-2 mb-4">
        <Button
          variant={activeTab === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveTab('all')}
          className={activeTab === 'all' ? 'bg-[#A8D17B] hover:bg-[#96C169]' : ''}
        >
          전체
        </Button>
        <Button
          variant={activeTab === 'hot' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveTab('hot')}
          className={activeTab === 'hot' ? 'bg-[#A8D17B] hover:bg-[#96C169]' : ''}
        >
          인기
        </Button>
        <Button
          variant={activeTab === 'my' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveTab('my')}
          className={activeTab === 'my' ? 'bg-[#A8D17B] hover:bg-[#96C169]' : ''}
        >
          내 참여
        </Button>
      </div>

      <div className="space-y-4">
        {discussions.map((discussion) => (
          <Card 
            key={discussion.id} 
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate(`/discussion/${discussion.id}`)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  {discussion.isHot && (
                    <Badge className="bg-red-500 text-white text-xs">HOT</Badge>
                  )}
                  {discussion.title}
                </CardTitle>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <BookOpen className="h-3 w-3" />
                {discussion.bookTitle}
                <span>•</span>
                <span>{discussion.author}</span>
                <span>•</span>
                <Clock className="h-3 w-3" />
                {discussion.createdAt}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {discussion.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {discussion.participants}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" />
                    {discussion.comments}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {discussions.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">진행 중인 토론이 없습니다.</p>
          <Button className="bg-[#A8D17B] hover:bg-[#96C169] text-white">
            첫 번째 토론 시작하기
          </Button>
        </div>
      )}
    </div>
  );
};

export default Discussions;
