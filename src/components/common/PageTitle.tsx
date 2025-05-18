import React from 'react';

interface PageTitleProps {
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
    <div className="py-12 text-center">
      <h1 className="text-[38.4px] font-bold text-[#31A7BC] uppercase tracking-wide">
        {title}
      </h1>
    </div>
  );
};

export default PageTitle;