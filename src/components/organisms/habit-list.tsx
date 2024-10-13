import { HabitItem } from '@/components/molecules';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Habit } from '@/habit/domain';

export interface HabitItemProps extends Habit {
  completed?: boolean;
  progress?: number;
}

type HabitListProps = {
  title: string;
  habits: HabitItemProps[];
};

export default function HabitList({ title, habits }: Readonly<HabitListProps>) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {habits.map(habit => (
          <HabitItem {...habit} key={habit.id} />
        ))}
      </CardContent>
    </Card>
  );
}
