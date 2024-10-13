import { Check, X } from 'lucide-react';

type HabitIconProps = {
  completed: boolean;
};

export default function HabitIcon({ completed }: Readonly<HabitIconProps>) {
  return (
    <div
      className={`rounded-full p-1 ${completed ? 'bg-green-500' : 'bg-red-500'}`}
    >
      {completed ? (
        <Check className="h-4 w-4 text-white" />
      ) : (
        <X className="h-4 w-4 text-white" />
      )}
    </div>
  );
}
