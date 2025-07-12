
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { BookOpen, Save } from 'lucide-react';

const RecordWrite = () => {
  const [selectedBook, setSelectedBook] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [record, setRecord] = useState('');

  const handleSave = () => {
    if (!selectedBook || !record) {
      alert('도서를 선택하고 기록을 작성해주세요.');
      return;
    }
    
    console.log('기록 저장:', { selectedBook, excerpt, record });
    alert('기록이 저장되었습니다!');
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="h-6 w-6 text-[#A8D17B]" />
        <h1 className="text-xl font-bold">기록 작성</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            새로운 기록
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="book-select">도서 선택</Label>
            <Select value={selectedBook} onValueChange={setSelectedBook}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="서재에서 도서를 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sample-book-1">클린 코드</SelectItem>
                <SelectItem value="sample-book-2">리팩토링</SelectItem>
                <SelectItem value="sample-book-3">자바스크립트 완벽 가이드</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="excerpt">책 내용 발췌</Label>
            <Textarea
              id="excerpt"
              placeholder="인상 깊었던 구절이나 내용을 발췌해주세요..."
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="mt-1 min-h-[100px]"
            />
          </div>

          <div>
            <Label htmlFor="record">나의 기록</Label>
            <Textarea
              id="record"
              placeholder="책을 읽고 느낀 점, 생각, 배운 것들을 기록해주세요..."
              value={record}
              onChange={(e) => setRecord(e.target.value)}
              className="mt-1 min-h-[150px]"
              required
            />
          </div>

          <Button 
            onClick={handleSave}
            className="w-full bg-[#A8D17B] hover:bg-[#96C169] text-white"
          >
            <Save className="h-4 w-4 mr-2" />
            기록 저장
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecordWrite;
