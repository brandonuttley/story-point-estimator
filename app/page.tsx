// app/page.tsx
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { TeamMember } from '../components/types';

const StoryPointEstimatorWrapper = dynamic(
  () => import('../components/StoryPointEstimatorWrapper'),
  { ssr: false }
);

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState('');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [newMemberName, setNewMemberName] = useState('');

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Story Point Estimation Tool</h1>
      <StoryPointEstimatorWrapper
        tasks={tasks}
        setTasks={setTasks}
        newTaskName={newTaskName}
        setNewTaskName={setNewTaskName}
        teamMembers={teamMembers}
        setTeamMembers={setTeamMembers}
        newMemberName={newMemberName}
        setNewMemberName={setNewMemberName}
      />
    </main>
  );
}