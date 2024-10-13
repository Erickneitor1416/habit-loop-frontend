import { HabitItem } from '@/components/molecules';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Habit } from '@/habit/domain';
import { randomInt } from 'crypto';

type HabitListProps = {
  title: string;
  habits: Habit[];
};

export default function HabitList({ title, habits }: Readonly<HabitListProps>) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {habits.map(habit => (
          <HabitItem
            key={habit.id}
            name={habit.name}
            frequency={habit.frequency}
            progress={randomInt(0, 100)}
            completed={habit.id ? Math.random() >= 0.5 : undefined}
          />
        ))}
      </CardContent>
    </Card>
  );
}
