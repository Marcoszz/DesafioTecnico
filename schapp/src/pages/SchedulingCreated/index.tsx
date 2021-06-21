import { useNavigation, useRoute, } from '@react-navigation/native';
import React, { useCallback, useMemo } from 'react';
import { Container, Title, Description, OkButton, OkButtonText } from './styles';

import Icon from 'react-native-vector-icons/Feather'
import { TurnType } from '../../services/database/professors/professors.interface';
import pt from 'date-fns/locale/pt-BR'
import { format } from 'date-fns';
import { LogBox } from 'react-native';

interface RouteParams {
    date: Date;
    turn: TurnType;
}

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

const SchedulingCreated: React.FC = () =>{
    const navigation = useNavigation();
    const { params } = useRoute();

    const routeParams = params as RouteParams;

    const formattedDate = useMemo(() => {
        return format(routeParams.date, "'Dia' dd 'de' MMMM 'de' yyyy", { locale: pt })
    }, [routeParams.date]);

    const handleOK = useCallback(() => {
        navigation.reset({
            routes: [{ name: "Dashboard" }],
            index: 0,
        });
    }, [navigation])

    
    
    return (
        <Container>
            <Icon name="check" size={80} color="#04D361"></Icon>
            <Title>Agendamento cadastrado</Title>
            <Description>{formattedDate + " pela parte da " + routeParams.turn}</Description>
            <OkButton onPress={handleOK}>
                <OkButtonText>
                    OK
                </OkButtonText>
            </OkButton>
        </Container>
    )
} 

export default SchedulingCreated;