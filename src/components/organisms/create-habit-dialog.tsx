import { CreateHabitForm } from '@/components/molecules';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function CreateHabitDialog({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Dialog>
      {children}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Habit</DialogTitle>
          <DialogDescription>Start building healthy habits.</DialogDescription>
        </DialogHeader>
        <CreateHabitForm />
      </DialogContent>
    </Dialog>
  );
}
