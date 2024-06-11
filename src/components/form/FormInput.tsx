import { Input } from '@/components/ui/input';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Control, UseFormReturn } from 'react-hook-form';

type FormInputProps = {
  control: Control<any, any>;
  name: string;
  type: string;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
  description?: string;
};

export function FormInput(props: FormInputProps) {
  const { control, label, name, type, defaultValue, placeholder, description } = props;
  return (
    <div className='mb-2'>
      <FormField
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label || name}</FormLabel>
            <FormControl>
              <Input type={type} placeholder={placeholder} autoComplete="off" {...field} />
            </FormControl>
            {description && (<FormDescription> {description} </FormDescription>)}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}