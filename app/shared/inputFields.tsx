import { FormControl, FormErrorMessage, FormLabel, Input, Textarea } from "@chakra-ui/react";
import { FieldHookConfig, useField } from "formik"

type MyTextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label: string;
    placeholder?: string;
  }

export const TextField:React.FC<MyTextInputProps> = (props) => {
    const [field, {touched, error}] = useField(props);
    return (
        
        <FormControl isInvalid={!!error} isRequired>
            <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
            <Input 
            size="sm"
            {...field} 
            type={props.type} 
            id={field.name} 
            placeholder={props.placeholder ?? ''}
            isInvalid={touched && !!error}></Input>
            {touched && error? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    )
}

export const TextAreaField:React.FC<MyTextInputProps> = (props) => {
    const [field, {touched, error}] = useField(props);
    return (
        
        <FormControl isInvalid={!!error} isRequired>
            <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
            <Textarea 
            size="sm"
            {...field} 
            id={field.name} 
            placeholder={props.placeholder ?? ''}
            isInvalid={touched && !!error}></Textarea>
            {touched && error? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    )
}

// field props are onChange, onBlur, etc - these handlers are taken care by Formik directly