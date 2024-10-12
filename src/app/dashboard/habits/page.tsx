import { HabitHeader } from '@/components/molecules/habit-header';
import { HabitList } from '@/components/organisms';
import { Frequency, Habit } from '@/habit/domain';

const todaysHabits: Habit[] = [
  {
    id: '1',
    name: 'Meditate',
    frequency: Frequency.DAILY,
    description: 'Meditate for 10 minutes',
    goal: 10,
  },
  {
    id: '2',
    name: 'Exercise',
    frequency: Frequency.WEEKLY,
    description: 'Run 5km',
    goal: 5,
  },
  {
    id: '3',
    name: 'Read 30 minutes',
    frequency: Frequency.DAILY,
    description: 'Read a book for 30 minutes',
    goal: 30,
  },
];

const myHabits: Habit[] = [
  {
    name: 'Exercise',
    frequency: Frequency.WEEKLY,
    description: 'Run 5km',
    goal: 5,
  },
  {
    name: 'Read 30 minutes',
    frequency: Frequency.DAILY,
    description: 'Read a book for 30 minutes',
    goal: 30,
  },
];

export default function HabitPage() {
  return (
    <div className="container mx-auto px-4 py-8 mt-20 sm:mt-0">
      <HabitHeader />
      <div className="space-y-8">
        <HabitList title="Today's Progress" habits={todaysHabits} />
        <HabitList title="My Habits" habits={myHabits} />
      </div>
    </div>
  );
}
