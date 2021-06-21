import { useNavigation } from "@react-navigation/native";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/mobile";
import React, { useCallback, useRef } from "react";
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { ICreateUser } from "src/services/database/users/users.interface";
import * as Yup from 'yup';
import logoImg from '../../assets/logo.png';
import Button from "../../components/Button";
import Input from "../../components/Input";
import UserService from '../../services/users.services';
import getValidationErrors from "../../utils/getValidationErrors";
import { BackButton, BackButtonText, Container, Title } from './styles';



const Register: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const navigation = useNavigation();
    const emailInputRef = useRef<TextInput>(null);
    const passInputRef = useRef<TextInput>(null);

    const handleRegister = useCallback(
        async (data: ICreateUser) => {
            try {
                formRef.current?.setErrors({});
                const schema = Yup.object().shape({
                    name: Yup.string().required("\nNome é obrigatório"),
                    email: Yup.string()
                        .required("\nE-mail é obrigatório")
                        .email("\nDigite um e-mail válido"),
                    password: Yup.string().required("\nSenha é obrigatória"),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                const result = await UserService.createUser(data);

                if(result) navigation.goBack();

            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);
                    console.log(err.errors)

                    Alert.alert(
                        "Erro no cadastro",
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
                            <Title>Crie sua conta:</Title>
                        </View>

                        <Form ref={formRef} onSubmit={handleRegister}>
                            <Input
                                autoCapitalize="words"
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    emailInputRef.current?.focus();
                                }}
                                name="name" icon="user" placeholder="Nome"
                            />

                            <Input
                                ref={emailInputRef}
                                keyboardType="email-address"
                                autoCorrect={false}
                                autoCapitalize="none"
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    passInputRef.current?.focus();
                                }}
                                name="email" icon="mail" placeholder="E-mail"
                            />


                            <Input
                                ref={passInputRef}
                                secureTextEntry
                                returnKeyType="send"
                                onSubmitEditing={() => {
                                    formRef.current?.submitForm();
                                }}
                                name="password" icon="lock" placeholder="Senha"
                            />

                        </Form>

                        <Button onPress={() => {
                            formRef.current?.submitForm();
                        }}>Criar conta
                        </Button>

                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>

            <BackButton onPress={() => {
                navigation.navigate('Login');
            }}>
                <Icon name="arrow-left" size={20} color="#F2F2F2"></Icon>
                <BackButtonText>Voltar</BackButtonText>
            </BackButton>
        </>
    );
}

export default Register;