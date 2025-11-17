import React from 'react';
import { Icon } from './Icon';
import { ALL_DEPARTMENTS, ALL_TASKS } from '../data/MockData';

const Sidebar = React.memo(({ activeFilters, setActiveFilters, isCollapsed, toggleSidebar, savedCount }) => {
    
    const setView = (viewName) => {
        setActiveFilters(prev => {
            if (viewName === 'public') return { ...prev, view: 'public', department: 'Partner', task: 'All Tasks' };
            if (viewName === 'common') return { ...prev, view: 'common', department: 'All Departments', task: 'All Tasks' };
            if (viewName === 'myLibrary' || viewName === 'myFavorites') return { ...prev, view: viewName, department: 'All Departments', task: 'All Tasks' };
            if (viewName === 'news') return { ...prev, view: 'news' };
            return { ...prev, view: viewName };
        });
    };
    
    const setFilter = (key, value) => {
        setActiveFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <aside 
            className={`${isCollapsed ? 'w-20 px-2' : 'w-64 xl:w-72 p-4'} bg-white border-r border-gray-200 flex-shrink-0 transition-all duration-300 flex flex-col z-20 h-full`}
        >
            <div className={`flex items-center mb-6 lg:mb-10 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
                {!isCollapsed && (
                    <img src="/kpmglogo.jpg" alt="KPMG Logo" className="h-8 lg:h-10 w-auto object-contain" />
                )}
                <button onClick={toggleSidebar} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
                    <Icon name={isCollapsed ? "chevrons-right" : "chevrons-left"} size={20} />
                </button>
            </div>
            
            <div className={`flex-1 space-y-6 lg:space-y-8 overflow-y-auto scrollbar-hide ${isCollapsed ? 'hidden' : 'block'}`}>
                
                {/* Filters */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Department</label>
                        <div className="relative">
                            <select className="w-full p-2.5 pl-3 pr-8 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-kpmg-blue focus:border-kpmg-blue outline-none transition-all font-medium text-gray-700 truncate"
                                value={activeFilters.department} 
                                onChange={(e) => setFilter('department', e.target.value)}
                                disabled={activeFilters.view === 'common'}
                            >
                                {ALL_DEPARTMENTS.filter(dept => dept !== 'All Departments').map(dept => <option key={dept} value={dept}>{dept}</option>)}
                            </select>
                            <Icon name="chevron-down" size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Task</label>
                        <div className="relative">
                            <select className="w-full p-2.5 pl-3 pr-8 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-kpmg-blue focus:border-kpmg-blue outline-none transition-all font-medium text-gray-700 truncate"
                                value={activeFilters.task} 
                                onChange={(e) => setFilter('task', e.target.value)}
                            >
                                {ALL_TASKS.map(task => <option key={task} value={task}>{task}</option>)}
                            </select>
                            <Icon name="chevron-down" size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                </div>
                
                {/* Menu Buttons */}
                <div className="pt-6 border-t border-gray-100 space-y-2">
                    {[
                        { id: 'news', label: 'News & Updates', icon: 'newspaper' },
                        { id: 'public', label: 'Prompt Library', icon: 'layout-grid' },
                        { id: 'common', label: 'Common Prompt', icon: 'layers' },
                        { id: 'myLibrary', label: 'My Library', icon: 'library-big' },
                        { id: 'myFavorites', label: 'My Favourite', icon: 'bookmark', count: savedCount }
                    ].map(item => (
                        <button 
                            key={item.id}
                            onClick={() => setView(item.id)}
                            className={`w-full flex items-center justify-between p-3 rounded-xl transition-all group text-sm lg:text-base ${activeFilters.view === item.id ? 'bg-kpmg-blue text-white shadow-md' : 'hover:bg-gray-50 text-gray-700'}`}
                        >
                            <div className="flex items-center font-semibold truncate">
                                <Icon name={item.icon} size={20} className={`mr-3 flex-shrink-0 ${activeFilters.view === item.id ? 'text-white' : 'text-gray-400 group-hover:text-kpmg-blue'}`} />
                                {item.label}
                            </div>
                            {item.count !== undefined && (
                                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ml-2 ${activeFilters.view === item.id ? 'bg-white text-kpmg-blue' : 'bg-gray-100 text-gray-600'}`}>{item.count}</span>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </aside>
    );
});

export default Sidebar;