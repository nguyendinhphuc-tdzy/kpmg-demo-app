// Import React và các Hook
import React, { useState, useCallback, useMemo, useEffect } from 'react';

// Import Dữ liệu
import { MOCK_PROMPTS, CURRENT_USER_ID } from './data/MockData';

// Import Context
import { useToast } from './context/ToastContext';

// Import thư viện bên ngoài (thay cho CDN)
import { marked } from 'marked'; // (Bạn cần chạy: npm install marked)

// Import các "chunks" (features)
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import PromptCard from './components/PromptCard';
import { Icon } from './components/Icon'; // (Bạn cần tạo file Icon.jsx)
import { BaseModal } from './components/modals/BaseModal';
import PromptModal from './components/modals/PromptModal';
import RatingModal from './components/modals/RatingModal';
import PromptEditorModal from './components/modals/PromptEditorModal';
import NewsDashboard from './components/modals/NewsDashboard';

// Đổi tên "MainLayout" thành "App"
function App() {
    
    // --- Toàn bộ state của MainLayout (từ dòng 1153) ---
    const [prompts, setPrompts] = useState(MOCK_PROMPTS);
    const [activeFilters, setActiveFilters] = useState({ 
        view: 'public',
        department: 'Partner', 
        task: 'All Tasks' 
    });
    // ... (Sao chép TẤT CẢ state từ [search] đến [editorPrompt] vào đây) ...
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('popular');
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [selectedPrompt, setSelectedPrompt] = useState(null);
    const [selectedNews, setSelectedNews] = useState(null);
    const [ratingPrompt, setRatingPrompt] = useState(null);
    const [editorPrompt, setEditorPrompt] = useState(null);
    const showToast = useToast();

    // --- Toàn bộ các hàm (handlers) của MainLayout (từ dòng 1172) ---
    const toggleSidebar = useCallback(() => {
         setIsSidebarCollapsed(prev => !prev);
    }, []);

           const handleToggleSave = React.useCallback((id) => {
               let promptTitle = "";
               setPrompts(prevPrompts => prevPrompts.map(p => {
                   if (p.id === id) {
                       promptTitle = p.title; 
                       return { ...p, isSaved: !p.isSaved };
                   }
                   return p;
               }));
               
               if (selectedPrompt?.id === id) {
                   setSelectedPrompt(prev => ({ ...prev, isSaved: !prev.isSaved }));
               }
               
               const newPrompt = prompts.find(p => p.id === id);
               if (newPrompt) {
                   showToast(!newPrompt.isSaved ? "Saved to My Prompts" : "Removed from My Prompts");
               }
           }, [selectedPrompt, prompts, showToast]);

           const handleSubmitRating = React.useCallback((id, rating, optimizationPercentage, comment) => {
                let promptTitle = "";
                let oldUserRating = 0;
                
                setPrompts(prevPrompts => prevPrompts.map(p => {
                    if (p.id === id) {
                        promptTitle = p.title;
                        oldUserRating = p.stats.userRating || 0;
                        
                        const newUserRating = rating; 

                        const oldRatingTotal = p.stats.rating * p.stats.rating_count;
                        let newCount = p.stats.rating_count;
                        let newTotal = oldRatingTotal;

                        if (oldUserRating === 0 && newUserRating > 0) {
                            newCount++;
                            newTotal += newUserRating;
                        } else if (oldUserRating > 0 && newUserRating > 0 && oldUserRating !== newUserRating) {
                            newTotal = newTotal - oldUserRating + newUserRating;
                        }
                        
                        const newAverage = newCount > 0 ? (newTotal / newCount) : 0;
                        const oldReviews = p.stats.reviews || [];
                        const newReview = {
                            user: "Demo User",
                            rating: newUserRating,
                            comment: comment,
                            optimizationPercentage: optimizationPercentage 
                        };
                        
                        const newReviews = (comment.trim() || optimizationPercentage > 0) ? [...oldReviews, newReview] : oldReviews; 

                        return { 
                            ...p, 
                            stats: { 
                                ...p.stats, 
                                rating: parseFloat(newAverage.toFixed(1)), 
                                rating_count: newCount, 
                                userRating: newUserRating,
                                reviews: newReviews
                            } 
                        };
                    }
                    return p;
                }));
                
                let toastMsg = "";
                if (rating > 3) {
                    toastMsg = `Thank you for rating ${rating} stars for "${promptTitle}"!`;
                } else {
                    toastMsg = `Thank you for your feedback. We will improve it.`;
                }
                showToast(toastMsg);
           }, [showToast]);

           const handleOpenEditor = React.useCallback((prompt) => {
               setEditorPrompt(prompt);
           }, []);
           
           const handleCloseEditor = React.useCallback(() => {
               setEditorPrompt(null);
           }, []);
           
           const handleCreateNew = React.useCallback(() => {
               handleOpenEditor({}); 
           }, [handleOpenEditor]);
           
           const handleSavePrompt = React.useCallback((formData) => {
               if (formData.id) {
                   // Update (Edit)
                   setPrompts(prev => prev.map(p => 
                       p.id === formData.id ? { ...p, ...formData } : p
                   ));
                   showToast("Prompt updated successfully!", "success");
               } else {

                   const newPrompt = {
                       ...formData,
                       id: Date.now(), 
                       status: 'private',
                       ownerId: CURRENT_USER_ID,
                       stats: { use_count: 0, rating: 0, rating_count: 0, userRating: 0, reviews: [] },
                       isSaved: false
                   };
                   setPrompts(prev => [newPrompt, ...prev]);
                   showToast("New private prompt created!", "success");
               }
               handleCloseEditor();
           }, [showToast, handleCloseEditor]);
    
    // --- Logic lọc (useMemo) (từ dòng 1251) ---
           const filteredPrompts = React.useMemo(() => {
               let basePrompts = [];
               
               switch (activeFilters.view) {
                   case 'myLibrary':
                       basePrompts = prompts.filter(p => p.ownerId === CURRENT_USER_ID);
                       break;
                   case 'myFavorites':
                       basePrompts = prompts.filter(p => p.isSaved);
                       break;
                   case 'common': // <-- THÊM VIEW MỚI
                       basePrompts = prompts.filter(p => p.status === 'public');
                       break;
                   case 'department': // <-- THAY ĐỔI (trước đây là 'public')
                   case 'news':
                   default:
                       basePrompts = prompts.filter(p => p.status === 'public');
                       break;
               }
               
               basePrompts = basePrompts.filter(p => {
                   const lowerSearch = search.toLowerCase();
                   const matchSearch = p.title.toLowerCase().includes(lowerSearch) || 
                                     p.description.toLowerCase().includes(lowerSearch) ||
                                     p.template.toLowerCase().includes(lowerSearch);
                   
                   // [MỚI] Logic lọc Department đã được tái cấu trúc HOÀN TOÀN
                   const { view, departmentId } = activeFilters;
                   
                   let matchDept = false;
                   if (view === 'common') {
                       // View "Common" CHỈ hiển thị tag 'All Departments'
                       matchDept = p.tags.department === 'All Departments';
                   } else if (view === 'department') {
                       // View "Department" CHỈ hiển thị prompts của departmentId đã chọn
                       matchDept = p.tags.department === departmentId;
                   } else if (view === 'myLibrary' || view === 'myFavorites') {
                       // View cá nhân ("My Library", "My Faves") không bị
                       // ảnh hưởng bởi bộ lọc department/common.
                       matchDept = true; 
                   } else if (view === 'news') {
                       matchDept = true; // View 'news' không lọc prompt
                   }
                   
                   const matchTask = (activeFilters.task === 'All Tasks')
                                     ? true
                                     : p.tags.task === activeFilters.task;
                                     
                   return matchSearch && matchDept && matchTask;
               });
               
               if (sort === 'rating') {
                   return basePrompts.sort((a,b) => b.stats.rating - a.stats.rating);
               }
               
               if (sort === 'newest') {
                   return basePrompts.sort((a,b) => b.id - a.id); 
               }
               
               if (sort === 'popular') {
                   const topRatedPrompts = [...basePrompts]
                       .sort((a, b) => b.stats.rating - a.stats.rating)
                       .slice(0, 3);
                       
                   const topRatedIds = new Set(topRatedPrompts.map(p => p.id));
                   
                   const otherPrompts = basePrompts
                       .filter(p => !topRatedIds.has(p.id))
                       .sort((a, b) => b.stats.use_count - a.stats.use_count);
                       
                   return [...topRatedPrompts, ...otherPrompts];
               }
               return basePrompts;
           }, [prompts, search, activeFilters, sort]);

    // --- JSX (return) của MainLayout (từ dòng 1297) ---
           return (
               <div className="flex h-screen overflow-hidden bg-[#F8F9FC]">
                   <Sidebar 
                       activeFilters={activeFilters} 
                       setActiveFilters={setActiveFilters} 
                       isCollapsed={isSidebarCollapsed} 
                       toggleSidebar={toggleSidebar} 
                       savedCount={prompts.filter(p => p.isSaved).length} 
                   />
                   <div className="flex-1 flex flex-col overflow-hidden">
                       <Header 
                           search={search} 
                           setSearch={setSearch} 
                           sort={sort} 
                           setSort={setSort}
                           activeView={activeFilters.view}
                           onCreateNew={handleCreateNew}
                       />
                       
                       <main className="flex-1 overflow-y-auto p-8">
                           {filteredPrompts.length > 0 ? (
                               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
                                   
                                   {filteredPrompts.map((prompt, index) => (
                                       <PromptCard
                                           key={prompt.id}
                                           prompt={prompt}
                                           index={index}
                                           currentSort={sort}
                                           onOpen={setSelectedPrompt}
                                           onToggleSave={handleToggleSave}
                                           onOpenRating={() => setRatingPrompt(prompt)}
                                           activeView={activeFilters.view}
                                           onOpenEditor={handleOpenEditor}
                                       />
                                   ))}

                               </div>
                           ) : (
                               <div className="h-full flex flex-col items-center justify-center text-gray-400">
                                   <Icon name="folder-search" size={64} className="mb-4 opacity-30" />
                                   <p className="text-xl font-medium text-gray-500">
                                       {activeFilters.view === 'myLibrary' 
                                           ? 'Your library is empty. Try creating a new prompt!'
                                           : 'No prompts found matching your filters.'
                                       }
                                   </p>
                               </div>
                           )}
                       </main>
                
                <NewsDashboard 
                    isOpen={activeFilters.view === 'news'}
                    onClose={() => setActiveFilters(prev => ({ ...prev, view: 'public' }))}
                    onOpenNews={setSelectedNews}
                />
            </div>
            
            {/* ... (Sao chép toàn bộ các Modal JSX ở cuối vào đây) ... */}
            <PromptModal 
                prompt={selectedPrompt} 
                isOpen={!!selectedPrompt} 
                onClose={() => setSelectedPrompt(null)} 
                onToggleSave={handleToggleSave} 
            />
            
            <RatingModal
                 prompt={ratingPrompt}
                 isOpen={!!ratingPrompt}
                 onClose={() => setRatingPrompt(null)}
                 onSubmit={handleSubmitRating}
            />
            
            <PromptEditorModal
                 prompt={editorPrompt}
                 isOpen={!!editorPrompt}
                 onClose={handleCloseEditor} // (Bạn cần thêm hàm handleCloseEditor)
                 onSave={handleSavePrompt}
            />
            
            <BaseModal
                isOpen={!!selectedNews}
                onClose={() => setSelectedNews(null)}
                title={
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">{selectedNews?.title}</h2>
                        <p className="text-gray-500 mt-1 text-sm">{selectedNews?.date}</p>
                    </div>
                }
                       maxWidth="max-w-3xl" 
                   >
                       <div className="space-y-6">
                           <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                               <Icon name="info" size={20} className="text-blue-600 mt-1 flex-shrink-0" />
                               <p className="text-gray-700 leading-relaxed">
                                   An icon line with text. This is a placeholder for a key insight or a note related to the article content. You can customize this text as needed.
                               </p>
                           </div>
                           <div className="border-t border-gray-200 pt-6">
                               <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                   {selectedNews?.content || "No additional content available."}
                               </p>
                           </div>
                       </div>
                   </BaseModal>

               </div>
           );
       };

export default App; // (Export App là component chính)