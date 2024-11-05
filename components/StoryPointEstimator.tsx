"use client";

import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { useClient } from './useClient';

const StoryPointEstimator = () => {
  const isClient = useClient();
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);
  const [newMemberName, setNewMemberName] = useState('');

  const animalPoints = [
    { 
      points: 1, 
      animal: 'Ant',
      emoji: '🐜',
      description: 'Tiny task, very straightforward',
      timeEstimate: '< 4 hours for one developer'
    },
    { 
      points: 2, 
      animal: 'Mouse',
      emoji: '🐭', 
      description: 'Small task, clear implementation',
      timeEstimate: '1 developer day'
    },
    { 
      points: 3, 
      animal: 'Cat',
      emoji: '🐱',
      description: 'Small task with some complexity',
      timeEstimate: '1-2 developer days'
    },
    { 
      points: 5, 
      animal: 'Dog',
      emoji: '🐕',
      description: 'Medium task, well understood',
      timeEstimate: '3-5 developer days'
    },
    { 
      points: 8, 
      animal: 'Sheep',
      emoji: '🐑',
      description: 'Medium task with some unknowns',
      timeEstimate: '5-10 developer days'
    },
    { 
      points: 13, 
      animal: 'Horse',
      emoji: '🐎',
      description: 'Large task, significant complexity',
      timeEstimate: '2-3 developer weeks'
    },
    { 
      points: 20, 
      animal: 'Elephant',
      emoji: '🐘',
      description: 'Very large task, should consider breaking down',
      timeEstimate: '3-4 developer weeks'
    },
    { 
      points: 40, 
      animal: 'Blue whale',
      emoji: '🐋',
      description: 'Epic-sized task, needs breakdown',
      timeEstimate: '1-2 developer months'
    },
    { 
      points: 100, 
      animal: 'Dinosaur',
      emoji: '🦖',
      description: 'Massive undertaking, must be broken down',
      timeEstimate: '3+ developer months'
    }
  ];

  const addTask = () => {
    if (newTaskName.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        name: newTaskName,
        estimates: {}
      }]);
      setNewTaskName('');
    }
  };

  const addTeamMember = () => {
    if (newMemberName.trim()) {
      setTeamMembers([...teamMembers, {
        id: Date.now(),
        name: newMemberName
      }]);
      setNewMemberName('');
    }
  };

  const submitEstimate = (taskId, memberId, points) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          estimates: {
            ...task.estimates,
            [memberId]: points
          }
        };
      }
      return task;
    }));
  };

  const calculateAverage = (estimates) => {
    if (Object.keys(estimates).length === 0) return 0;
    const sum = Object.values(estimates).reduce((acc, val) => acc + val, 0);
    return (sum / Object.keys(estimates).length).toFixed(1);
  };

  const exportToExcel = () => {
    let csvContent = "Task Name,";
    
    teamMembers.forEach(member => {
      csvContent += `${member.name},`;
    });
    csvContent += "Average Points\n";

    tasks.forEach(task => {
      csvContent += `${task.name},`;
      teamMembers.forEach(member => {
        csvContent += `${task.estimates[member.id] || ''},`;
      });
      csvContent += `${calculateAverage(task.estimates)}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'story_points.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isClient) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="text-lg">Loading...</div>
    </div>;
  }

  return (
    <div className="space-y-6">
      {/* Instructions Panel */}
      <div className="bg-blue-50 p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">How to Use This Tool</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>First, add all team members who will be participating in the estimation.</li>
          <li>Add each task or user story that needs to be estimated.</li>
          <li>Each team member selects their estimate using the animal-based point system.</li>
          <li>The average score will be calculated automatically.</li>
          <li>Use the Export button to download all estimates to a spreadsheet.</li>
        </ol>
      </div>

      {/* Point Scale Reference */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-md font-medium mb-2">Point Scale Reference</h3>
        
        {/* Important Note About Time Estimates */}
        <div className="mb-4 p-3 bg-blue-50 rounded border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">About Time Estimates</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Time estimates shown are for a single developer working alone</li>
            <li>• Multiple developers may reduce calendar time but add coordination overhead</li>
            <li>• Estimates include time for coding, testing, and basic documentation</li>
            <li>• Additional time may be needed for reviews, meetings, and integration</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {animalPoints.map(({ points, animal, emoji, description, timeEstimate }) => (
            <div key={points} className="p-3 bg-white rounded border hover:shadow-md transition-shadow">
              <div className="font-bold text-lg mb-1 flex items-center gap-2">
                <span className="text-2xl">{emoji}</span>
                <span>{points} ({animal})</span>
              </div>
              <div className="text-sm space-y-1">
                <div className="text-gray-600">{description}</div>
                <div className="text-blue-600 font-medium">
                  🕒 {timeEstimate}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-yellow-50 rounded border border-yellow-200">
          <p className="text-sm text-yellow-800">
            <strong>Team Size Impact:</strong> These estimates are for individual developer effort. 
            Working with multiple developers might reduce calendar time but can add overhead for coordination, 
            code reviews, and integration. Consider these factors when planning sprints and deadlines.
          </p>
        </div>
      </div>

      {/* Team Member Management */}
      <div className="space-y-2 bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium">Step 1: Add Team Members</h3>
        <p className="text-gray-600 mb-2">Enter the name of each team member who will provide estimates.</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={newMemberName}
            onChange={(e) => setNewMemberName(e.target.value)}
            placeholder="Enter team member name"
            className="flex-1 p-2 border rounded"
          />
          <button 
            onClick={addTeamMember}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Member
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {teamMembers.map(member => (
            <span key={member.id} className="px-3 py-1 bg-blue-100 rounded">
              {member.name}
            </span>
          ))}
        </div>
      </div>

      {/* Task Management */}
      <div className="space-y-2 bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium">Step 2: Add Tasks</h3>
        <p className="text-gray-600 mb-2">Enter each task or user story that needs to be estimated.</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            placeholder="Enter task description"
            className="flex-1 p-2 border rounded"
          />
          <button 
            onClick={addTask}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Task
          </button>
        </div>
      </div>

      {/* Estimation Table */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Step 3: Estimate Tasks</h3>
          {tasks.length > 0 && (
            <button 
              onClick={exportToExcel}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              <Download size={16} />
              Export to Excel
            </button>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-2 border text-left">Task</th>
                {teamMembers.map(member => (
                  <th key={member.id} className="p-2 border text-center">
                    {member.name}
                  </th>
                ))}
                <th className="p-2 border text-center">Average</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task.id}>
                  <td className="p-2 border">{task.name}</td>
                  {teamMembers.map(member => (
                    <td key={member.id} className="p-2 border">
                      <select
                        className="w-full p-1 border rounded"
                        value={task.estimates[member.id] || ''}
                        onChange={(e) => submitEstimate(task.id, member.id, Number(e.target.value))}
                      >
                        <option value="">Select</option>
                        {animalPoints.map(({ points, animal, emoji }) => (
                          <option key={points} value={points}>
                            {emoji} {points} ({animal})
                          </option>
                        ))}
                      </select>
                    </td>
                  ))}
                  <td className="p-2 border text-center font-bold">
                    {calculateAverage(task.estimates)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StoryPointEstimator;