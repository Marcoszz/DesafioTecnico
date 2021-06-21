import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 0 30px 100px;
`;

export const Title = styled.Text`
    font-size: 20px;
    color: #F4EDE8;
    font-family: 'RobotoSlab-Medium';
;`;

export const UserAvatar = styled.Image`
    width: 200px;
    height: 200px;
    border-radius: 98px;
    margin-top: 128px;
    align-self: center;
`
export const BackButton = styled.TouchableOpacity`
    position: absolute;
    left: 24px;
    top: 24px;
`
export const LogOutButton = styled.TouchableOpacity`
    position: absolute;
    left: 390px;
    top: 24px;
`