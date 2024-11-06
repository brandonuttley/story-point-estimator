// components/StoryPointEstimatorWrapper.tsx
import { useState } from 'react';
import { StoryPointEstimator } from './StoryPointEstimator';
import { TeamMember } from './types';

export default function StoryPointEstimatorWrapper() {
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState('');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [newMemberName, setNewMemberName] = useState('');

  return (
    <div suppressHydrationWarning={true}>
      <StoryPointEstimator
        tasks={tasks}
        setTasks={setTasks}
        newTaskName={newTaskName}
        setNewTaskName={setNewTaskName}
        teamMembers={teamMembers}
        setTeamMembers={setTeamMembers}
        newMemberName={newMemberName}
        setNewMemberName={setNewMemberName}
      />
    </div>
  );
}