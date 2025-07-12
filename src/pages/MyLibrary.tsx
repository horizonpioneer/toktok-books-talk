
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
    // 로컬 스토리지에서 도서 목록 불러오기
    const savedBooks = JSON.parse(localStorage.getItem('myLibrary') || '[]');
    setBooks(savedBooks);
  }, []);

  const handleRemoveBook = (bookId: string) => {
    const updatedBooks = books.filter(book => book.id !== bookId);
    setBooks(updatedBooks);
    localStorage.setItem('myLibrary', JSON.stringify(updatedBooks));
    toast({
      title: "도서가 삭제되었습니다",
      description: "서재에서 도서를 제거했습니다.",
    });
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

      <div className="space-y-3">
        {books.map((book) => (
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
                  <p className="text-xs text-gray-500 mb-2">
                    {book.publisher} · {book.publishedDate}
                  </p>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate('/record/write', { state: { selectedBook: book } })}
                      className="text-xs"
                    >
                      기록 작성
                    </Button>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleRemoveBook(book.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyLibrary;
