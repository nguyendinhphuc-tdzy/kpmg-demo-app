import React from 'react';
import { Icon } from './Icon';

const Header = React.memo(({ search, setSearch, sort, setSort, activeView, onCreateNew }) => {
           
    let title = 'Prompt Library Demo';
    if (activeView === 'common') title = 'Common Prompt';
    if (activeView === 'myLibrary') title = 'My Library';
    if (activeView === 'myFavorites') title = 'My Favourite Prompts';
    
    return (
        <header className="bg-white px-8 py-5 border-b border-kpmg-blue/20 flex flex-col md:flex-row justify-between items-center gap-4 sticky top-0 z-10 shadow-sm">
            <h1 className="text-2xl font-bold text-kpmg-blue">{title}</h1>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto items-center">
                
                {activeView === 'myLibrary' && (
                    <button 
                        onClick={onCreateNew}
                        className="w-full sm:w-auto px-5 py-3 bg-kpmg-blue text-white rounded-xl font-semibold hover:bg-kpmg-blue/90 transition-colors flex items-center justify-center shadow-sm"
                    >
                        <Icon name="plus-circle" size={20} className="mr-2" />
                        Create New Prompt
                    </button>
                )}
                
                <>
                    <div className="relative flex-1 sm:flex-none sm:w-80">
                        <input type="text" placeholder="Search prompts..." className="w-full pl-14 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-kpmg-blue focus:bg-white outline-none transition-all"
                            value={search} onChange={(e) => setSearch(e.target.value)} />
                        <Icon name="search" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                    
                    <div className="flex gap-4 w-full sm:w-auto">
                        <div className="relative flex-1 sm:w-auto">
                            <select className="w-full p-3 pl-4 pr-10 bg-white border border-gray-200 rounded-xl appearance-none focus:ring-2 focus:ring-kpmg-blue outline-none font-medium text-gray-700 cursor-pointer hover:border-kpmg-blue transition-colors"
                                value={sort} onChange={(e) => setSort(e.target.value)}>
                                <option value="popular">Most Popular</option>
                                <option value="newest">Newest</option>
                                <option value="rating">Highest Rated</option>
                            </select>
                            <Icon name="arrow-down-up" size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                </>
            </div>
        </header>
    );
});

export default Header;