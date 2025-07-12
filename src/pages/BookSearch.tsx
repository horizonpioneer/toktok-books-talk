
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Plus, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Book {
  id: string;
  title: string;
  author: string;
  publisher: string;
  thumbnail: string;
  description: string;
  publishedDate: string;
}

const BookSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [addedBooks, setAddedBooks] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  // 목업 도서 데이터
  const mockBooks: Book[] = [
    {
      id: '1',
      title: '클린 코드',
      author: '로버트 C. 마틴',
      publisher: '인사이트',
      thumbnail: '/placeholder.svg',
      description: '애자일 소프트웨어 장인 정신',
      publishedDate: '2013-12-24',
    },
    {
      id: '2',
      title: 'JavaScript: The Good Parts',
      author: '더글라스 크록포드',
      publisher: '한빛미디어',
      thumbnail: '/placeholder.svg',
      description: '자바스크립트의 핵심 가이드',
      publishedDate: '2008-12-17',
    },
    {
      id: '3',
      title: '리팩터링',
      author: '마틴 파울러',
      publisher: '한빛미디어',
      thumbnail: '/placeholder.svg',
      description: '기존 코드를 안전하게 개선하는 방법',
      publishedDate: '2019-12-02',
    },
  ];

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "검색어를 입력해주세요",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    
    // 실제 API 호출 시뮬레이션
    setTimeout(() => {
      const filtered = mockBooks.filter(book => 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
      setIsSearching(false);
    }, 1000);
  };

  const handleAddToLibrary = (book: Book) => {
    // 실제로는 서버에 저장
    const savedBooks = JSON.parse(localStorage.getItem('myLibrary') || '[]');
    if (!savedBooks.find((b: Book) => b.id === book.id)) {
      savedBooks.push(book);
      localStorage.setItem('myLibrary', JSON.stringify(savedBooks));
      setAddedBooks(prev => new Set(prev).add(book.id));
      toast({
        title: "서재에 추가되었습니다",
        description: `"${book.title}"이 내 서재에 추가되었습니다.`,
      });
    } else {
      toast({
        title: "이미 서재에 있는 도서입니다",
        variant: "destructive",
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* 검색 입력 */}
      <div className="flex space-x-2">
        <div className="flex-1 relative">
          <Input
            placeholder="책 제목이나 저자명을 입력하세요"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pr-10"
          />
          <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
        </div>
        <Button 
          onClick={handleSearch}
          disabled={isSearching}
          className="bg-[#A8D17B] hover:bg-[#A8D17B]/90"
        >
          {isSearching ? '검색중...' : '검색'}
        </Button>
      </div>

      {/* 검색 결과 */}
      <div className="space-y-3">
        {searchResults.length > 0 && (
          <div className="text-sm text-gray-600">
            검색 결과 {searchResults.length}개
          </div>
        )}
        
        {searchResults.map((book) => (
          <Card key={book.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex space-x-3">
                <div className="w-16 h-20 bg-gray-200 rounded flex-shrink-0 flex items-center justify-center">
                  <span className="text-xs text-gray-500">📚</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 mb-1 truncate">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">{book.author}</p>
                  <p className="text-xs text-gray-500 mb-2">{book.publisher} · {book.publishedDate}</p>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {book.description}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Button
                    size="sm"
                    onClick={() => handleAddToLibrary(book)}
                    disabled={addedBooks.has(book.id)}
                    className={
                      addedBooks.has(book.id)
                        ? "bg-gray-100 text-gray-500"
                        : "bg-[#A8D17B] hover:bg-[#A8D17B]/90"
                    }
                  >
                    {addedBooks.has(book.id) ? (
                      <>
                        <Check className="h-4 w-4 mr-1" />
                        추가됨
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-1" />
                        추가
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {searchQuery && searchResults.length === 0 && !isSearching && (
          <div className="text-center py-8 text-gray-500">
            <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>검색 결과가 없습니다.</p>
            <p className="text-sm">다른 검색어로 시도해보세요.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookSearch;
