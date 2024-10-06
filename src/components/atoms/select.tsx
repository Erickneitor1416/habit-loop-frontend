import { FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  Select as SelectRoot,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SelectProps as SelectRootProps } from '@radix-ui/react-select';

interface SelectProps extends SelectRootProps {
  options: string[];
  label: string;
  placeholder: string;
  onChange: (value: string) => void;
  value: string;
}
export default function Select({
  options,
  label,
  placeholder,
  onChange,
  value,
  ...field
}: Readonly<SelectProps>) {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <SelectRoot onValueChange={onChange} defaultValue={value} {...field}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map(option => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </SelectRoot>
      <FormMessage />
    </FormItem>
  );
}
