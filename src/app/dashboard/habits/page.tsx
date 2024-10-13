import { HabitHeader } from '@/components/molecules/habit-header';
import { HabitList } from '@/components/organisms';
import { HabitItemProps } from '@/components/organisms/habit-list';
import { Frequency } from '@/habit/domain';
import { getHabits } from '@/habit/infrastructure';

const todaysHabits: HabitItemProps[] = [
  {
    id: '1',
    name: 'Meditate',
    frequency: Frequency.DAILY,
    description: 'Meditate for 10 minutes',
    goal: 10,
    completed: true,
    progress: 10,
  },
  {
    id: '2',
    name: 'Exercise',
    frequency: Frequency.WEEKLY,
    description: 'Run 5km',
    goal: 5,
    completed: true,
    progress: 5,
  },
  {
    id: '3',
    name: 'Read 30 minutes',
    frequency: Frequency.DAILY,
    description: 'Read a book for 30 minutes',
    goal: 30,
    completed: false,
    progress: 15,
  },
];

export default async function HabitPage() {
  const habits = await getHabits();
  return (
    <div className="container mx-auto px-4 py-20 sm:py-10">
      <HabitHeader />
      <div className="space-y-8">
        <HabitList title="Today's Progress" habits={todaysHabits} />
        <HabitList title="My Habits" habits={habits} />
      </div>
    </div>
  );
}
