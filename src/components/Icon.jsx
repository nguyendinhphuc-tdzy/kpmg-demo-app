import React from 'react';
import { icons } from 'lucide-react';

// Helper để chuyển 'kebab-case' (ví dụ: 'edit-3') 
// thành 'PascalCase' ('Edit3') mà lucide-react cần.
const toPascalCase = (str) => {
  return str.replace(/(^\w|-\w)/g, (match) => 
    match.replace('-', '').toUpperCase()
  );
};

// Đây là component Icon của bạn, đã được điều chỉnh
export const Icon = ({ name, ...props }) => {
  const iconName = toPascalCase(name);
  const LucideIcon = icons[iconName];

  if (!LucideIcon) {
    console.warn(`Icon "${name}" (dưới dạng "${iconName}") không tìm thấy.`);
    return null; // Hoặc trả về một icon mặc định
  }

  // <Star {...props} />
  return <LucideIcon {...props} />;
};