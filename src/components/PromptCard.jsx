import React from 'react';
import { Icon } from './Icon';

const PromptCard = React.memo(({ prompt, onOpen, onToggleSave, onOpenRating, activeView, onOpenEditor, index, currentSort }) => {
           
    const isMyLibraryView = activeView === 'myLibrary';
    
    const isTopRated = !isMyLibraryView && currentSort === 'popular' && (index === 0 || index === 1 || index === 2);

    // Dùng màu kpmg-blue và tím cho gradient
    const cardClasses = isTopRated
        ? "group bg-white rounded-2xl shadow-lg hover:shadow-2xl border-2 border-transparent transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1 relative" +
          " bg-gradient-to-br from-kpmg-blue to-purple-600 p-[2px]" 
        : "group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1 relative";

    return (
        <div className={cardClasses}> 
            <div className={isTopRated ? "bg-white rounded-[calc(0.8rem-1px)] h-full flex flex-col" : "h-full flex flex-col"}>
            
            <div className="absolute top-(-2) right-2 z-10 flex flex-col items-end gap-0">
                {isTopRated && (
                    <div className="p-1" title={`Top ${index + 1} Popular Prompt`}>
                        <div className="w-8 h-8 bg-gradient-to-br from-kpmg-blue to-purple-600 rounded-full flex items-center justify-center shadow-md">
                            <Icon name="star" size={18} className="text-white fill-white" />
                        </div>
                    </div>
                )}
            </div>
            
            <div className="p-6 flex-1 flex flex-col cursor-pointer" onClick={() => onOpen(prompt)}>
                <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1.5 bg-kpmg-blue/10 text-kpmg-blue text-xs font-semibold rounded-lg">{prompt.tags.department}</span>
                    <span className="px-3 py-1.5 bg-green-50 text-green-700 text-xs font-semibold rounded-lg">{prompt.tags.task}</span>
                </div>
                
                <h3 className={`text-lg font-bold text-gray-900 line-clamp-2 mb-3 group-hover:text-kpmg-blue transition-colors pr-8`}>{prompt.title}</h3>
                
                <p className="text-gray-600 text-sm line-clamp-3 flex-1 leading-relaxed">{prompt.description}</p>
            </div>
            
            <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                
                {!isMyLibraryView ? (
                    <div className="flex items-center gap-4">
                        {prompt.stats.userRating > 0 ? (
                            <button
                                onClick={(e) => { e.stopPropagation(); onOpenRating(); }}
                                className="rounded-lg p-[2px] bg-gradient-to-br from-kpmg-blue to-purple-600"
                                title="Edit your rating"
                            >
                                <div className="bg-white rounded-[calc(0.5rem-2px)] px-4 py-1.5 hover:bg-gray-50 transition-colors flex items-center">
                                    <span className="font-semibold text-sm text-yellow-500">
                                        {`Rated ${prompt.stats.userRating} ★`}
                                    </span>
                                </div>
                            </button>
                        ) : (
                            <button
                                onClick={(e) => { e.stopPropagation(); onOpenRating(); }}
                                className="rounded-lg p-[2px] bg-gradient-to-br from-kpmg-blue to-purple-600 transition-all duration-300 hover:shadow-lg hover:scale-105"
                                title="Rate this prompt"
                            >
                                <div className="bg-white rounded-[calc(0.5rem-2px)] px-4 py-1.5 hover:bg-gray-50 transition-colors">
                                    <span className="font-semibold text-sm text-kpmg-blue">
                                        Feedback
                                    </span>
                                </div>
                            </button>
                        )}
                        
                        <button
                            onClick={(e) => { e.stopPropagation(); onToggleSave(prompt.id); }}
                            className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${prompt.isSaved ? 'text-kpmg-blue' : 'text-gray-400'}`}
                            title={prompt.isSaved ? "Remove from My Prompts" : "Save to My Prompts"}
                        >
                            <Icon name="bookmark" size={20} className={prompt.isSaved ? 'fill-kpmg-blue' : ''} />
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={(e) => { e.stopPropagation(); onOpenEditor(prompt); }}
                            className="px-3 py-1 text-xs font-semibold text-kpmg-blue bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            Edit
                        </button>
                    </div>
                )}
                
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
            </div> 
        </div> 
    );
});

export default PromptCard;