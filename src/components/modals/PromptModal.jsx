import React, { useState, useEffect } from 'react';
import { Icon } from '../Icon'; // (Lưu ý đường dẫn ../)
import { useToast } from '../../context/ToastContext'; // (Lưu ý đường dẫn ../../)
import { marked } from 'marked'; // (Import từ npm)

const PromptModal = React.memo(({ prompt, isOpen, onClose, onToggleSave }) => {
    const [activeTab, setActiveTab] = React.useState('description');
    const [currentTemplate, setCurrentTemplate] = React.useState('');
    const showToast = useToast();
    
    const isPublicPrompt = prompt?.status === 'public';

    React.useEffect(() => {
        if (prompt) {
            setCurrentTemplate(prompt.template);
            setActiveTab(isPublicPrompt ? 'description' : 'prompt');
        }
    }, [prompt, isPublicPrompt]);

    const fallbackCopyTextToClipboard = (text) => {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                showToast("Copied prompt successfully!", "success");
            } else {
                showToast("Could not copy automatically. Please try again.", "error");
            }
        } catch (err) {
            console.error('Fallback copy failed', err);
            showToast("Error while copying.", "error");
        }
        document.body.removeChild(textArea);
    };

    const handleDirectCopy = () => {
         if (navigator.clipboard && navigator.clipboard.writeText) {
             navigator.clipboard.writeText(currentTemplate)
                 .then(() => {
                     showToast("Copied prompt successfully!", "success");
                 })
                 .catch(err => {
                     console.warn("Clipboard API failed, trying fallback...", err);
                     fallbackCopyTextToClipboard(currentTemplate);
                 });
         } else {
             fallbackCopyTextToClipboard(currentTemplate);
         }
    };

    if (!isOpen || !prompt) return null;
    
    const tabs = isPublicPrompt 
         ? [
             { id: 'description', label: 'Description', icon: 'info' },
             { id: 'prompt', label: 'Prompt', icon: 'terminal-square' },
             { id: 'example', label: 'Example Result', icon: 'file-json-2' }
           ]
         : [
             { id: 'prompt', label: 'Prompt', icon: 'terminal-square' },
             { id: 'example', label: 'Example Result', icon: 'file-json-2' }
           ];
    
    return (
        <>
        <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40 p-4 animate-fade-in" 
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-slide-up">
                
                <div className="flex justify-between items-start p-6 border-b">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">{prompt.title}</h2>
                        <p className="text-gray-500 mt-1">{prompt.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={(e) => { e.stopPropagation(); onToggleSave(prompt.id); }} className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${prompt.isSaved ? 'text-blue-600' : 'text-gray-400'}`} title={prompt.isSaved ? "Remove from My Prompts" : "Save to My Prompts"}>
                            <Icon name="bookmark" size={24} className={prompt.isSaved ? 'fill-blue-600' : ''} />
                        </button>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors"><Icon name="x" size={24} /></button>
                    </div>
                </div>
                <div className="flex border-b px-6 bg-gray-50 overflow-x-auto scrollbar-hide">
                    {tabs.map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center py-4 px-6 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${activeTab === tab.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                            <Icon name={tab.icon} size={18} className="mr-2" />{tab.label}
                        </button>
                    ))}
                </div>
                <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                    {activeTab === 'description' && (
                        <div className="space-y-6 animate-fade-in">
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h3 className="text-sm font-semibold text-blue-800 uppercase tracking-wider mb-3 flex items-center">
                                    <Icon name="target" size={16} className="mr-2" /> Objectives
                                </h3>
                                {/* === THÊM CLASS 'whitespace-pre-line' VÀO ĐÂY === */}
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{prompt.details?.value || "N/A"}</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                    <h3 className="text-sm font-semibold text-green-700 uppercase tracking-wider mb-3 flex items-center"><Icon name="trending-up" size={16} className="mr-2" /> Benefits</h3>
                                    {/* === THÊM CLASS 'whitespace-pre-line' VÀO ĐÂY === */}
                                    <p className="text-gray-700 whitespace-pre-line">{prompt.details?.benefit || "N/A"}</p>
                                </div>
                                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                    <h3 className="text-sm font-semibold text-purple-700 uppercase tracking-wider mb-3 flex items-center">
                                        <Icon name="book-open" size={16} className="mr-2" /> How to use
                                    </h3>
                                    {/* === THÊM CLASS 'whitespace-pre-line' VÀO ĐÂY === */}
                                    <p className="text-gray-700 whitespace-pre-line">{prompt.details?.whenToUse || "N/A"}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === 'prompt' && (
                        <div className="h-full flex flex-col animate-fade-in">
                            <div className="flex-1 flex flex-col">
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-sm font-semibold text-gray-700">Completed Prompt Template</label>
                                    <button onClick={() => setCurrentTemplate(prompt.template)} className="text-xs text-blue-600 hover:underline">Reset to original</button>
                                </div>
                                <div className="flex-1 bg-white p-4 rounded-xl border border-gray-300 font-mono text-sm text-gray-800 overflow-y-auto whitespace-pre-wrap select-none">{currentTemplate}</div>
                            </div>
                            
                            <button 
                               onClick={handleDirectCopy}
                               className="mt-6 w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-transform active:scale-[0.99] flex items-center justify-center shadow-md"
                            >
                                <Icon name="copy" className="mr-2" />
                                Copy Prompt
                            </button>
                        </div>
                    )}
                    {activeTab === 'example' && (
                        <div className="h-full flex flex-col animate-fade-in">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-gray-700 font-semibold">Sample Output</h3>
                            </div>
                            <div 
                                 className="flex-1 bg-gray-900 rounded-xl p-6 overflow-y-auto shadow-inner text-gray-100 font-mono text-sm whitespace-pre-wrap"
                                 dangerouslySetInnerHTML={{ __html: marked.parse(prompt.exampleResult || "// No example result available yet.") }}
                             >
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </>
    );
});

export default PromptModal;