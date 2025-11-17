import React from 'react';
import { Icon } from './Icon';
import { ALL_DEPARTMENTS, ALL_TASKS } from '../data/MockData';

const Sidebar = React.memo(({ activeFilters, setActiveFilters, isCollapsed, toggleSidebar, savedCount }) => {
    
    // --- LOGIC CHUYỂN VIEW ---
    const setView = (viewName) => {
        setActiveFilters(prev => {
            // 1. Nếu chuyển sang 'Prompt Library' (public)
            if (viewName === 'public') {
                return {
                    ...prev,
                    view: 'public',
                    department: 'Partner', // Default về Partner cho Library
                    task: 'All Tasks'
                };
            }
            
            // 2. Nếu chuyển sang 'Common Prompt' (common)
            if (viewName === 'common') {
                return {
                    ...prev,
                    view: 'common',
                    // Ở Common, ta không cần lọc Department (vì nó fix là All Departments)
                    department: 'All Departments', 
                    task: 'All Tasks'
                };
            }
            
            // 3. Nếu chuyển sang 'My Library' hoặc 'My Favorites'
            if (viewName === 'myLibrary' || viewName === 'myFavorites') {
                return {
                    ...prev,
                    view: viewName,
                    department: 'All Departments', 
                    task: 'All Tasks'
                };
            }
            
            // 4. News
            if (viewName === 'news') {
                return { ...prev, view: 'news' };
            }

            return { ...prev, view: viewName };
        });
    };
    
    // --- LOGIC CHUYỂN FILTER ---
    const setFilter = (key, value) => {
        setActiveFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    return (
        <aside className={`${isCollapsed ? 'w-20 px-4' : 'w-80 p-6'} bg-white border-r border-gray-200 flex-shrink-0 transition-all duration-300 flex flex-col z-20`}>
            <div className={`flex items-center mb-10 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
                {!isCollapsed && (
                    <img src="https://placehold.co/200x50/00338D/FFFFFF?text=KPMG&font=inter" alt="KPMG Logo" className="h-10 w-auto object-contain" />)}
                <button onClick={toggleSidebar} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
                    <Icon name={isCollapsed ? "chevrons-right" : "chevrons-left"} size={20} />
                </button>
            </div>
            <div className={`flex-1 space-y-8 ${isCollapsed ? 'hidden' : 'block'}`}>
                
                {/* Filter dropdowns */}
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Department</label>
                    <div className="relative">
                        <select className="w-full p-3 pl-4 pr-10 bg-gray-50 border border-gray-200 rounded-xl appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-medium text-gray-700"
                            value={activeFilters.department} 
                            onChange={(e) => setFilter('department', e.target.value)}
                            // [MỚI] Disable dropdown khi ở chế độ Common Prompt
                            disabled={activeFilters.view === 'common'}
                        >
                            {/* [MỚI] Lọc bỏ 'All Departments' khỏi danh sách chọn */}
                            {ALL_DEPARTMENTS
                                .filter(dept => dept !== 'All Departments')
                                .map(dept => <option key={dept} value={dept}>{dept}</option>)
                            }
                        </select>
                        <Icon name="chevron-down" size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Task</label>
                    <div className="relative">
                        <select className="w-full p-3 pl-4 pr-10 bg-gray-50 border border-gray-200 rounded-xl appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-medium text-gray-700"
                            value={activeFilters.task} 
                            onChange={(e) => setFilter('task', e.target.value)}
                        >
                            {ALL_TASKS.map(task => <option key={task} value={task}>{task}</option>)}
                        </select>
                        <Icon name="chevron-down" size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>
                
                {/* View buttons */}
                <div className="pt-6 border-t border-gray-100 space-y-2">
                    
                    {/* News & Updates */}
                    <button onClick={() => setView('news')}
                        className={`w-full flex items-center justify-between p-4 rounded-xl transition-all group ${activeFilters.view === 'news' ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-gray-50 text-gray-700'}`}>
                        <div className="flex items-center font-semibold">
                            <Icon name="newspaper" size={24} className={`mr-3 ${activeFilters.view === 'news' ? 'text-white' : 'text-gray-400 group-hover:text-blue-600'}`} />
                            News & Updates
                        </div>
                    </button>

                    {/* Prompt Library */}
                    <button onClick={() => setView('public')}
                        className={`w-full flex items-center justify-between p-4 rounded-xl transition-all group ${activeFilters.view === 'public' ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-gray-50 text-gray-700'}`}>
                        <div className="flex items-center font-semibold">
                            <Icon name="layout-grid" size={24} className={`mr-3 ${activeFilters.view === 'public' ? 'text-white' : 'text-gray-400 group-hover:text-blue-600'}`} />
                            Prompt Library
                        </div>
                    </button>

                    {/* [MỚI] Common Prompt */}
                    <button onClick={() => setView('common')}
                        className={`w-full flex items-center justify-between p-4 rounded-xl transition-all group ${activeFilters.view === 'common' ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-gray-50 text-gray-700'}`}>
                        <div className="flex items-center font-semibold">
                            <Icon name="layers" size={24} className={`mr-3 ${activeFilters.view === 'common' ? 'text-white' : 'text-gray-400 group-hover:text-blue-600'}`} />
                            Common Prompt
                        </div>
                    </button>
                    
                    {/* My Library */}
                    <button onClick={() => setView('myLibrary')}
                        className={`w-full flex items-center justify-between p-4 rounded-xl transition-all group ${activeFilters.view === 'myLibrary' ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-gray-50 text-gray-700'}`}>
                        <div className="flex items-center font-semibold">
                            <Icon name="library-big" size={24} className={`mr-3 ${activeFilters.view === 'myLibrary' ? 'text-white' : 'text-gray-400 group-hover:text-blue-600'}`} />
                            My Library
                        </div>
                    </button>
                    
                    {/* My Favourite */}
                    <button onClick={() => setView('myFavorites')}
                        className={`w-full flex items-center justify-between p-4 rounded-xl transition-all group ${activeFilters.view === 'myFavorites' ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-gray-50 text-gray-700'}`}>
                        <div className="flex items-center font-semibold">
                            <Icon name="bookmark" size={24} className={`mr-3 ${activeFilters.view === 'myFavorites' ? 'text-white fill-white' : 'text-gray-400 group-hover:text-blue-600'}`} />
                            My Favourite
                        </div>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${activeFilters.view === 'myFavorites' ? 'bg-white text-blue-600' : 'bg-gray-100 text-gray-600'}`}>{savedCount}</span>
                    </button>
                </div>
            </div>
        </aside>
    );
});

export default Sidebar;