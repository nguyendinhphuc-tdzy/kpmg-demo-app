import React from 'react';
import { Icon } from './Icon'; // (Chúng ta sẽ tạo file Icon.jsx)
import { ALL_DEPARTMENTS, ALL_TASKS } from '../data/MockData';

// Component Sidebar (trích từ file kpmg.html, dòng 800)
const Sidebar = React.memo(({ activeFilters, setActiveFilters, isCollapsed, toggleSidebar, savedCount }) => {
           
           // HÀM SETVIEW (ĐÃ REFACTOR)
           const setView = (viewName) => {
               
               setActiveFilters(prev => {
                   const newFilters = { ...prev, view: viewName };
                   
                   // Logic mới
                   switch (viewName) {
                       case 'department':
                           // Mặc định "Prompt Library" (Department) là "Partner"
                           newFilters.departmentId = 'Partner';
                           newFilters.task = 'All Tasks';
                           break;
                       case 'common':
                           // Mặc định "Common"
                           newFilters.departmentId = null;
                           newFilters.task = 'All Tasks';
                           break;
                       case 'myLibrary':
                       case 'myFavorites':
                           // Reset filters cho view cá nhân
                           newFilters.departmentId = null; // Sẽ không lọc theo phòng ban trong view này
                           newFilters.task = 'All Tasks';
                           break;
                       case 'news':
                           // Giữ nguyên
                           break;
                   }
                   
                   return newFilters;
               });
           };
           
           // HÀM SETFILTER (ĐÃ REFACTOR)
           // Set Task
           const setTask = (task) => {
               setActiveFilters(prev => ({ ...prev, task }));
           };
           
           // Set Department (tự động chuyển view)
           const setDepartment = (deptId) => {
               setActiveFilters(prev => ({
                   ...prev,
                   view: 'department', // Tự động chuyển view sang 'department'
                   departmentId: deptId
               }));
           };

           return (
               <aside className={`${isCollapsed ? 'w-20 px-4' : 'w-80 p-6'} bg-white border-r border-gray-200 flex-shrink-0 transition-all duration-300 flex flex-col z-20`}>
                   <div className={`flex items-center mb-10 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
                       {!isCollapsed && (
                           <img src="kpmglogo.jpg" alt="KPMG Logo" className="h-10 w-auto object-contain"></img>)}
                       <button onClick={toggleSidebar} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
                           <Icon name={isCollapsed ? "chevrons-right" : "chevrons-left"} size={20} />
                       </button>
                   </div>
                   <div className={`flex-1 space-y-8 ${isCollapsed ? 'hidden' : 'block'}`}>
                       
                       {/* Filter dropdowns */}
                       <div className="space-y-2">
                           <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Department</label>

                           {/* === COMMON PROMPTS (ĐÃ REFACTOR) === */}
                           <button
                               onClick={() => setView('common')} // <-- THAY ĐỔI
                               className={`w-full flex items-center justify-center p-3 rounded-xl transition-all font-medium border ${
                                   activeFilters.view === 'common' // <-- THAY ĐỔI
                                   ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                                   : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                               }`}
                           >
                               <Icon name="layout-grid" size={18} className="mr-2" />
                               Common Prompts
                           </button>
                           {/* === END BUTTON === */}

                           <div className="relative">
                               <select className="w-full p-3 pl-4 pr-10 bg-white border border-gray-200 rounded-xl appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-700"
                                   value={activeFilters.view === 'department' ? activeFilters.departmentId : ''} // <-- THAY ĐỔI
                                   onChange={(e) => { if (e.target.value) { setDepartment(e.target.value) } }} // <-- THAY ĐỔI
                               >
                                   {/* === NEW PLACEHOLDER === */}
                                   <option value="" disabled>Or select a department...</option>

                                   {ALL_DEPARTMENTS.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                               </select>
                               <Icon name="chevron-down" size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                           </div>
                       </div>
                       <div className="space-y-2">
                           <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Task</label>
                           <div className="relative">
                               <select className="w-full p-3 pl-4 pr-10 bg-gray-50 border border-gray-200 rounded-xl appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-medium text-gray-700"
                                   value={activeFilters.task} 
                                   onChange={(e) => setTask(e.target.value)} // <-- THAY ĐỔI
                               >
                                   {ALL_TASKS.map(task => <option key={task} value={task}>{task}</option>)}
                               </select>
                               <Icon name="chevron-down" size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                           </div>
                       </div>
                       
                       {/* View buttons */}
                       <div className="pt-6 border-t border-gray-100 space-y-2">
                           
                           {/* Nút News & Updates */}
                           <button onClick={() => setView('news')}
                               className={`w-full flex items-center justify-between p-4 rounded-xl transition-all group ${activeFilters.view === 'news' ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-gray-50 text-gray-700'}`}>
                               <div className="flex items-center font-semibold">
                                   <Icon name="newspaper" size={24} className={`mr-3 ${activeFilters.view === 'news' ? 'text-white' : 'text-gray-400 group-hover:text-blue-600'}`} />
                                   News & Updates
                               </div>
                           </button>
                           {/* ===================== */}

                           {/* Prompt Library button (ĐÃ REFACTOR) */}
                           <button onClick={() => setView('department')} 
                               className={`w-full flex items-center justify-between p-4 rounded-xl transition-all group ${activeFilters.view === 'department' ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-gray-50 text-gray-700'}`}> {/* <-- THAY ĐỔI */}
                               <div className="flex items-center font-semibold">
                                   <Icon name="layout-grid" size={24} className={`mr-3 ${activeFilters.view === 'department' ? 'text-white' : 'text-gray-400 group-hover:text-blue-600'}`} /> {/* <-- THAY ĐỔI */}
                                   Prompt Library 
                               </div>
                           </button>
                           
                           {/* My Library button */}
                           <button onClick={() => setView('myLibrary')}
                               className={`w-full flex items-center justify-between p-4 rounded-xl transition-all group ${activeFilters.view === 'myLibrary' ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-gray-50 text-gray-700'}`}>
                               <div className="flex items-center font-semibold">
                                   <Icon name="library-big" size={24} className={`mr-3 ${activeFilters.view === 'myLibrary' ? 'text-white' : 'text-gray-400 group-hover:text-blue-600'}`} />
                                   My Library
                               </div>
                           </button>
                           
                           {/* My Favourite button */}
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