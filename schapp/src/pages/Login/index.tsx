import { useNavigation } from "@react-navigation/native";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/mobile";
import React, { useCallback, useRef } from "react";
import { Alert, Image, KeyboardAvoidingView, LogBox, Platform, ScrollView, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';
import logoImg from '../../assets/logo.png';
import Button from "../../components/Button";
import Input from "../../components/Input";
import firebase from '../../services/database/config/fire';
import UsersService from "../../services/users.services";
import getValidationErrors from "../../utils/getValidationErrors";
import { Container, CrtAccButton, CrtAccButtonText, Title } from './styles';

interface Prop {
    updateUser: (user?: firebase.User) => void
}

export interface LoginFormData {
    email: string;
    password: string;
}

LogBox.ignoreLogs(['Setting a timer']);

const Login = ({ updateUser }: Prop) => {
    const formRef = useRef<FormHandles>(null);
    const navigation = useNavigation();
    const passInputRef = useRef<TextInput>(null);

    const handleLogin = useCallback(
        async (data: LoginFormData) => {

            try {
                formRef.current?.setErrors({});
                const schema = Yup.object().shape({
                    email: Yup.string()
                        .required("\nE-mail é obrigatório")
                        .email("\nDigite um e-mail válido"),
                    password: Yup.string().required("\nSenha é obrigatória"),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                const result = await UsersService.loginUser(data);

                if (result) {
                    const user = firebase.auth().currentUser

                    if (user) {
                        updateUser(user);
                    }
                }

            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);
                    Alert.alert(
                        "Erro no login",
                        `${err.errors}`,
                    )

                    return;
                }
            }
        },
        [],
    );

    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                enabled>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flex: 1 }}>
                    <Container>
                        <Image
                            style={{
                                marginBottom: 28
                            }}
                            source={logoImg} />
                        <View style={{
                            marginTop: 10,
                            marginBottom: 5
                        }}>
                            <Title>Faça login:</Title>
                        </View>
                        <Form ref={formRef} onSubmit={handleLogin}>
                            <Input
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="email-address"
                                returnKeyType="next"
                                name="email" icon="mail" placeholder="E-mail"
                                onSubmitEditing={() => {
                                    passInputRef.current?.focus();
                                }} />

                            <Input
                                ref={passInputRef}
                                secureTextEntry
                                returnKeyType="send"
                                name="password" icon="lock" placeholder="Senha"
                                onSubmitEditing={() => {
                                    formRef.current?.submitForm();
                                }} />
                        </Form>

                        <Button onPress={() => {
                            formRef.current?.submitForm();
                        }}>Acessar
                        </Button>

                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>

            <CrtAccButton onPress={() => {
                navigation.navigate('Register');
            }}>
                <Icon name="log-in" size={20} color="#F2F2F2"></Icon>
                <CrtAccButtonText>Criar uma conta</CrtAccButtonText>
            </CrtAccButton>
        </>
    );
}

export default Login;