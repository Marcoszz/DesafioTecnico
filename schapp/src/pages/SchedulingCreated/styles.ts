import { RectButton } from 'react-native-gesture-handler'
import styled from 'styled-components/native'

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 0 24px;
`
export const Title = styled.Text`
    font-size: 24px;
    color: #F4EDE8;
    font-family: 'RobotoSlab-Medium';
    margin-top: 48px;
    text-align: center;
` 
export const Description = styled.Text`
    font-size: 16px;
    color: #F4EDE8;
    font-family: 'RobotoSlab-Regular';
    margin-top: 16px;
`  
export const OkButton = styled(RectButton)`
    background: #232129;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    margin-top: 24px
    padding: 12px 24px;
`  

export const OkButtonText = styled.Text`
    font-size: 18px;
    color: #F4EDE8;
    font-family: 'RobotoSlab-Medium';
` 
