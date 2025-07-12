
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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

const MyLibrary = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem('myLibrary') || '[]');
    setBooks(savedBooks);
  }, []);

  const handleRemoveBook = (bookId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedBooks = books.filter(book => book.id !== bookId);
    setBooks(updatedBooks);
    localStorage.setItem('myLibrary', JSON.stringify(updatedBooks));
    toast({
      title: "도서가 삭제되었습니다",
      description: "서재에서 도서를 제거했습니다.",
    });
  };

  const handleBookClick = (book: Book) => {
    // 해당 도서의 기록들을 보여주는 페이지로 이동
    navigate('/records', { state: { selectedBook: book } });
  };

  if (books.length === 0) {
    return (
      <div className="p-4">
        <div className="text-center py-16">
          <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <h2 className="text-lg font-medium text-gray-900 mb-2">
            아직 등록된 도서가 없습니다
          </h2>
          <p className="text-gray-500 mb-6">
            도서를 검색하여 나만의 서재를 만들어보세요
          </p>
          <Button 
            onClick={() => navigate('/search')}
            className="bg-[#A8D17B] hover:bg-[#A8D17B]/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            도서 추가하기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-600">
          총 {books.length}권의 도서
        </div>
        <Button 
          size="sm"
          onClick={() => navigate('/search')}
          className="bg-[#A8D17B] hover:bg-[#A8D17B]/90"
        >
          <Plus className="h-4 w-4 mr-1" />
          추가
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {books.map((book) => (
          <Card 
            key={book.id} 
            className="cursor-pointer hover:shadow-md transition-shadow relative"
            onClick={() => handleBookClick(book)}
          >
            <CardContent className="p-3">
              <div className="aspect-[3/4] bg-gray-200 rounded-lg flex items-center justify-center mb-3 relative">
                <span className="text-4xl">📚</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => handleRemoveBook(book.id, e)}
                  className="absolute top-1 right-1 text-red-500 hover:text-red-700 hover:bg-red-50 w-6 h-6 p-0"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 text-sm">
                  {book.title}
                </h3>
                <p className="text-xs text-gray-600 mb-1">{book.author}</p>
                <p className="text-xs text-gray-500">
                  {book.publisher}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyLibrary;
