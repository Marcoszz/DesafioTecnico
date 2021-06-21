import { FlatList } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { IProfessor } from '../../services/database/professors/professors.interface';
import { IUserSchedule } from '../../services/database/users/users.interface';

export const Container = styled.View`
    flex: 1;
`;

export const Header = styled.View`
    padding: 24px;
    background: #232129;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

`;

export const HeaderTitle = styled.Text`
    color: #F4EDE8
    font-size: 20px;
    font-family: 'RobotoSlab-Regular'
    line-height: 28px;
`;

export const UserName = styled.Text`
    color: #2D9CDB;
    font-family: 'RobotoSlab-Medium;

`;

export const ProfileButton = styled.TouchableOpacity`
    color: #2D9CDB;
    font-family: 'RobotoSlab-Medium;

`;

export const UserAvatar = styled.Image`
    width: 100px;
    height: 100px;
    border-radius: 28px;
`;

export const ProfessorList = styled(FlatList as new () => FlatList<IProfessor>)`
    padding: 32px 24px 16px;
    background: #2D9CDB;
`;

export const ProfessorContainer = styled(RectButton)`
    background: #232129;
    border-radius: 10px;
    padding: 20px
    margin-bottom: 16px;
    flex-direction: row;
    align-items: center;
`;

export const ProfessorAvatar = styled.Image`
    width: 90px;
    height: 90px;
    border-radius: 36px
`;

export const ProfessorInfo = styled.View`
    flex: 1;
    margin-left: 20px;
`;

export const ProfessorName = styled.Text`
    font-family: 'RobotoSlab-Medium';
    font-size: 18px;
    color: #F4EDE8

`;

export const ProfessorMeta = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 8px;
`;
export const ProfessorMetaText = styled.Text`
    margin-left: 8px;
    color: #F4EDE8;
    font-family: 'RobotoSlab-Regular';
`;

export const SchedulesList = styled(FlatList as new () => FlatList<IUserSchedule>)`
    padding: 32px 24px 16px;
    background: #2D9CDB;
`;

export const SchedulesContainer = styled(RectButton)`
    background: #232129;
    border-radius: 10px;
    padding: 20px
    margin-bottom: 16px;
    flex-direction: row;
    align-items: center;
`;

export const SchedulesAvatar = styled.Image`
    width: 90px;
    height: 90px;
    border-radius: 36px
`;

export const SchedulesInfo = styled.View`
    flex: 1;
    margin-left: 20px;
`;

export const SchedulesName = styled.Text`
    font-family: 'RobotoSlab-Medium';
    font-size: 18px;
    color: #F4EDE8
`;

export const SchedulesMeta = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 8px;
`;
export const SchedulesMetaText = styled.Text`
    margin-left: 8px;
    color: #F4EDE8;
    font-family: 'RobotoSlab-Regular';
`;

export const Spinner = styled.ActivityIndicator`
    flex: 1;
    alignContent: center;
    paddingTop: 300px;
`;