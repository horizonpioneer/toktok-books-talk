import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import BookSearch from "./pages/BookSearch";
import MyLibrary from "./pages/MyLibrary";
import RecordWrite from "./pages/RecordWrite";
import MyRecords from "./pages/MyRecords";
import Discussions from "./pages/Discussions";
import DiscussionRoom from "./pages/DiscussionRoom";
import DiscussionCreate from "./pages/DiscussionCreate";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ProfileLibrary from "./pages/ProfileLibrary";
import ProfileRecords from "./pages/ProfileRecords";
import ProfileDiscussions from "./pages/ProfileDiscussions";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="search" element={<BookSearch />} />
              <Route path="library" element={<MyLibrary />} />
              <Route path="record/write" element={<RecordWrite />} />
              <Route path="records" element={<MyRecords />} />
              <Route path="discussions" element={<Discussions />} />
              <Route path="discussion/create" element={<DiscussionCreate />} />
              <Route path="discussion/:id" element={<DiscussionRoom />} />
              <Route path="profile" element={<Profile />} />
              <Route path="profile/library" element={<ProfileLibrary />} />
              <Route path="profile/records" element={<ProfileRecords />} />
              <Route path="profile/discussions" element={<ProfileDiscussions />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
