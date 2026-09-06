// components/IGCSESection.tsx

import { BookOpen } from 'lucide-react';
import Link from 'next/link';

const IGCSESection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 pl-4">
         <Link
            
              href="/quizes/igcse"
              className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
            >
                <BookOpen size={16} className="text-foreground" />
              IGCSE WEEKLY QUIZES
            </Link>
            <Link
            
            href="/quizes/elementary"
            className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
          >
              <BookOpen size={16} className="text-foreground" />
            ELEMENTARY SCHOOL WEEKLY QUIZES
          </Link>
            <Link
            
              href="/quizes/junior"
              className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
            >
                <BookOpen size={16} className="text-foreground" />
              JUNIOR SECONDARY SCHOOL WEEKLY QUIZES
            </Link>
            <Link
            
            href="/quizes/senior"
            className="p-3 text-gray-950 font-semibold bg-slate-100 hover:bg-purple-500 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center gap-2"
          >
              <BookOpen size={16} className="text-foreground" />
            SENIOR SECONDARY SCHOOL WEEKLY QUIZES
          </Link>
    </div>
  );
};

export default IGCSESection;
