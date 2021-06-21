declare module "native-base" {
    export class DefaultTabBar extends React.Component<any, any> { }
}


import { useNavigation } from '@react-navigation/native';
import { DefaultTabBar, Tab, Tabs } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import ProfessorServices from '../../services/professors.services';
import UserServices from '../../services/users.services';
import avaImg from '../../assets/avatar.png';
import firebase from "../../services/database/config/fire";


import {
    Container, Header,
    HeaderTitle, ProfessorAvatar, ProfessorContainer,
    ProfessorInfo, ProfessorList, ProfessorMeta,
    ProfessorMetaText, ProfessorName, ProfileButton, SchedulesAvatar, SchedulesContainer,
    SchedulesInfo, SchedulesList, SchedulesMeta,
    SchedulesMetaText, SchedulesName, UserAvatar, UserName, Spinner
} from './styles';

import { IProfessor, TurnType } from '../../services/database/professors/professors.interface';
import { IUserSchedule } from '../../services/database/users/users.interface';
import Icon from 'react-native-vector-icons/Feather';
import { Alert } from 'react-native';
import usersRespository from '../../services/database/users/users.respository';


const Dashboard: React.FC = () => {
    const navigation = useNavigation();

    const [professors, setProfessors] = useState<IProfessor[]>([]);
    const [schedules, setSchedules] = useState<IUserSchedule[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchProfessor = async () => {
        const profs = await ProfessorServices.getAllProfessors();
        setProfessors(profs ? profs : []);
    }

    const fetchSchedules = async () => {
        const scheds = await UserServices.getAllUserSchedules(firebase.auth().currentUser?.uid as string);
        setSchedules(scheds ? scheds : []);
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        fetchProfessor();
        fetchSchedules();
    }, []);

    const navProfile = useCallback(() => {
        navigation.navigate("Profile");
    }, [navigation])

    const navCreateSchedule = useCallback((professorId: string) => {
        navigation.navigate("CreateScheduling", { professorId });
    }, [navigation]);

    const renderTabBar = (props: any) => {
        props.tabStyle = Object.create(props.tabStyle);
        return <DefaultTabBar {...props} />;
    };

    const handleScheduleTouch = (id_sched: string, id_professor: string) => {
        Alert.alert(
            "Remover agendamento",
            "Tem certeza que quer apagar esse agendamento ?",
            [
                {
                    text: "Cancelar a operação",
                    style: "cancel"
                },
                {
                    text: "Apagar agendamento",
                    onPress: async () => {
                        const id_user = await usersRespository.getUser_ID();

                        if (id_user) {
                            const result = await UserServices.removeSchedule(id_professor, id_sched);
                            if (result) fetchSchedules();
                        }
                    }
                }
            ],
            { cancelable: false }
        );
    }

    return (
        <Container>
            <Header>
                <HeaderTitle>
                    Olá, <UserName>{firebase.auth().currentUser?.displayName}</UserName>
                </HeaderTitle>
                <ProfileButton onPress={navProfile}>
                    <UserAvatar source={avaImg} />
                </ProfileButton>
            </Header>

            <Tabs
                initialPage={0}
                renderTabBar={renderTabBar}
            >
                <Tab
                    heading="Professores"
                    tabStyle={{ backgroundColor: "#2F80ED" }}
                    textStyle={{ fontFamily: 'RobotoSlab-Regular', color: "#F4EDE8" }}
                    activeTabStyle={{ backgroundColor: '#2F80ED' }}
                    activeTextStyle={{ color: '#F4EDE8', fontFamily: 'RobotoSlab-Medium' }}
                >
                    <ProfessorList
                        ListEmptyComponent={() => {
                            if (loading) {
                                return (
                                    <Spinner
                                        color="#F4EDE8"
                                        size="large"
                                    />
                                )
                            } else {
                                return (
                                    <ProfessorMetaText
                                        style={{ textAlign: 'center', paddingTop: "20px"}}>
                                        Sem Professores !
                                    </ProfessorMetaText>
                                )
                            }
                        }}
                        data={professors}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <ProfessorContainer onPress={() => navCreateSchedule(item.id || "")}>
                                <ProfessorAvatar source={avaImg}></ProfessorAvatar>
                                <ProfessorInfo>
                                    <ProfessorName>{item.name}</ProfessorName>
                                    <ProfessorMeta>
                                        <Icon name="mail" size={15} color="#F2F2F2"></Icon>
                                        <ProfessorMetaText>{item.email}</ProfessorMetaText>
                                    </ProfessorMeta>
                                    <ProfessorMeta>
                                        <Icon name="book-open" size={15} color="#F2F2F2"></Icon>
                                        <ProfessorMetaText>{item.subject}</ProfessorMetaText>
                                    </ProfessorMeta>
                                </ProfessorInfo>
                            </ProfessorContainer>
                        )}
                    />
                </Tab>

                <Tab
                    heading="Agendamentos"
                    tabStyle={{ backgroundColor: "#2F80ED" }}
                    textStyle={{ fontFamily: 'RobotoSlab-Regular', color: "#F4EDE8" }}
                    activeTabStyle={{ backgroundColor: '#2F80ED' }}
                    activeTextStyle={{ color: '#F4EDE8', fontFamily: 'RobotoSlab-Medium' }}
                >
                    <SchedulesList
                        ListEmptyComponent={() => {
                            if (loading) {
                                return (
                                    <Spinner
                                        color="#F4EDE8"
                                        size="large"
                                    />
                                )
                            } else {
                                return (
                                    <SchedulesMetaText
                                        style={{ textAlign: 'center', paddingTop: "20px"}}>
                                        Sem Agendamentos !
                                    </SchedulesMetaText>
                                )
                            }
                        }}
                        data={schedules}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <SchedulesContainer onPress={() => { handleScheduleTouch(item.id, item.professor.id) }}>
                                <SchedulesAvatar source={avaImg}></SchedulesAvatar>
                                <SchedulesInfo>
                                    <SchedulesName>{item.professor.name}</SchedulesName>
                                    <SchedulesMeta>
                                        <Icon name="book-open" size={15} color="#F2F2F2"></Icon>
                                        <SchedulesMetaText>{item.professor.subject}</SchedulesMetaText>
                                    </SchedulesMeta>
                                    <SchedulesMeta>
                                        <Icon name="calendar" size={15} color="#F2F2F2"></Icon>
                                        <SchedulesMetaText>{item.date}</SchedulesMetaText>
                                    </SchedulesMeta>
                                    <SchedulesMeta>
                                        <Icon name={
                                            item.turn === TurnType.MORNING ? "sun" :
                                                item.turn === TurnType.EVENING ? "sunset" :
                                                    "moon"
                                        } size={15} color="#F2F2F2"></Icon>
                                        <SchedulesMetaText>{item.turn}</SchedulesMetaText>
                                    </SchedulesMeta>
                                </SchedulesInfo>
                            </SchedulesContainer>
                        )}
                    />
                </Tab>
            </Tabs>

        </Container>
    )
}

export default Dashboard;