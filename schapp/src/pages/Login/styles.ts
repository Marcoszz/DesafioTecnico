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

export const CrtAccButton = styled.TouchableOpacity`
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    background: #232129;
    border-top-width: 1px;
    border-color: #232129;
    padding: 16px 0;

    display: flex;
    justify-content: center;
    align-items:center;
    flex-direction:row;
`;

export const CrtAccButtonText = styled.Text`
    color: #F4EDE8;
    font-family: 'RobotSlab-Regular';
    font-size: 14px;
    margin-left: 16px;
`;