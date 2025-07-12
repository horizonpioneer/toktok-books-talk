
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Send, BookOpen, X } from 'lucide-react';

const DiscussionCreate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  useEffect(() => {
    // 기록에서 토론방 만들기를 통해 온 경우 해당 기록 정보를 미리 채움
    if (location.state?.record) {
      const record = location.state.record;
      setSelectedRecord(record);
      setTitle(`${record.bookTitle}에 대한 토론`);
      setContent(`"${record.excerpt}"\n\n${record.content}\n\n이 내용에 대해 여러분의 의견을 듣고 싶습니다.`);
      if (record.tags) {
        setTags(record.tags);
      }
    }
  }, [location.state]);

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    console.log('토론방 생성:', { title, content, tags, selectedRecord });
    alert('토론방이 생성되었습니다!');
    navigate('/discussions');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b p-4 flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => navigate('/discussions')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="font-semibold text-lg">토론방 만들기</h1>
      </div>

      <div className="p-4 space-y-4">
        {selectedRecord && (
          <Card className="border-[#A8D17B] border-2">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <BookOpen className="h-4 w-4 text-[#A8D17B]" />
                연결된 기록
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium text-gray-900 mb-1">{selectedRecord.bookTitle}</p>
              <p className="text-xs text-gray-600 mb-2">{selectedRecord.date}</p>
              {selectedRecord.excerpt && (
                <div className="bg-gray-50 p-2 rounded text-xs italic text-gray-700 mb-2">
                  "{selectedRecord.excerpt}"
                </div>
              )}
              <p className="text-sm text-gray-800 line-clamp-2">{selectedRecord.content}</p>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>토론 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">토론 제목</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="토론 주제를 입력하세요"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="content">토론 내용</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="토론하고 싶은 내용을 자세히 설명해주세요..."
                className="mt-1 min-h-[150px]"
              />
            </div>

            <div>
              <Label htmlFor="tags">태그</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="tags"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="태그를 입력하세요"
                  className="flex-1"
                />
                <Button onClick={handleAddTag} variant="outline">
                  추가
                </Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs flex items-center gap-1">
                      {tag}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => handleRemoveTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <Button 
              onClick={handleSubmit}
              className="w-full bg-[#A8D17B] hover:bg-[#96C169] text-white"
            >
              <Send className="h-4 w-4 mr-2" />
              토론방 생성
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DiscussionCreate;
