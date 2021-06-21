import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState, useCallback } from "react";
import { TextInputProps } from "react-native";
import { useField } from "@unform/core";

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
    name: string;
    icon: string;
}
interface InputValReference {
    value: string;
}

interface InputRef {
    focus(): void;
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = ({ name, icon, ...rest }, ref) => {
    const inputElementRef = useRef<any>(null);
    const { registerField, defaultValue = '', fieldName, error } = useField(name);
    const inputValRef = useRef<InputValReference>({ value: defaultValue });
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const handleInputBlur = useCallback(() => {
        setIsFocused(false);

        if (inputValRef.current.value) {
            setIsFilled(true);
        } else {
            setIsFilled(false);
        }
    }, []);

    useImperativeHandle(ref, () => ({
        focus() {
            inputElementRef.current.focus();
        }
    }));

    useEffect(() => {
        registerField<string>({
            name: fieldName,
            ref: inputValRef.current,
            path: 'value',
            setValue(ref: any, val: string) {
                inputValRef.current.value = val;
                inputElementRef.current.setNativeProps({ text: val });

            },
            clearValue() {
                inputValRef.current.value = '';
                inputElementRef.current.clear();
            }
        });
    }, [fieldName, registerField]);

    return (
        <Container isFocused={isFocused} isErrored={!!error}>
            <Icon name={icon} size={20} color={isFocused || isFilled ? "#F2F2F2" : "#999591"} />
            <TextInput
                ref={inputElementRef}
                keyboardAppearance="dark"
                placeholderTextColor="#999591"
                defaultValue={defaultValue}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChangeText={(value) => {
                    inputValRef.current.value = value;
                }}
                {...rest}
            />

        </Container>
    );
}

export default forwardRef(Input);