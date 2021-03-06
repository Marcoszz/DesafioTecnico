import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import usersRespository from '../../services/database/users/users.respository';
import avaImg from '../../assets/avatar.png';
import { ISelectedProfessor, TurnType } from '../../services/database/professors/professors.interface';
import ProfessorServices from '../../services/professors.services';
import UserServices from '../../services/users.services';
import formatDate from '../../utils/formatDate';
import {
    BackButton, Calendar, Container, Header, HeaderTitle, ProfessorAvatar, ProfessorContainer, ProfessorList,
    ProfessorListContainer, ProfessorName, RestButton, RestButtonText, ScheduleButton, ScheduleButtonText, Title, UserAvatar
} from './styles';

interface RouteParams {
    professorId: string;
}

const CreateScheduling: React.FC = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const routeParams = route.params as RouteParams;

    const [professors, setProfessors] = useState<ISelectedProfessor[]>([]);
    const [showDate, setShowDate] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedProfessor, setSelectedProfessor] = useState(routeParams.professorId);
    const [selectedTurn, setSelectedTurn] = useState<TurnType>();

    const [enabledMorningButton, setEnabledMorningButton] = useState<boolean>(true);
    const [enabledEveningButton, setEnabledEveningButton] = useState<boolean>(true);
    const [enabledNightButton, setEnabledNightButton] = useState<boolean>(true);

    const [enabledSchedulingButton, setEnabledSchedulingButton] = useState<boolean>(true);


    const fetchProfessor = async () => {
        const profs = await ProfessorServices.getAllProfessors();
        setProfessors(profs ? profs : []);
    }

    const fetchTurns = async () => {
        const user_id = await usersRespository.getUser_ID();
        if(!user_id) {
            Alert.alert(
                "User n??o logado!",
                "Porfavor refa??a a autentica????o."
            )
            return false
        }

        const NAT_P = await ProfessorServices.getAllProfessorSchedules(selectedProfessor, formatDate(selectedDate));
        const NAT_U = await UserServices.getAllUserTurns(user_id, formatDate(selectedDate));

        if (NAT_P.includes(TurnType.MORNING) || NAT_U.includes(TurnType.MORNING)) setEnabledMorningButton(false);
        else setEnabledMorningButton(true);


        if (NAT_P.includes(TurnType.EVENING) || NAT_U.includes(TurnType.EVENING)) setEnabledEveningButton(false);
        else setEnabledEveningButton(true);



        if (NAT_P.includes(TurnType.NIGHT) || NAT_U.includes(TurnType.NIGHT)) setEnabledNightButton(false);
        else setEnabledNightButton(true);

        if (selectedTurn) {
            if (NAT_P.includes(selectedTurn) || NAT_U.includes(selectedTurn)) setEnabledSchedulingButton(false);
            else setEnabledSchedulingButton(true);
        }

    }

    useEffect(() => {
        fetchProfessor();
    }, []);

    useEffect(() => {
        fetchTurns();
    }, [selectedDate, selectedProfessor, selectedTurn]);

    const handleSelectProfessor = useCallback((professorId: string) => {
        setSelectedProfessor(professorId)
        setShowDate(true);
    }, []);

    const handleMorningPress = () => {
        setSelectedTurn(TurnType.MORNING);

    }

    const handleEveningPress = () => {
        setSelectedTurn(TurnType.EVENING);
    }

    const handleNightPress = () => {
        setSelectedTurn(TurnType.NIGHT);
    }

    const handleToggleDate = useCallback(() => {
        setShowDate((state) => !state);
    }, []);

    const handleChangeDate = useCallback((event: any, date: Date | undefined) => {
        if (Platform.OS === 'android') {
            setShowDate(false);
        }

        if (date) {
            setSelectedDate(date);
        };
    }, []);

    const handleSchedulingPress = async () => {
        if (await UserServices.createSchedule(selectedProfessor, formatDate(selectedDate), selectedTurn)) {
            navigation.navigate("SchedulingCreated", { date: selectedDate, turn: selectedTurn });

        };
    }

    const navBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    return (
        <Container>
            <Header>
                <BackButton onPress={navBack}>
                    <Icon name="chevron-left" size={24} color="#F4EDE8" />
                </BackButton>
                <HeaderTitle>Agendamento</HeaderTitle>
                <UserAvatar source={avaImg} />
            </Header>

            <ProfessorListContainer>
                <ProfessorList
                    data={professors}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <ProfessorContainer
                            onPress={() => handleSelectProfessor(item.id || "")}
                            selected={item.id === selectedProfessor}>
                            <ProfessorAvatar source={avaImg} />
                            <ProfessorName selected={item.id === selectedProfessor}>{item.name}</ProfessorName>
                        </ProfessorContainer>
                    )}
                />
            </ProfessorListContainer>

            <Calendar>
                <Title>Escolha uma data</Title>
                <RestButton onPress={handleToggleDate} style={{marginTop:0}} enabled={true}>
                    <RestButtonText>Escolher outro data</RestButtonText>
                </RestButton>

                {showDate &&
                    (<DateTimePicker
                        mode="date"
                        minimumDate={new Date()}
                        maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
                        display="calendar"
                        onChange={handleChangeDate}
                        value={selectedDate} />
                    )}
            </Calendar>

            <Title>Escolha um turno</Title>
            <ScheduleButton
                onPress={handleMorningPress}
                enabled={enabledMorningButton}
                selected={enabledMorningButton && selectedTurn === TurnType.MORNING}
            >
                <ScheduleButtonText
                    selected={enabledMorningButton && selectedTurn === TurnType.MORNING}
                >
                    {TurnType.MORNING}
                </ScheduleButtonText>
            </ScheduleButton>

            <ScheduleButton
                onPress={handleEveningPress}
                enabled={enabledEveningButton}
                selected={enabledEveningButton && selectedTurn === TurnType.EVENING}
            >
                <ScheduleButtonText
                    selected={enabledEveningButton && selectedTurn === TurnType.EVENING}
                >
                    {TurnType.EVENING}
                </ScheduleButtonText>
            </ScheduleButton>

            <ScheduleButton
                onPress={handleNightPress}
                enabled={enabledNightButton}
                selected={enabledNightButton && selectedTurn === TurnType.NIGHT}
            >
                <ScheduleButtonText
                    selected={enabledNightButton && selectedTurn === TurnType.NIGHT}
                >
                    {TurnType.NIGHT}
                </ScheduleButtonText>
            </ScheduleButton>

            <RestButton
                enabled={enabledSchedulingButton}
                onPress={handleSchedulingPress}
            >
                <RestButtonText>Agendar</RestButtonText>
            </RestButton>

        </Container>
    )
}

export default CreateScheduling;