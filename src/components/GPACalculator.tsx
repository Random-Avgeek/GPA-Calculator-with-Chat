import React, { useState } from 'react';
import { Calculator, Plus, Trash2 } from 'lucide-react';
import { Subject } from '../types';

interface GPACalculatorProps {
  className?: string;
}

const GPACalculator: React.FC<GPACalculatorProps> = ({ className = '' }) => {
  const [subjects, setSubjects] = useState<Subject[]>([
    { grade: 'S', credits: 3 }
  ]);
  const [gpa, setGpa] = useState<number | null>(null);
  const [cgpa, setCgpa] = useState<number | null>(null);
  const [ongoingCgpa, setOngoingCgpa] = useState<string>('');
  const [completedSemesters, setCompletedSemesters] = useState<string>('');
  const [calculating, setCalculating] = useState<boolean>(false);

  const gradePoints: { [key: string]: number } = {
    'S': 10, 'A': 9, 'B': 8, 'C': 7, 'D': 6, 'E': 5, 'F': 0
  };

  const addSubject = () => {
    setSubjects([...subjects, { grade: 'S', credits: 3 }]);
  };

  const removeSubject = (index: number) => {
    const newSubjects = [...subjects];
    newSubjects.splice(index, 1);
    setSubjects(newSubjects);
  };

  const updateSubject = (index: number, field: 'grade' | 'credits', value: string | number) => {
    const newSubjects = [...subjects];
    newSubjects[index] = { ...newSubjects[index], [field]: value };
    setSubjects(newSubjects);
  };

  const calculateGpa = () => {
    setCalculating(true);
    
    setTimeout(() => {
      let totalPoints = 0;
      let totalCredits = 0;

      subjects.forEach(subject => {
        const points = gradePoints[subject.grade] * subject.credits;
        totalPoints += points;
        totalCredits += subject.credits;
      });

      const calculatedGpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
      setGpa(parseFloat(calculatedGpa.toFixed(2)));

      if (ongoingCgpa && completedSemesters) {
        const prevTotalPoints = parseFloat(ongoingCgpa) * parseInt(completedSemesters);
        const calculatedCgpa = (prevTotalPoints + calculatedGpa) / (parseInt(completedSemesters) + 1);
        setCgpa(parseFloat(calculatedCgpa.toFixed(2)));
      } else {
        setCgpa(null);
      }
      
      setCalculating(false);
    }, 400); // Small delay for animation effect
  };

  const getCgpaColorClass = (value: number) => {
    if (value >= 9) return 'bright-green';
    if (value >= 8) return 'dark-green';
    if (value >= 6) return 'yellow';
    if (value >= 5) return 'orange';
    return 'red';
  };

  return (
    <div className={`bg-gray-900 bg-opacity-85 backdrop-blur-sm rounded-xl shadow-2xl p-6 md:p-8 ${className}`}>
      <div className="flex items-center justify-center mb-6">
        <Calculator className="text-yellow-400 mr-2" size={28} />
        <h1 className="text-2xl font-bold text-yellow-400">GPA Calculator</h1>
      </div>

      <div className="space-y-4">
        {subjects.map((subject, index) => (
          <div key={index} className="p-3 rounded-lg bg-gray-800 bg-opacity-60">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white text-sm font-medium">Subject {index + 1}</span>
              {subjects.length > 1 && (
                <button 
                  onClick={() => removeSubject(index)}
                  className="text-red-400 hover:text-red-300 transition flex items-center text-xs"
                >
                  <Trash2 size={14} className="mr-1" /> Remove
                </button>
              )}
            </div>
            
            <div className="flex gap-2">
              <select
                value={subject.grade}
                onChange={(e) => updateSubject(index, 'grade', e.target.value)}
                className="bg-gray-700 border border-gray-600 text-white rounded px-3 py-2 flex-1 focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none"
              >
                {Object.keys(gradePoints).map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
              
              <input
                type="number"
                min="1"
                max="5"
                value={subject.credits}
                onChange={(e) => updateSubject(index, 'credits', parseInt(e.target.value) || 0)}
                className="bg-gray-700 border border-gray-600 text-white rounded px-3 py-2 w-24 focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none"
                placeholder="Credits"
              />
            </div>
          </div>
        ))}
      </div>
      
      <button 
        onClick={addSubject}
        className="mt-4 w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-600 transition flex items-center justify-center"
      >
        <Plus size={16} className="mr-1" /> Add Subject
      </button>
      
      <div className="mt-6 pt-6 border-t border-gray-700">
        <div className="space-y-4">
          <h2 className="text-yellow-400 text-lg font-medium">Previous CGPA (Optional)</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-gray-300 text-sm mb-1">Ongoing CGPA</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                value={ongoingCgpa}
                onChange={(e) => setOngoingCgpa(e.target.value)}
                className="bg-gray-700 border border-gray-600 text-white rounded px-3 py-2 w-full focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none"
                placeholder="e.g., 8.5"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-300 text-sm mb-1">Completed Semesters</label>
              <input
                type="number"
                min="0"
                value={completedSemesters}
                onChange={(e) => setCompletedSemesters(e.target.value)}
                className="bg-gray-700 border border-gray-600 text-white rounded px-3 py-2 w-full focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none"
                placeholder="e.g., 4"
              />
            </div>
          </div>
        </div>
      </div>
      
      <button 
        onClick={calculateGpa}
        disabled={calculating}
        className={`mt-6 w-full bg-gradient-to-r from-purple-700 to-indigo-800 text-white py-3 rounded-lg font-bold 
          hover:from-purple-600 hover:to-indigo-700 transform transition-all duration-300 shadow-lg
          ${calculating ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02]'}`}
      >
        {calculating ? 'Calculating...' : 'Calculate GPA'}
      </button>
      
      {gpa !== null && (
        <div className="mt-6 p-5 bg-gray-800 bg-opacity-60 rounded-lg animate-fade-in">
          <div className="text-gray-300 mb-2">Semester GPA</div>
          <div className="text-3xl font-bold text-yellow-400">{gpa.toFixed(2)}</div>
          
          {cgpa !== null && (
            <div className="mt-4">
              <div className="text-gray-300 mb-2">Cumulative GPA</div>
              <div className={`text-3xl font-bold ${getCgpaColorClass(cgpa)}`}>
                {cgpa.toFixed(2)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GPACalculator;