
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { User, BookOpen, FileText, MessageSquare, Settings, LogOut, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { label: '서재 도서', value: 12, icon: BookOpen, path: '/profile/library' },
    { label: '작성 기록', value: 8, icon: FileText, path: '/profile/records' },
    { label: '참여 토론', value: 5, icon: MessageSquare, path: '/profile/discussions' }
  ];

  const recentActivity = [
    { type: 'record', title: '클린 코드 독후감 작성', date: '2시간 전' },
    { type: 'discussion', title: '리팩토링 토론에 참여', date: '1일 전' },
    { type: 'book', title: '자바스크립트 완벽 가이드 서재 추가', date: '2일 전' }
  ];

  const handleLogout = () => {
    logout();
    alert('로그아웃되었습니다.');
  };

  return (
    <div className="p-4 space-y-6">
      <Card>
        <CardHeader className="text-center">
          <Avatar className="w-20 h-20 mx-auto mb-4">
            <AvatarFallback className="text-2xl bg-[#A8D17B] text-white">
              {user?.nickname?.[0] || 'U'}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-xl">{user?.nickname}</CardTitle>
          <p className="text-gray-500">{user?.email}</p>
          <Badge className="bg-[#A8D17B] text-white mx-auto">
            독서 애호가
          </Badge>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card 
              key={index} 
              className="text-center cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(stat.path)}
            >
              <CardContent className="p-4">
                <Icon className="h-6 w-6 mx-auto mb-2 text-[#A8D17B]" />
                <p className="text-lg font-bold">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            최근 활동
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
              <div className="w-2 h-2 bg-[#A8D17B] rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">{activity.title}</p>
                <p className="text-xs text-gray-500">{activity.date}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="space-y-2">
        <Button variant="outline" className="w-full justify-start">
          <Settings className="h-4 w-4 mr-2" />
          설정
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <Shield className="h-4 w-4 mr-2" />
          차단 관리
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          로그아웃
        </Button>
      </div>
    </div>
  );
};

export default Profile;
