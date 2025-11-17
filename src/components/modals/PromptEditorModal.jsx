import React, { useState, useEffect } from 'react';
import { BaseModal } from './BaseModal';
import { ALL_DEPARTMENTS, ALL_TASKS } from '../../data/MockData'; // (Lưu ý đường dẫn ../../)

const PromptEditorModal = React.memo(({ prompt, isOpen, onClose, onSave }) => {
    // `prompt` is {} (new) or {prompt} (edit)
    
    const [formData, setFormData] = React.useState({
        id: undefined,
        title: '',
        description: '',
        tags: {
            department: 'All Departments',
            task: 'Analysis',
        },
        template: '',
        details: { value: '', benefit: '', whenToUse: '' },
        exampleResult: '' // State này đã tồn tại
    });
    
    React.useEffect(() => {
        if (isOpen) {
            // Populate form with existing prompt data or defaults for a new prompt
            setFormData({
                id: prompt?.id || undefined,
                title: prompt?.title || '',
                description: prompt?.description || '',
                tags: prompt?.tags || { department: 'All Departments', task: 'Analysis' },
                template: prompt?.template || '',
                details: prompt?.details || { value: '', benefit: '', whenToUse: '' },
                exampleResult: prompt?.exampleResult || '' // Đã được load vào state
            });
        }
    }, [isOpen, prompt]);
    
    if (!isOpen) return null; // Guard clause

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleTagChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            tags: { ...prev.tags, [name]: value }
        }));
    };
    
    const handleSave = () => {
        // FormData now contains all fields (edited and preserved)
        onSave(formData);
    };

    const isNew = !prompt?.id;
    
    // Define Title and Footer for BaseModal
    const modalTitle = (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                {isNew ? 'Create New Prompt' : 'Edit Prompt'}
            </h2>
            <p className="text-gray-500 mt-1">
                {isNew ? 'This prompt will be saved privately to your library.' : 'Changes will be saved to your private prompt.'}
            </p>
        </div>
    );

    const modalFooter = (
        <>
            <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-lg font-semibold text-sm text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
            >
                Cancel
            </button>
            <button
                onClick={handleSave}
                className="px-5 py-2.5 rounded-lg font-semibold text-sm text-white bg-kpmg-blue hover:bg-kpmg-blue/90 transition-colors"
            >
                {isNew ? 'Create Private Prompt' : 'Save Changes'}
            </button>
        </>
    );

    return (
        <BaseModal 
            isOpen={isOpen} 
            onClose={onClose} 
            title={modalTitle} 
            footer={modalFooter}
            maxWidth="max-w-2xl"
        >
            {/* Form content is passed as children */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prompt title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg"/>
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prompt description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full p-2 border border-gray-300 rounded-lg"></textarea>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department (Tags)</label>
                    <select name="department" value={formData.tags.department} onChange={handleTagChange} className="w-full p-2 border border-gray-300 rounded-lg bg-white">
                        {ALL_DEPARTMENTS.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Task (Tags)</label>
                    <select name="task" value={formData.tags.task} onChange={handleTagChange} className="w-full p-2 border border-gray-300 rounded-lg bg-white">
                        {ALL_TASKS.map(task => <option key={task} value={task}>{task}</option>)}
                    </select>
                </div>
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prompt details (Template)</label>
                <textarea name="template" value={formData.template} onChange={handleChange} rows="8" className="w-full p-2 border border-gray-300 rounded-lg font-mono text-sm"></textarea>
            </div>
            
            {/* === INPUT MỚI ĐÃ ĐƯỢC THÊM VÀO ĐÂY === */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sample Output (Expected result or format)</label>
                <textarea 
                    name="exampleResult" 
                    value={formData.exampleResult} 
                    onChange={handleChange} 
                    rows="8" 
                    className="w-full p-2 border border-gray-300 rounded-lg font-mono text-sm bg-gray-900 text-gray-100"
                    placeholder={`{\n  "key": "value",\n  "example": "JSON or Markdown output"\n}`}
                ></textarea>
            </div>
            {/* ================================== */}

        </BaseModal>
    );
});

export default PromptEditorModal;