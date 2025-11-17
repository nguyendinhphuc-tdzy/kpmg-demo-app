import React from 'react';
import { Icon } from './Icon';

const PromptCard = React.memo(({ prompt, onOpen, onToggleSave, onOpenRating, activeView, onOpenEditor, index, currentSort }) => {
           
    const isMyLibraryView = activeView === 'myLibrary';
    
    // Logic Top 3 (không đổi)
    const isTopRated = !isMyLibraryView && currentSort === 'popular' && (index === 0 || index === 1 || index === 2);

    const cardClasses = isTopRated
        ? "group bg-white rounded-2xl shadow-lg hover:shadow-2xl border-2 border-transparent transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1 relative" +
          " bg-gradient-to-br from-blue-600 to-purple-600 p-[2px]" 
        : "group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1 relative";

    return (
        <div className={cardClasses}> 
            <div className={isTopRated ? "bg-white rounded-[calc(0.8rem-1px)] h-full flex flex-col" : "h-full flex flex-col"}>
            
            {/* Container icon góc trên: CHỈ CÒN LẠI NGÔI SAO TOP 3 */}
            <div className="absolute top-(-2) right-2 z-10 flex flex-col items-end gap-0">
                
                {isTopRated && (
                    <div 
                        className="p-1"
                        title={`Top ${index + 1} Popular Prompt`}
                    >
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                            <Icon name="star" size={18} className="text-white fill-white" />
                        </div>
                    </div>
                )}
            </div>
            
            
            <div className="p-6 flex-1 flex flex-col cursor-pointer" onClick={() => onOpen(prompt)}>
                <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg">{prompt.tags.department}</span>
                    <span className="px-3 py-1.5 bg-green-50 text-green-700 text-xs font-semibold rounded-lg">{prompt.tags.task}</span>
                </div>
                
                {/* Rating đã bị XÓA khỏi đây */}
                <h3 className={`text-lg font-bold text-gray-900 line-clamp-2 mb-3 group-hover:text-blue-700 transition-colors pr-8`}>{prompt.title}</h3>
                
                <p className="text-gray-600 text-sm line-clamp-3 flex-1 leading-relaxed">{prompt.description}</p>
            </div>
            
            {/* === FOOTER VỚI BỐ CỤC MỚI & UI CŨ === */}
            <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                
                {/* --- BÊN TRÁI: (Feedback + Bookmark) HOẶC (Edit) --- */}
                {!isMyLibraryView ? (
                    <div className="flex items-center gap-4">
                        
                        {/* 1A. Nút Feedback / Rated (Style VIỀN GRADIENT) */}
                        {prompt.stats.userRating > 0 ? (
                            
                            // Trạng thái Rated (với viền gradient)
                            <button
                                onClick={(e) => { e.stopPropagation(); onOpenRating(); }}
                                className="rounded-lg p-[2px] bg-gradient-to-br from-blue-600 to-purple-600"
                                title="Edit your rating"
                            >
                                {/* === THAY ĐỔI Ở ĐÂY === */}
                                <div className="bg-white rounded-[calc(0.5rem-2px)] px-4 py-1.5 hover:bg-gray-50 transition-colors flex items-center">
                                    {/* Icon "edit-3" đã bị xóa */}
                                    <span className="font-semibold text-sm text-yellow-500">
                                        {`Rated ${prompt.stats.userRating} ★`}
                                    </span>
                                </div>
                            </button>

                        ) : (
                            
                            // Trạng thái Feedback (với viền gradient)
                            <button
                                onClick={(e) => { e.stopPropagation(); onOpenRating(); }}
                                className="rounded-lg p-[2px] bg-gradient-to-br from-blue-600 to-purple-600 transition-all duration-300 hover:shadow-lg hover:scale-105"
                                title="Rate this prompt"
                            >
                                <div className="bg-white rounded-[calc(0.5rem-2px)] px-4 py-1.5 hover:bg-gray-50 transition-colors">
                                    <span className="font-semibold text-sm text-blue-600">
                                        Feedback
                                    </span>
                                </div>
                            </button>
                        )}
                        
                        {/* 1B. Nút Bookmark (Đã chuyển đến đây) */}
                        <button
                            onClick={(e) => { e.stopPropagation(); onToggleSave(prompt.id); }}
                            className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${prompt.isSaved ? 'text-blue-600' : 'text-gray-400'}`}
                            title={prompt.isSaved ? "Remove from My Prompts" : "Save to My Prompts"}
                        >
                            <Icon name="bookmark" size={20} className={prompt.isSaved ? 'fill-blue-600' : ''} />
                        </button>
                         
                    </div>
                ) : (
                    // Trạng thái My Library (nút Edit)
                    <div className="flex items-center gap-2">
                        <button
                            onClick={(e) => { e.stopPropagation(); onOpenEditor(prompt); }}
                            className="px-3 py-1 text-xs font-semibold text-blue-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            Edit
                        </button>
                    </div>
                )}
                
                {/* --- BÊN PHẢI: Rating (Đã chuyển đến đây) --- */}
                {!isMyLibraryView && (
                    <div 
                        className="flex items-center text-gray-500" 
                        title={`Average Rating: ${prompt.stats.rating.toFixed(1)} (${prompt.stats.rating_count} votes)`}
                    >
                        <Icon name="star" size={16} className="text-yellow-500 fill-yellow-500 mr-1.5" />
                        <span className="font-bold text-gray-900">{prompt.stats.rating.toFixed(1)}</span>
                        <span className="ml-1.5 text-xs">({prompt.stats.rating_count})</span>
                    </div>
                )}
            </div>
            {/* =================================== */}

            </div> 
        </div> 
    );
});

export default PromptCard;