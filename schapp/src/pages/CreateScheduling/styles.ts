import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { ISelectedProfessor } from '../../services/database/professors/professors.interface';

interface ProfessorContainerProps {
    selected: boolean;
}

interface ProfessorNameProps {
    selected: boolean;
}

interface TurnContainerProps {
    selected: boolean;
}

interface TurnTextProps {
    selected: boolean;
}


export const Container = styled.View`
    flex:1 
`
export const Header = styled.View`
    padding: 24px;
    background: #232129;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    
`
export const BackButton = styled.TouchableOpacity`
`
export const HeaderTitle = styled.Text`
    color: #F4EDE8;
    font-family: 'RobotoSlab-Medium';
    font-size: 20px;
    margin-left: 16px;
`
export const UserAvatar = styled.Image`
    width: 56px;
    height: 56px;
    border-radius: 28px;
    margin-left: auto 
`
export const ProfessorListContainer = styled.View`
    height: 112px; 
`

export const ProfessorList = styled(FlatList as new () => FlatList<ISelectedProfessor>)`
    padding: 32px 24px;
`

export const ProfessorContainer = styled(RectButton) <ProfessorContainerProps>`
    background: ${(props) => (props.selected ? '#04D361' : '#232129')};
    flex-direction: row;
    padding: 8px 12px;
    align-items: center;
    margin-right: 16px;
    border-radius: 10px; 
`
export const ProfessorAvatar = styled.Image`
    width: 32px;
    height: 32px;
    border-radius: 16px;
   
`
export const ProfessorName = styled.Text<ProfessorNameProps>`
    margin-left: 8px;
    font-family: 'RobotoSlab-Medium';
    font-size: 16px;
    color: ${(props) => (props.selected ? '#232129' : '#F4EDE8')};
`

export const ScheduleButton = styled(RectButton) <TurnContainerProps>`
    background: ${(props) => (props.selected ? '#04D361' : '#232129')};
    opacity: ${(props) => props.enabled ? '1' : '0.5'}
    height: 64px;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    margin: 0 24px;
    margin-bottom: 24px;
`
export const ScheduleButtonText = styled.Text <TurnTextProps>`
    font-family: 'RobotoSlab-Medium';
    font-size: 16px;
    color: ${(props) => (props.selected ? '#232129' : '#F4EDE8')};
`

export const Calendar = styled.View`
  
`
export const Title = styled.Text`
    font-family: 'RobotoSlab-Medium';
    color: #F4EDE8;
    font-size: 24px;
    margin: 0 24px 24px;
`

export const RestButton = styled(RectButton)`
    height: 64px;
    background: ${(props) => (props.enabled ? '#232129' : '#232129')};
    opacity: ${(props) => props.enabled ? '1' : '0.5'};
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    margin: 0 24px;
    margin-top:25px;
    margin-bottom: 32px;
`
export const RestButtonText = styled.Text`
    font-family: 'RobotoSlab-Medium';
    font-size: 16px;
    color: #F4EDE8
`