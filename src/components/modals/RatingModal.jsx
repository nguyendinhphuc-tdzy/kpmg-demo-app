import React, { useState, useEffect } from 'react';
import { BaseModal } from './BaseModal';
import { Icon } from '../Icon'; // (Lưu ý đường dẫn ../)

const RatingModal = React.memo(({ prompt, isOpen, onClose, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [optimization, setOptimization] = useState(0);
    const [comment, setComment] = useState("");

    useEffect(() => {
        if (isOpen && prompt) {
            setRating(prompt.stats.userRating || 0);
            setOptimization(0);
            setComment("");
        }
    }, [isOpen, prompt]);

    if (!isOpen || !prompt) return null;

    const handleSubmit = () => {
        onSubmit(prompt.id, rating, optimization, comment);
        onClose();
    };
    
    const modalTitle = `Feedback for: ${prompt.title}`;
    
const modalFooter = (
        <>
            <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-lg font-semibold text-sm text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
            >
                Cancel
            </button>
            <button
                onClick={handleSubmit}
                // Dùng bg-kpmg-blue
                className="px-5 py-2.5 rounded-lg font-semibold text-sm text-white bg-kpmg-blue hover:bg-kpmg-blue/90 transition-colors"
            >
                Submit Feedback
            </button>
        </>
    );
    
    return (
        <BaseModal 
            isOpen={isOpen} 
            onClose={onClose} 
            title={modalTitle} 
            footer={modalFooter}
            maxWidth="max-w-xl"
        >
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">How would you rate this prompt?</label>
                    <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setRating(star)}
                                className="p-1 rounded-full transition-colors"
                            >
                                <Icon 
                                    name="star" 
                                    size={32} 
                                    className={`transition-colors ${ (hoverRating || rating) >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300' }`} 
                                />
                            </button>
                        ))}
                    </div>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Optimization Percentage (Optional)</label>
                    <div className="flex items-center">
                        <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            step="5"
                            value={optimization}
                            onChange={(e) => setOptimization(e.target.value)}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="ml-4 w-12 text-right font-semibold text-blue-600">{optimization}%</span>
                    </div>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Additional Comments (Optional)</label>
                    <textarea 
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows="4" 
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="What worked well? What could be improved?"
                    ></textarea>
                </div>
            </div>
        </BaseModal>
    );
});

export default RatingModal;