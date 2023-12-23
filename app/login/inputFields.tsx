import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { FieldHookConfig, useField } from "formik"

type MyTextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label: string;
    placeholder?: string;
  }

export const TextField:React.FC<MyTextInputProps> = (props) => {
    const [field, {touched, error}] = useField(props);
    return (
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
            <Input {...field} type={props.type} id={field.name} placeholder={props.placeholder ?? ''}></Input>
            {error? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    )
}
