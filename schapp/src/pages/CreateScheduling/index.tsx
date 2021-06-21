import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
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
        const NAT = await ProfessorServices.getAllProfessorSchedules(selectedProfessor, formatDate(selectedDate));

        if (NAT.includes(TurnType.MORNING)) setEnabledMorningButton(false);
        else setEnabledMorningButton(true);


        if (NAT.includes(TurnType.EVENING)) setEnabledEveningButton(false);
        else setEnabledEveningButton(true);



        if (NAT.includes(TurnType.NIGHT)) setEnabledNightButton(false);
        else setEnabledNightButton(true);

        if (selectedTurn) {
            if (NAT.includes(selectedTurn)) setEnabledSchedulingButton(false);
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
                <Title>Escolha um horário</Title>
                <RestButton onPress={handleToggleDate} enabled={true}>
                    <RestButtonText>Escolher outro horário</RestButtonText>
                </RestButton>

                {showDate &&
                    (<DateTimePicker
                        mode="date"
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