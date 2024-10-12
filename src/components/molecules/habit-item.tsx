import { HabitIcon } from '@/components/atoms';
import { Progress } from '@/components/ui/progress';
import { Loader } from 'lucide-react';

type HabitItemProps = {
  name: string;
  frequency: string;
  progress: number;
  completed?: boolean;
};

export function HabitItem({
  name,
  frequency,
  progress,
  completed,
}: Readonly<HabitItemProps>) {
  return (
    <div className="flex items-center justify-between space-x-4 border-b border-gray-200 py-4">
      <div className="flex items-center space-x-4">
        {completed != undefined ? (
          <HabitIcon completed={completed} />
        ) : (
          <Loader />
        )}
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-gray-500">{frequency}</p>
        </div>
      </div>
      <div className="w-1/3">
        <Progress value={progress} />
        <span className="text-sm text-gray-500">{progress}%</span>
      </div>
    </div>
  );
}
