import { useNavigation } from "@react-navigation/native";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/mobile";
import React, { useCallback, useRef } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';
import avaImg from '../../assets/avatar.png';
import Button from "../../components/Button";
import Input from "../../components/Input";
import firebase from "../../services/database/config/fire";
import UsersService from "../../services/users.services";
import getValidationErrors from "../../utils/getValidationErrors";
import { BackButton, Container, LogOutButton, Title, UserAvatar } from './styles';

interface Prop{
    updateUser: (user?: firebase.User) => void
}

interface FormData {
    name: string;
    password: string;
    oldPassword: string;
    passConfirm: string;
}

const Profile = ({updateUser}: Prop) => {
    const formRef = useRef<FormHandles>(null);
    const navigation = useNavigation();

    const oldPassInputRef = useRef<TextInput>(null);
    const passInputRef = useRef<TextInput>(null);
    const confirmInputRef = useRef<TextInput>(null);

    const handleBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    const handleChanges = useCallback(
        async (data: FormData) => {
            try {


                formRef.current?.setErrors({});
                const schema = Yup.object().shape({
                    name: Yup.string().required("\nNome é obrigatório"),

                    oldPassword: Yup.string(),

                    password: Yup.string().when('oldPassword', {
                        is: (val: string | any[]) => !!val.length,
                        then: Yup.string().required('\nCampo obrigatório ao modificar a senha'),
                        otherwise: Yup.string(),
                    }),

                    passConfirm: Yup.string()
                        .when('oldPassword', {
                            is: (val: string | any[]) => !!val.length,
                            then: Yup.string().required('\nCampo obrigatório ao modificar a senha'),
                            otherwise: Yup.string(),
                        })
                        .oneOf([Yup.ref('password'), null], '\nConfirmação incorreta !'),
                });

                const {
                    name, oldPassword,
                    password, passConfirm
                } = data;

                await schema.validate(data, {
                    abortEarly: false,
                });

                const result = await UsersService.updateUser({
                    name: data.name,
                    password: data.password,
                    oldpassword: data.oldPassword
                })

                if (result) {

                    navigation.reset({
                        routes: [{ name: "Dashboard" }],
                        index: 0,
                    });
                }

            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);
                    console.log(err.errors)

                    Alert.alert(
                        "Erro no formulário",
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
                        <BackButton onPress={handleBack}>
                            <Icon name="chevron-left" size={24} color="#F4EDE8"></Icon>
                        </BackButton>

                        <LogOutButton onPress={() => {
                            UsersService.logoutUser();
                            updateUser(undefined);
                            }}>
                            <Icon name="log-out" size={24} color="#F4EDE8"></Icon>
                        </LogOutButton>

                        <UserAvatar source={avaImg} />


                        <View style={{
                            marginTop: 40,
                            marginBottom: 5
                        }}>
                            <Title>Meu Perfil</Title>
                        </View>

                        <Form initialData={{
                            name: firebase.auth().currentUser?.displayName,
                            email: firebase.auth().currentUser?.email
                        }}
                            ref={formRef} onSubmit={handleChanges}>
                            <Input
                                autoCapitalize="words"
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    oldPassInputRef.current?.focus();
                                }}
                                name="name" icon="user" placeholder="Nome" />

                            <Input
                                ref={oldPassInputRef}
                                secureTextEntry
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    passInputRef.current?.focus();
                                }}
                                name="oldPassword" icon="lock" placeholder="Senha atual" />


                            <Input
                                ref={passInputRef}
                                secureTextEntry
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    confirmInputRef.current?.focus();
                                }}
                                name="password" icon="lock" placeholder="Nova senha" />


                            <Input
                                ref={confirmInputRef}
                                secureTextEntry
                                returnKeyType="send"
                                onSubmitEditing={() => {
                                    formRef.current?.submitForm();
                                }}
                                name="passConfirm" icon="lock" placeholder="Confirmar senha" />

                        </Form>

                        <Button style={{ marginTop: 64 }} onPress={() => {
                            formRef.current?.submitForm();
                        }}>Confirmar mudanças
                        </Button>

                    </Container>

                </ScrollView>

            </KeyboardAvoidingView>
        </>
    );
}

export default Profile;