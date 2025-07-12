
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, MessageSquare, PenTool, TrendingUp } from 'lucide-react';

interface RecentActivity {
  id: string;
  type: 'record' | 'discussion';
  title: string;
  bookTitle?: string;
  date: string;
}

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [recentActivities] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'record',
      title: '클린 코드에서 배운 네이밍 규칙',
      bookTitle: '클린 코드',
      date: '2024-07-10',
    },
    {
      id: '2',
      type: 'discussion',
      title: '함수형 프로그래밍 vs 객체지향 프로그래밍',
      date: '2024-07-09',
    },
  ]);

  const quickActions = [
    {
      title: '도서 검색',
      description: '새로운 책을 찾아보세요',
      icon: BookOpen,
      action: () => navigate('/search'),
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: '기록 작성',
      description: '읽은 내용을 기록해보세요',
      icon: PenTool,
      action: () => navigate('/record/write'),
      color: 'bg-green-50 text-green-600',
    },
    {
      title: '토론 참여',
      description: '다른 개발자들과 소통하세요',
      icon: MessageSquare,
      action: () => navigate('/discussions'),
      color: 'bg-purple-50 text-purple-600',
    },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* 환영 인사 */}
      <div className="bg-gradient-to-r from-[#A8D17B] to-[#A8D17B]/80 rounded-lg p-6 text-white">
        <h2 className="text-xl font-bold mb-2">안녕하세요, {user?.nickname}님!</h2>
        <p className="text-sm opacity-90">오늘도 새로운 지식을 쌓아보세요</p>
      </div>

      {/* 빠른 액션 */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-900">빠른 시작</h3>
        <div className="grid grid-cols-1 gap-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow" onClick={action.action}>
                <CardContent className="flex items-center p-4">
                  <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mr-4`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{action.title}</h4>
                    <p className="text-sm text-gray-500">{action.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* 최근 활동 */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">최근 활동</h3>
          <Button variant="ghost" size="sm" onClick={() => navigate('/records')}>
            전체보기
          </Button>
        </div>
        <div className="space-y-3">
          {recentActivities.map((activity) => (
            <Card key={activity.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    activity.type === 'record' ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'
                  }`}>
                    {activity.type === 'record' ? (
                      <PenTool className="h-4 w-4" />
                    ) : (
                      <MessageSquare className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">{activity.title}</h4>
                    {activity.bookTitle && (
                      <p className="text-sm text-gray-500 mb-1">📚 {activity.bookTitle}</p>
                    )}
                    <p className="text-xs text-gray-400">{activity.date}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 통계 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-base">
            <TrendingUp className="h-5 w-5 mr-2 text-[#A8D17B]" />
            나의 독서 현황
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-[#A8D17B]">12</div>
              <div className="text-xs text-gray-500">등록된 도서</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#A8D17B]">8</div>
              <div className="text-xs text-gray-500">작성한 기록</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#A8D17B]">5</div>
              <div className="text-xs text-gray-500">참여한 토론</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
