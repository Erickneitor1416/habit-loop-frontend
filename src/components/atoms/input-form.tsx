import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { forwardRef, useState } from 'react';
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

export const InputForm = forwardRef<HTMLInputElement, InputFormProps>(
  ({ description, label, ...field }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    let inputType;
    if (field.type === 'password') {
      inputType = showPassword ? 'text' : 'password';
    } else {
      inputType = field.type;
    }
    return (
      <FormItem>
        <FormLabel htmlFor={field.name}>{label}</FormLabel>
        <FormControl>
          <div className="relative flex items-center">
            <Input {...field} type={inputType} id={field.name} />
            {field.type === 'password' && (
              <Button
                variant="ghost"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              >
                {showPassword ? (
                  <EyeOffIcon
                    className="h-4 w-4 text-muted-foreground"
                    data-testid="eye-off-icon"
                  />
                ) : (
                  <EyeIcon
                    className="h-4 w-4 text-muted-foreground"
                    data-testid="eye-icon"
                  />
                )}
              </Button>
            )}
          </div>
        </FormControl>
        <FormDescription>{description}</FormDescription>
        <FormMessage />
      </FormItem>
    );
  },
);

InputForm.displayName = 'InputForm';
