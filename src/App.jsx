import React, { useState, useCallback, useMemo } from 'react';
import { MOCK_PROMPTS, CURRENT_USER_ID } from './data/MockData';
import { useToast } from './context/ToastContext';
import { marked } from 'marked'; 

// Import chunks
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import PromptCard from './components/PromptCard';
import { Icon } from './components/Icon';
import { BaseModal } from './components/modals/BaseModal';
import PromptModal from './components/modals/PromptModal';
import RatingModal from './components/modals/RatingModal';
import PromptEditorModal from './components/modals/PromptEditorModal';
import NewsDashboard from './components/modals/NewsDashboard';

function App() {
    // ... (Giữ nguyên toàn bộ phần State và Handlers như cũ) ...
    const [prompts, setPrompts] = useState(MOCK_PROMPTS);
    const [activeFilters, setActiveFilters] = useState({ 
        view: 'public',
        department: 'Partner', 
        task: 'All Tasks' 
    });

    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('popular');
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    
    const [selectedPrompt, setSelectedPrompt] = useState(null);
    const [selectedNews, setSelectedNews] = useState(null);
    const [ratingPrompt, setRatingPrompt] = useState(null);
    const [editorPrompt, setEditorPrompt] = useState(null);
    
    const showToast = useToast();

    const toggleSidebar = useCallback(() => setIsSidebarCollapsed(prev => !prev), []);

    const handleToggleSave = useCallback((id) => {
        setPrompts(prev => prev.map(p => p.id === id ? { ...p, isSaved: !p.isSaved } : p));
        if (selectedPrompt?.id === id) setSelectedPrompt(prev => ({ ...prev, isSaved: !prev.isSaved }));
        
        const isNowSaved = !prompts.find(p => p.id === id).isSaved;
        showToast(isNowSaved ? "Saved to My Prompts" : "Removed from My Prompts");
    }, [selectedPrompt, prompts, showToast]);

    const handleSubmitRating = useCallback((id, rating, optimization, comment) => {
         setPrompts(prev => prev.map(p => {
             if (p.id === id) {
                 const oldUserRating = p.stats.userRating || 0;
                 let newCount = p.stats.rating_count;
                 let newTotal = p.stats.rating * p.stats.rating_count;

                 if (oldUserRating === 0 && rating > 0) {
                     newCount++;
                     newTotal += rating;
                 } else if (oldUserRating > 0 && rating > 0) {
                     newTotal = newTotal - oldUserRating + rating;
                 }
                 
                 return { 
                     ...p, 
                     stats: { 
                         ...p.stats, 
                         rating: newCount > 0 ? parseFloat((newTotal / newCount).toFixed(1)) : 0, 
                         rating_count: newCount, 
                         userRating: rating
                     } 
                 };
             }
             return p;
         }));
         showToast("Thank you for your feedback!");
    }, [showToast]);
    
    const handleOpenEditor = useCallback((prompt) => setEditorPrompt(prompt), []);
    const handleCloseEditor = useCallback(() => setEditorPrompt(null), []);
    const handleCreateNew = useCallback(() => handleOpenEditor({}), [handleOpenEditor]);
    
    const handleSavePrompt = useCallback((formData) => {
        if (formData.id) {
            setPrompts(prev => prev.map(p => p.id === formData.id ? { ...p, ...formData } : p));
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
    
    const filteredPrompts = useMemo(() => {
        let basePrompts = [];
        switch (activeFilters.view) {
            case 'myLibrary':
                basePrompts = prompts.filter(p => p.ownerId === CURRENT_USER_ID);
                break;
            case 'myFavorites':
                basePrompts = prompts.filter(p => p.isSaved);
                break;
            case 'common':
                basePrompts = prompts.filter(p => p.status === 'public' && p.tags.department === 'All Departments');
                break;
            case 'public':
            case 'news':
            default:
                basePrompts = prompts.filter(p => p.status === 'public' && p.tags.department !== 'All Departments');
                break;
        }
        
        basePrompts = basePrompts.filter(p => {
            const lowerSearch = search.toLowerCase();
            const matchSearch = p.title.toLowerCase().includes(lowerSearch) || 
                              p.description.toLowerCase().includes(lowerSearch);
            
            let matchDept = false;
            if (activeFilters.view === 'public') {
                 matchDept = p.tags.department === activeFilters.department;
            } else if (activeFilters.view === 'common') {
                 matchDept = true;
            } else {
                 if (activeFilters.department === 'All Departments') {
                     matchDept = true;
                 } else {
                     matchDept = p.tags.department === activeFilters.department;
                 }
            }

            const matchTask = (activeFilters.task === 'All Tasks') ? true : p.tags.task === activeFilters.task;
                              
            return matchSearch && matchDept && matchTask;
        });
        
        if (sort === 'rating') return basePrompts.sort((a,b) => b.stats.rating - a.stats.rating);
        if (sort === 'newest') return basePrompts.sort((a,b) => b.id - a.id);
        
        const topRatedIds = new Set([...basePrompts].sort((a, b) => b.stats.rating - a.stats.rating).slice(0, 3).map(p => p.id));
        const topRated = basePrompts.filter(p => topRatedIds.has(p.id)).sort((a, b) => b.stats.rating - a.stats.rating);
        const others = basePrompts.filter(p => !topRatedIds.has(p.id)).sort((a, b) => b.stats.use_count - a.stats.use_count);
        
        return [...topRated, ...others];

    }, [prompts, search, activeFilters, sort]);

    // --- JSX ĐÃ ĐƯỢC TINH CHỈNH RESPONSIVE ---
    return (
        <div className="flex h-[100dvh] w-full bg-[#F8F9FC] overflow-hidden">
            
            {/* Sidebar: Cố định chiều rộng, flex-shrink-0 để không bị co */}
<Sidebar 
                activeFilters={activeFilters} 
                setActiveFilters={setActiveFilters} 
                isCollapsed={isSidebarCollapsed} 
                toggleSidebar={toggleSidebar} 
                savedCount={prompts.filter(p => p.isSaved).length} 
            />
            
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden h-full">
                <Header 
                    search={search} 
                    setSearch={setSearch} 
                    sort={sort} 
                    setSort={setSort}
                    activeView={activeFilters.view}
                    onCreateNew={handleCreateNew}
                />
                
                {/* Content Area */}
                <main className="flex-1 p-4 md:p-6 relative">
                    {filteredPrompts.length > 0 ? (
                        // Grid Grid Responsive tinh chỉnh lại để an toàn hơn trên màn hình nhỏ
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6 pb-24">
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
                        // Empty State
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                            <div className="bg-gray-100 p-6 rounded-full mb-4">
                                <Icon name="folder-search" size={48} className="opacity-50" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-600">No prompts found</h3>
                            <p className="text-sm max-w-xs text-center mt-2">
                                {activeFilters.view === 'public' && activeFilters.department === 'Partner'
                                    ? "Loading Partner prompts..." 
                                    : "Try adjusting your filters."}
                            </p>
                        </div>
                    )}
                </main>
                
                <NewsDashboard 
                    isOpen={activeFilters.view === 'news'}
                    onClose={() => setActiveFilters(prev => ({ ...prev, view: 'public', department: 'Partner' }))}
                    onOpenNews={setSelectedNews}
                />
            </div>
            
            {/* ... (Các Modal giữ nguyên) ... */}
            <PromptModal prompt={selectedPrompt} isOpen={!!selectedPrompt} onClose={() => setSelectedPrompt(null)} onToggleSave={handleToggleSave} />
            <RatingModal prompt={ratingPrompt} isOpen={!!ratingPrompt} onClose={() => setRatingPrompt(null)} onSubmit={handleSubmitRating} />
            <PromptEditorModal prompt={editorPrompt} isOpen={!!editorPrompt} onClose={handleCloseEditor} onSave={handleSavePrompt} />
            
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
                    <div className="flex items-start gap-3 p-4 bg-kpmg-blue/5 rounded-lg">
                        <Icon name="info" size={20} className="text-kpmg-blue mt-1 flex-shrink-0" />
                        <p className="text-gray-700 leading-relaxed">{selectedNews?.description}</p>
                    </div>
                    <div className="border-t border-gray-200 pt-6">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{selectedNews?.content || "No additional content."}</p>
                    </div>
                </div>
            </BaseModal>
        </div>
    );
}

export default App;