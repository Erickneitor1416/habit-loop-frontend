import { Button } from '@/components/ui/button';

export function HabitHeader() {
  return (
    <header className="flex items-center justify-between py-4">
      <h1 className="text-2xl font-bold">Habits</h1>
      <Button>Add Habit Progress</Button>
    </header>
  );
}
