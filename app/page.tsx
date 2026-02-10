'use client';
import Link from 'next/link';
import React, { useState } from 'react';

export default function Home() {

     return (
          <>
               <div className="p-4 border-b-2">
                    <h2 className="text-red-600 text-xl font-bold">KCSE REVISION EDUCATION MATERIALS</h2>
                    <div className="text-gray-700 font-bold mt-2 pb-4">REVISION EDUCATION MATERIALS</div>

                    <ul className="list-disc pl-6 mt-4 space-y-3">
                         <li><Link href="/secondary" className="text-blue-800 underline hover:text-blue-600">2025 FORM 2 3 4 REVISION RESOURCES</Link></li>
                         <li><Link href="/grade78Resources" className="text-blue-800 underline hover:text-blue-600">2025 GRADE 7 8 9 CBC JUNIOR SEC. RESOURCES</Link></li>
                         <li><Link href="/grade1to6Resources" className="text-blue-800 underline hover:text-blue-600">2025 GRADE 1 2 3 4 5 6 CBC RESOURCES</Link></li>
                         <li><Link href="/cbc" className="text-blue-800 underline hover:text-blue-600">2025 PP1 PP2 CBC RESOURCES</Link></li>
                         <li>PLAYGROUP/BABYCLASS</li>
                    </ul>
               </div>
               <div>
                    <h2 className="text-red-600 text-xl font-bold mt-6 border-b-2">
                         A. HIGH SCHOOL RESOURCES - <span className="text-sm">Revision Education materials</span>
                    </h2>

                    <ol className="list-decimal pl-6 mt-4 space-y-2 pb-4">
                         <li>
                              <Link href="/quizes/senior" className="text-blue-800 text-sm font-serif font-bold underline">
                                   FORM 2 3 4 TERM 1 2 3 OPENER, MID AND END TERM EXAMS
                              </Link>
                         </li>
                         <li>
                              <Link href="/kcse" className="text-blue-800 text-sm font-serif font-bold underline">
                                   1995-2025 KCSE KNEC PAPERS QUESTIONS ANSWERS AND REPORT
                              </Link>
                         </li>
                         <li>
                              <Link href="/mocks" className="text-blue-800 text-sm font-serif font-bold underline">
                                   2008-2025 KCSE FORM 4 COUNTY MOCKS
                              </Link>
                         </li>
                         <li>
                              <Link href="/schemes" className="text-blue-800 text-sm font-serif font-bold underline">
                                   FORM 2 3 4 SCHEMES OF WORK
                              </Link>
                         </li>
                         <li>
                              <Link href="/lesson-plans" className="text-blue-800 text-sm font-serif font-bold underline">
                                   FORM 2 3 4 LESSON PLANS
                              </Link>
                         </li>
                         <li>
                              <Link href="/form1234-notes" className="text-blue-800 text-sm font-serif font-bold underline">
                                   FORM 2 3 4 CLASS REVISION NOTES
                              </Link>
                         </li>
                         <li>
                              <Link href="/assignments" className="text-blue-800 text-sm font-serif font-bold underline">
                                   FORM 2 3 4 TERM 1 2 3 HOLIDAY ASSIGNMENTS
                              </Link>
                         </li>
                         <li>
                              <Link href="/setbook-guides" className="text-blue-800 text-sm font-serif font-bold underline">
                                   FORM 3 4 SETBOOKS STUDY GUIDES
                              </Link>
                         </li>
                         <li>
                              <Link href="/topic-tests" className="text-blue-800 text-sm font-serif font-bold underline">
                                   FORM 2 3 4 TOPICAL TESTS
                              </Link>
                         </li>
                         <li>
                              <Link href="/revision-booklets" className="text-blue-800 text-sm font-serif font-bold underline">
                                   FORM 2 3 4 REVISION BOOKLETS
                              </Link>
                         </li>
                         <li>
                              <Link href="/lifeskills" className="text-blue-800 text-sm font-serif font-bold underline">
                                   LIFE SKILLS NOTES
                              </Link>
                         </li>
                         <li>
                              <span className="text-gray-600 text-sm font-serif font-bold">
                                   FORM 2 3 4 SYLLABUS (Coming Soon)
                              </span>
                         </li>
                         <li>
                              <span className="text-gray-600 text-sm font-serif font-bold">
                                   KENYA SCHOOL CODES (Coming Soon)
                              </span>
                         </li>
                         <li>
                              <span className="text-gray-600 text-sm font-serif font-bold">
                                   HOW TO REVISE AND PASS EXAMS (Coming Soon)
                              </span>
                         </li>
                         <li>
                              <span className="text-gray-600 text-sm font-serif font-bold">
                                   GUIDANCE AND COUNSELLING NOTES (Coming Soon)
                              </span>
                         </li>
                    </ol>

                    <Link href="/subscribe" className=" p-0 mt-6 text-blue-800 underline font-bold">
                         GET UNLIMITED ACCESS NOW - ALL SECONDARY RESOURCES
                    </Link>
               </div>
               <h2 className=" border-b-2 text-red-600 text-xl font-bold mt-6 pb-2">
                    GRADE 7, 8 AND 9 JUNIOR SECONDARY RESOURCES
               </h2>
               <div className='border-b-2 pb-4'>
                    <h2 className='text-normal font-light text-black '>
                         GRADE 9 JUNIOR SECONDARY RESOURCES
                    </h2>
                    <ol className='list-decimal pl-6 mt-4 space-y-2'>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/schemes/grade-8">GRADE 9 SCHEMES OF WORK</Link>
                         </li>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/quizes/senior/grade-9">GRADE 9 EXAMS</Link>
                         </li>
                         <li className='text-gray-600 font-bold text-sm font-serif'>
                              <span>GRADE 9 ASSIGNMENTS (Coming Soon)</span>
                         </li>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/grade78Resources/Notes">GRADE 9 NOTES</Link>
                         </li>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/lesson-plans/grade-8">GRADE 9 LESSON PLANS</Link>
                         </li>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/grade78Resources/curriculum-grade8">GRADE 9 CURRICULUM DESIGNS</Link>
                         </li>
                    </ol>
               </div>
               <div className='border-b-2 pb-4'>
                    <h2 className='text-normal font-light text-black '>
                         GRADE 8 JUNIOR SECONDARY RESOURCES
                    </h2>
                    <ol className='list-decimal pl-6 mt-4 space-y-2'>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/schemes/grade-8">GRADE 8 SCHEMES OF WORK</Link>
                         </li>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/quizes/junior/grade-8">GRADE 8 EXAMS</Link>
                         </li>
                         <li className='text-gray-600 font-bold text-sm font-serif'>
                              <span>GRADE 8 ASSIGNMENTS (Coming Soon)</span>
                         </li>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/grade78Resources/Notes">GRADE 8 NOTES </Link>
                         </li>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/lesson-plans/grade-8">GRADE 8 LESSON PLANS</Link>
                         </li>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/grade78Resources/curriculum-grade8">GRADE 8 CURRICULUM DESIGNS</Link>
                         </li>
                         <li className='text-gray-600 font-bold text-sm font-serif'>
                              <span>GRADE 8 ASSESSMENT AND SCORESHEET (Coming Soon)</span>
                         </li>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/quizes/junior/grade-8">GRADE 8 TERM 1 2 3 OPENER MID END EXAMS</Link>
                         </li>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/schemes/grade-8">2024 GRADE 8 TERM 1 2 3 SCHEMES OF WORK</Link>
                         </li>
                    </ol>
               </div>
               <div className='border-b-2 pb-4'>
                    <h2 className='text-normal font-light text-black '>
                         GRADE 7 JUNIOR SECONDARY RESOURCES
                    </h2>
                    <ol className='list-decimal pl-6 mt-4 space-y-2'>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/schemes/grade-7">GRADE 7 SCHEMES OF WORK</Link>
                         </li>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/quizes/junior/grade-7">GRADE 7 EXAMS</Link>
                         </li>
                         <li className='text-gray-600 font-bold text-sm font-serif'>
                              <span>2024 GRADE 7 JSS ASSIGNMENTS TERM 1 2 3 (Coming Soon)</span>
                         </li>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/grade78Resources/Notes">GRADE 7 NOTES</Link>
                         </li>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/lesson-plans/grade-7">GRADE 7 LESSON PLANS</Link>
                         </li>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/grade78Resources/curriculum-grade7">GRADE 7 CURRICULUM DESIGNS</Link>
                         </li>
                         <li className='text-gray-600 font-bold text-sm font-serif'>
                              <span>GRADE 7 ASSESSMENT AND SCORESHEET (Coming Soon)</span>
                         </li>

                    </ol>

               </div>
               <h2 className="text-red-600 text-xl font-bold mt-6 border-b-2 pb-4">
                    GRADE  1 2 3 4 5 6 CBC RESOURCES
               </h2>
               <div className='border-b-2 pb-4'>
                    <h2 className='text-normal font-light text-black '>
                         GRADE 6 CBC REVISION RESOURCES
                    </h2>
                    <ol className='list-decimal pl-6 mt-4 space-y-2'>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/schemes/grade-6">GRADE 6 SCHEMES OF WORK</Link>
                         </li>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/quizes/elementary/grade-6">GRADE 6 EXAMS</Link>
                         </li>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/grade123456Revision/holidayAssignment">GRADE 6 ASSIGNMENTS</Link>
                         </li>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/grade123456Revision/Notes">GRADE 6 NOTES</Link>
                         </li>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/lesson-plans/grade-6">GRADE 6 LESSON PLANS</Link>
                         </li>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/grade1to6Resources/curriculum">GRADE 6 CURRICULUM DESIGNS</Link>
                         </li>

                    </ol>
               </div>
               <div className='border-b-2 pb-4'>
                    <h2 className='text-normal font-light text-black '>
                         GRADE 5 CBC REVISION RESOURCES
                    </h2>
                    <ol className='list-decimal pl-6 mt-4 space-y-2'>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/schemes/grade-5">GRADE 5 SCHEMES OF WORK</Link>
                         </li>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/grade123456Revision/exams">GRADE 5 EXAMS</Link>
                         </li>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/grade123456Revision/holidayAssignment">GRADE 5 ASSIGNMENTS</Link>
                         </li>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/grade123456Revision/Notes">GRADE 5 NOTES</Link>
                         </li>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/lesson-plans/grade-5">GRADE 5 LESSON PLANS</Link>
                         </li>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/grade1to6Resources/curriculum">GRADE 5 CURRICULUM DESIGNS</Link>
                         </li>
                    </ol>
               </div>
               <div className='border-b-2 pb-4'>
                    <h2 className='text-normal font-light text-black '>
                         GRADE 4 CBC REVISION RESOURCES
                    </h2>
                    <ol className='list-decimal pl-6 mt-4 space-y-2'>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/schemes/grade-4">GRADE 4 SCHEMES OF WORK</Link>
                         </li>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/grade123456Revision/exams">GRADE 4 EXAMS</Link>
                         </li>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/grade123456Revision/holidayAssignment">GRADE 4 ASSIGNMENTS</Link>
                         </li>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/grade123456Revision/Notes">GRADE 4 NOTES</Link>
                         </li>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/lesson-plans/grade-4">GRADE 4 LESSON PLANS</Link>
                         </li>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/grade1to6Resources/curriculum">GRADE 4 CURRICULUM DESIGNS</Link>
                         </li>
                    </ol>
               </div>
               <div className='border-b-2 pb-4'>
                    <h2 className='text-normal font-light text-black '>
                         GRADE 3 CBC REVISION RESOURCES
                    </h2>
                    <ol className='list-decimal pl-6 mt-4 space-y-2'>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/schemes/grade-3">GRADE 3 SCHEMES OF WORK</Link>
                         </li>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/grade123456Revision/exams">GRADE 3 EXAMS</Link>
                         </li>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/grade123456Revision/holidayAssignment">GRADE 3 ASSIGNMENTS</Link>
                         </li>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/grade123456Revision/Notes">GRADE 3 NOTES</Link>
                         </li>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/lesson-plans/grade-3">GRADE 3 LESSON PLANS</Link>
                         </li>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/grade1to6Resources/curriculum">GRADE 3 CURRICULUM DESIGNS</Link>
                         </li>
                    </ol>
               </div>
               <div className='border-b-2 pb-4'>
                    <h2 className='text-normal font-light text-black '>
                         GRADE 2 CBC REVISION RESOURCES
                    </h2>
                    <ol className='list-decimal pl-6 mt-4 space-y-2'>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/schemes/grade-2">GRADE 2 SCHEMES OF WORK</Link>
                         </li>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/grade123456Revision/exams">GRADE 2 EXAMS</Link>
                         </li>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/grade123456Revision/holidayAssignment">GRADE 2 ASSIGNMENTS</Link>
                         </li>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/grade123456Revision/Notes">GRADE 2 NOTES</Link>
                         </li>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/lesson-plans/grade-2">GRADE 2 LESSON PLANS</Link>
                         </li>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/grade1to6Resources/curriculum">GRADE 2 CURRICULUM DESIGNS</Link>
                         </li>
                    </ol>
               </div>
               <div className='border-b-2 pb-4'>
                    <h2 className='text-normal font-light text-black '>
                         GRADE 1 CBC REVISION RESOURCES
                    </h2>
                    <ol className='list-decimal pl-6 mt-4 space-y-2'>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/schemes/grade-1">GRADE 1 SCHEMES OF WORK</Link>
                         </li>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/grade123456Revision/exams">GRADE 1 EXAMS</Link>
                         </li>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/grade123456Revision/holidayAssignment">GRADE 1 ASSIGNMENTS</Link>
                         </li>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/grade123456Revision/Notes">GRADE 1 NOTES</Link>
                         </li>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/lesson-plans/grade-1">GRADE 1 LESSON PLANS</Link>
                         </li>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/grade1to6Resources/curriculum">GRADE 1 CURRICULUM DESIGNS</Link>
                         </li>
                    </ol>
               </div>
               <div className='pb-4 border-b-2 '>
                    <h2 className='text-xl font-bold mt-6  text-black underline'>
                         PRE-PRIMARY 1 2- REVISION RESOURCES + PLAYGROUP
                    </h2>
                    <span className='text-x-sm font-light '>REVISION EDUCATION MATERIALS</span>
               </div>
               <div className='border-b-2 pb-4'>
                    <ul className='list-bullets space-y-2'>
                         <li className='text-blue-800 underline font-semibold text-sm font-serif'>
                              <Link href="/cbc">Pre-primary 1 And 2  KICD Approved syllabus </Link>
                         </li>
                         <li className='text-blue-800 underline font-semibold text-sm font-serif'>
                              <Link href="/schemes/pp1">C.B.C 2025 TERM 1 2 3 Pre-primary 1 Schemes of work </Link>
                         </li>
                         <li className='text-blue-800 underline font-semibold text-sm font-serif'>
                              <Link href="/schemes/pp2">2025 TERM 1 2 3 Pre-primary 2 Schemes of work</Link>
                         </li>
                         <li className='text-blue-800 underline font-semibold text-sm font-serif'>
                              <Link href="/lesson-plans/pp1">Pre-primary 1 NOTES</Link>
                         </li>
                         <li className='text-blue-800 underline font-semibold text-sm font-serif'>
                              <Link href="/lesson-plans/pp2">P.P 2 NOTES </Link>
                         </li>
                         <li className='text-blue-800 underline font-bold text-sm font-serif'>
                              <Link href="/quizes/elementary">2025 PP1, PP2 TERM 1,2,3 MID/END TERM EXAMS QUE AND ANSWERS </Link>
                         </li>
                         <li className='text-black'>
                              And <Link className='text-blue-800 underline font-bold text-sm font-serif' href="/cbc">K.I.C.D. Competency Based Curriculum Design Materials</Link>
                         </li>
                         <li className='text-black underline font-bold text-sm font-serif'>
                              <Link href="/cbc">PP12 CBC ASSESSMENT TOOLS- ASSESSMENT BOOK TEMPLATE</Link>
                         </li>
                         <li className='text-black underline font-bold text-sm font-serif'>
                              <Link href="/cbc">PP 1,2 CBC ASSESSMENT TOOLS- RECORD OF WORK TEMPLATE</Link>
                         </li>
                         <li className='text-black underline font-bold text-sm font-serif'>
                              <Link href="/cbc">PP 1&2 CBC ASSESSMENT TOOLS- REPORT CARD TEMPLATE</Link>
                         </li>
                         <li className='text-black underline font-bold text-sm font-serif'>
                              <Link href="/cbc">SCHOOL YEAR REPORT FOR EARLY YEARS OF EDUCATION</Link>
                         </li>
                         <li className='text-black underline font-bold text-sm font-serif'>
                              <Link href="/cbc">CBC ASSESSMENT RUBRIC</Link>
                         </li>
                    </ul>

               </div>
               <Link href="/subscribe" className='text-blue-800 pl-12 text-center underline font-bold text-xl pb-2'>GET UNLIMITED ACCESS NOW</Link>

          </>
     );
}