
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, BookOpen, Calendar, MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const MyRecords = () => {
  const records = [
    {
      id: 1,
      bookTitle: '클린 코드',
      excerpt: '깨끗한 코드는 한 가지를 제대로 한다.',
      content: '이 책에서 가장 인상깊었던 부분은 함수는 한 가지 일만 해야 한다는 원칙이었다...',
      date: '2024-01-15',
      tags: ['개발', '코드품질']
    },
    {
      id: 2,
      bookTitle: '리팩토링',
      excerpt: '리팩토링은 소프트웨어의 겉보기 동작은 그대로 유지한 채...',
      content: '리팩토링의 중요성을 다시 한번 깨달았다. 특히 작은 단위로 자주하는 것이...',
      date: '2024-01-10',
      tags: ['리팩토링', '설계']
    }
  ];

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-[#A8D17B]" />
          <h1 className="text-xl font-bold">나의 기록</h1>
        </div>
        <span className="text-sm text-gray-500">{records.length}개의 기록</span>
      </div>

      <div className="space-y-4">
        {records.map((record) => (
          <Card key={record.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-[#A8D17B]" />
                  <CardTitle className="text-lg">{record.bookTitle}</CardTitle>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>수정</DropdownMenuItem>
                    <DropdownMenuItem>토론방 만들기</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">삭제</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="h-3 w-3" />
                {record.date}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {record.excerpt && (
                <div className="bg-gray-50 p-3 rounded-lg border-l-4 border-[#A8D17B]">
                  <p className="text-sm italic text-gray-700">"{record.excerpt}"</p>
                </div>
              )}
              <p className="text-gray-800 line-clamp-3">{record.content}</p>
              <div className="flex flex-wrap gap-1">
                {record.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {records.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">아직 작성한 기록이 없습니다.</p>
          <Button className="bg-[#A8D17B] hover:bg-[#96C169] text-white">
            첫 번째 기록 작성하기
          </Button>
        </div>
      )}
    </div>
  );
};

export default MyRecords;
