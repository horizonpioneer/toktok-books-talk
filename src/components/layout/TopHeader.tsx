
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TopHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return '토독토독';
      case '/search':
        return '도서 검색';
      case '/library':
        return '내 서재';
      case '/record/write':
        return '기록 작성';
      case '/records':
        return '내 기록';
      case '/discussions':
        return '토론';
      case '/profile':
        return '프로필';
      default:
        return '토독토독';
    }
  };

  const showBackButton = location.pathname !== '/';
  const showSearchButton = location.pathname === '/';
  const showAddButton = location.pathname === '/discussions';

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center">
        {showBackButton && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mr-2 p-1 h-8 w-8"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <h1 className="text-lg font-bold text-gray-900">{getPageTitle()}</h1>
      </div>
      
      <div className="flex items-center space-x-2">
        {showSearchButton && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/search')}
            className="p-1 h-8 w-8"
          >
            <Search className="h-5 w-5" />
          </Button>
        )}
        {showAddButton && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/record/write')}
            className="p-1 h-8 w-8"
          >
            <Plus className="h-5 w-5" />
          </Button>
        )}
      </div>
    </header>
  );
};

export default TopHeader;
