
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, BookOpen, Plus, MessageSquare, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', icon: Home, label: '홈' },
    { path: '/library', icon: BookOpen, label: '서재' },
    { path: '/record/write', icon: Plus, label: '기록', isCenter: true },
    { path: '/discussions', icon: MessageSquare, label: '토론' },
    { path: '/profile', icon: User, label: '프로필' },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200">
      <div className="flex justify-around py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Button
              key={item.path}
              variant="ghost"
              size="sm"
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center p-1 ${
                item.isCenter 
                  ? 'w-16 h-16 rounded-full bg-[#A8D17B] hover:bg-[#96C169] text-white'
                  : 'h-12 w-12'
              } ${
                isActive && !item.isCenter
                  ? 'text-[#A8D17B] bg-[#A8D17B]/10' 
                  : !item.isCenter ? 'text-gray-500 hover:text-gray-700' : ''
              }`}
            >
              <Icon className={`${item.isCenter ? 'h-6 w-6' : 'h-5 w-5'} ${item.isCenter ? '' : 'mb-1'}`} />
              {!item.isCenter && <span className="text-xs">{item.label}</span>}
            </Button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
