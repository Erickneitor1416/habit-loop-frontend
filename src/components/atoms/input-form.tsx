import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input, InputProps } from '../ui/input';
export interface InputFormProps extends InputProps {
  description: string;
  label: string;
}

export function InputForm({
  description,
  label,
  ...field
}: Readonly<InputFormProps>) {
  const [showPassword, setShowPassword] = useState(false);
  let inputType;
  if (field.type === 'password') {
    inputType = showPassword ? 'text' : 'password';
  } else {
    inputType = field.type;
  }
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <div className="flex w-full max-w-sm items-center space-x-2 relative">
          <Input {...field} type={inputType} />
          {field.type === 'password' && (
            <Button
              variant="ghost"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            >
              {showPassword ? (
                <EyeOffIcon className="h-4 w-4 text-muted-foreground" />
              ) : (
                <EyeIcon className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          )}
        </div>
      </FormControl>
      <FormDescription>{description}</FormDescription>
      <FormMessage />
    </FormItem>
  );
}
