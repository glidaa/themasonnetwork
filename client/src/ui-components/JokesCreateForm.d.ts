/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type JokesCreateFormInputValues = {
    title?: string;
    description?: string;
    author?: string;
    url?: string;
    imageUrl?: string;
    joke?: string;
    content?: string;
    source?: string;
    publishedAt?: string;
    createdAt?: string;
    updatedAt?: string;
};
export declare type JokesCreateFormValidationValues = {
    title?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    author?: ValidationFunction<string>;
    url?: ValidationFunction<string>;
    imageUrl?: ValidationFunction<string>;
    joke?: ValidationFunction<string>;
    content?: ValidationFunction<string>;
    source?: ValidationFunction<string>;
    publishedAt?: ValidationFunction<string>;
    createdAt?: ValidationFunction<string>;
    updatedAt?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type JokesCreateFormOverridesProps = {
    JokesCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    author?: PrimitiveOverrideProps<TextFieldProps>;
    url?: PrimitiveOverrideProps<TextFieldProps>;
    imageUrl?: PrimitiveOverrideProps<TextFieldProps>;
    joke?: PrimitiveOverrideProps<TextFieldProps>;
    content?: PrimitiveOverrideProps<TextFieldProps>;
    source?: PrimitiveOverrideProps<TextFieldProps>;
    publishedAt?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    updatedAt?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type JokesCreateFormProps = React.PropsWithChildren<{
    overrides?: JokesCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: JokesCreateFormInputValues) => JokesCreateFormInputValues;
    onSuccess?: (fields: JokesCreateFormInputValues) => void;
    onError?: (fields: JokesCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: JokesCreateFormInputValues) => JokesCreateFormInputValues;
    onValidate?: JokesCreateFormValidationValues;
} & React.CSSProperties>;
export default function JokesCreateForm(props: JokesCreateFormProps): React.ReactElement;
