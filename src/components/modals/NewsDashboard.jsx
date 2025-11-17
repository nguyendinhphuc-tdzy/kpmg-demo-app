import React from 'react';
import { Icon } from '../Icon'; // (Lưu ý đường dẫn ../)

const NewsDashboard = React.memo(({ isOpen, onClose, onOpenNews }) => {
    // --- DỮ LIỆU MOCK ĐÃ ĐƯỢC VIẾT LẠI CHUYÊN NGHIỆP ---
    const newsItems = [
        { 
          id: 1, 
          title: 'KPMG ranks #1 in Cybersecurity consulting', 
          date: 'Nov 12, 2025', 
          image: 'https://placehold.co/600x400/00338D/FFFFFF?text=KPMG+News&font=inter', 
          description: 'This recognition from Forrester Wave™ highlights our deep expertise in securing complex digital transformations. Read the full press release on our corporate site.',
          content: 'Our position as a leader is a testament to the dedication of our global cybersecurity professionals and our significant investment in next-generation security platforms. The report cited KPMG\'s "clear, ambitious strategy" and "strong integration of AI and risk management" as key differentiators.\n\nIn today\'s landscape, where threats are more sophisticated than ever, businesses require a partner who not only understands the technology but also the industry-specific regulatory pressures. Our holistic approach, from strategy to implementation, ensures clients can innovate confidently, knowing their assets are protected. This ranking validates our commitment to being that trusted partner.'
        }, 
        { 
          id: 2, 
          title: 'GenAI impact on Tax & Legal: A new report', 
          date: 'Nov 10, 2025', 
          image: 'https://placehold.co/600x400/002260/FFFFFF?text=GenAI+Report&font=inter',
          description: 'Our latest thought leadership report explores the profound impact of Generative AI on regulatory compliance and risk.',
          content: 'The rise of Generative AI presents both a monumental opportunity and a significant challenge for Tax and Legal departments. Our new report provides an in-depth analysis of how these technologies are set to reshape workflows, automate research, and enhance risk detection.\n\nHowever, it also explores the critical new risks, from data privacy and "hallucinations" in legal advice to the evolving regulatory scrutiny. We provide a practical framework for C-level executives to navigate this landscape, outlining key steps for responsible adoption, talent upskilling, and establishing a robust governance model to harness GenAI\'s power safely.' 
        }, 
        { 
          id: 3, 
          title: 'Our firm named "Best Place to Work" 2025', 
          date: 'Nov 09, 2025', 
          image: 'https://placehold.co/600x400/4c66ac/FFFFFF?text=Award&font=inter',
          description: 'This award is a testament to our firm\'s inclusive culture.',
          content: 'We are exceptionally proud to announce that KPMG has been recognized as a "Best Place to Work" for 2025. This achievement is not just an award; it is a reflection of our collective commitment to fostering an environment of trust, inclusion, and continuous learning.\n\nIt is our people who build this culture every day. This recognition is based on direct feedback from our employees, validating our significant investments in flexible work arrangements, comprehensive mental health resources, and transparent career development pathways. We believe that by taking care of our people, they are empowered to deliver the best possible results for our clients.' 
        }, 
        { 
          id: 4, 
          title: 'New Partner appointments announced', 
          date: 'Nov 08, 2025', 
          image: 'https://placehold.co/600x400/cccccc/FFFFFF?text=Partners&font=inter',
          description: 'Congratulations to our newly appointed Partners.',
          content: 'Their leadership, integrity, and deep industry expertise will be invaluable as we continue to grow and help our clients navigate complex challenges. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.'
        }, 
    ];
    // --- KẾT THÚC CẬP NHẬT DỮ LIỆU ---

    if (!isOpen) {
        return null;
    }

    return (
        // Lớp phủ nền mờ
        <div 
            className="fixed inset-0 bg-black/50 z-30 animate-fade-in"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            {/* Bảng điều khiển trượt ra (Drawer) */}
            <div className="fixed top-0 left-0 w-full max-w-md h-full bg-white shadow-xl flex flex-col animate-slide-in-left">
                {/* Header của Drawer */}
                <div className="p-6 border-b flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-blue-800">KPMG News & Insights</h2>
                        <p className="text-gray-500">The latest updates from our firm.</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
                        <Icon name="x" size={24} />
                    </button>
                </div>
                
                {/* Nội dung tin tức (có thể cuộn) */}
                <div className="divide-y divide-gray-100 overflow-y-auto flex-1">
                    {newsItems.map((item) => (
                        <button 
                            key={item.id} 
                            onClick={() => onOpenNews(item)} // Gọi onOpenNews với toàn bộ 'item'
                            className="flex items-center p-6 gap-5 hover:bg-gray-50 transition-colors group w-full text-left"
                        >
                            <img 
                                src={item.image}
                                alt={item.title}
                                className="w-32 h-24 object-cover rounded-lg flex-shrink-0 bg-gray-200"
                                onError={(e) => e.target.src = 'https://placehold.co/600x400/cccccc/999999?text=Image+Error&font=inter'}
                            />
                            <div className="flex-1">
                                <p className="text-sm text-gray-500 mb-1">{item.date}</p>
                                <h3 className="text-base font-semibold text-gray-900 line-clamp-2 mb-1 group-hover:text-blue-700 transition-colors">{item.title}</h3>
                                <span className="font-medium text-blue-600 text-sm opacity-0 group-hover:opacity-100 transition-opacity">Read more &rarr;</span>
                            </div>
                        </button>
                    ))}
                </div>
                
                {/* Footer của Drawer */}
                <div className="p-6 bg-gray-50 border-t text-center">
                    <button className="text-sm font-semibold text-blue-600 hover:underline">
                        View all news
                    </button>
                </div>
            </div>
            
            {/* Thêm animation cho việc trượt vào */}
            <style>
            {`
                @keyframes slideInLeft {
                    from { transform: translateX(-100%); }
                    to { transform: translateX(0); }
                }
                .animate-slide-in-left { animation: slideInLeft 0.3s ease-out; }
            `}
            </style>
        </div>
    );
});

export default NewsDashboard;