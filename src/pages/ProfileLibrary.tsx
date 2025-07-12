
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface Book {
  id: string;
  title: string;
  author: string;
  publisher: string;
  thumbnail: string;
  description: string;
  publishedDate: string;
}

const ProfileLibrary = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem('myLibrary') || '[]');
    setBooks(savedBooks);
  }, []);

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
  };

  const handleBack = () => {
    if (selectedBook) {
      setSelectedBook(null);
    } else {
      navigate('/profile');
    }
  };

  if (selectedBook) {
    return (
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Button variant="ghost" size="sm" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-bold">도서 정보</h1>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="flex gap-4 mb-4">
              <div className="w-24 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-3xl">📚</span>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-2">{selectedBook.title}</h2>
                <p className="text-gray-600 mb-1">{selectedBook.author}</p>
                <p className="text-gray-500 text-sm">{selectedBook.publisher}</p>
                {selectedBook.publishedDate && (
                  <p className="text-gray-500 text-sm">{selectedBook.publishedDate}</p>
                )}
              </div>
            </div>
            
            {selectedBook.description && (
              <div>
                <h3 className="font-medium mb-2">책 소개</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {selectedBook.description}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="sm" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-lg font-bold">서재 도서</h1>
      </div>

      {books.length === 0 ? (
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
            도서 검색하기
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {books.map((book) => (
            <Card 
              key={book.id} 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleBookClick(book)}
            >
              <CardContent className="p-3">
                <div className="aspect-[3/4] bg-gray-200 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-4xl">📚</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 text-sm">
                    {book.title}
                  </h3>
                  <p className="text-xs text-gray-600">{book.author}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileLibrary;
