
import React from 'react';
import { cn } from "@/lib/utils";

interface ClassroomVisualizationProps {
  donationAmount: number | null;
  customAmount: string;
}

const ClassroomVisualization: React.FC<ClassroomVisualizationProps> = ({ 
  donationAmount,
  customAmount
}) => {
  // Calculate visual state based on donation amount
  const getVisualizationState = () => {
    const amount = donationAmount || (customAmount ? parseFloat(customAmount) : 0);
    
    if (amount >= 50) return 'complete';
    if (amount >= 25) return 'materials';
    if (amount >= 10) return 'students';
    if (amount >= 5) return 'supplies';
    return 'empty';
  };
  
  const state = getVisualizationState();
  
  return (
    <div className="classroom-container">
      <div className={cn(
        "classroom-visualization",
        state !== 'empty' && 'has-content',
        `state-${state}`
      )}>
        {/* Basic classroom outline */}
        <div className="classroom-outline">
          {/* Windows */}
          <div className="window left"></div>
          <div className="window right"></div>
          
          {/* Chalkboard */}
          <div className="chalkboard">
            {state === 'complete' && (
              <div className="teacher"></div>
            )}
          </div>
          
          {/* Desks */}
          <div className={cn("desk desk-1", state >= 'supplies' && 'with-supplies')}></div>
          <div className={cn("desk desk-2", state >= 'supplies' && 'with-supplies')}></div>
          <div className={cn("desk desk-3", state >= 'supplies' && 'with-supplies')}></div>
          
          {/* Students appear when donation >= $10 */}
          {state !== 'empty' && state !== 'supplies' && (
            <>
              <div className="student student-1"></div>
              <div className="student student-2"></div>
              <div className="student student-3"></div>
            </>
          )}
          
          {/* Classroom materials */}
          {(state === 'materials' || state === 'complete') && (
            <>
              <div className="material book"></div>
              <div className="material globe"></div>
              <div className="material poster"></div>
            </>
          )}
        </div>
      </div>
      
      <div className="visualization-description">
        {state === 'empty' && <p>Select an amount to build a classroom</p>}
        {state === 'supplies' && <p>Adding supplies to desks</p>}
        {state === 'students' && <p>Bringing students to class</p>}
        {state === 'materials' && <p>Filling classroom with materials</p>}
        {state === 'complete' && <p>Classroom complete with teacher</p>}
      </div>
    </div>
  );
};

export default ClassroomVisualization;
