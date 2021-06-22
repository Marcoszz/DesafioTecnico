<h1 align="center">
    <img alt="MySched" src="https://ik.imagekit.io/marcosimgs/icon_fvHjv65kW9.png" width="250px" />
</h1>

<h1>Desafio Técnico - MySched</h1>

## Arquitetura
Esse é o aplicativo MySched. Uma plataforma de agendamento de aulas entre alunos e professores. Pelo aplicativo, você consegue se cadastrar, realizar seu login, ter uma visualização dos professores disponiveis e agendar aulas particulares com eles seguindo as regras de negócio é claro.  

A pasta possui uma API REST em Node.js + Express apenas para o auxilio do cadastro de professores, já que o aplicativo em si é exclusivamente pensado nos alunos. Uma aplicação em ReactNative como front-end/back-end dos alunos todos.

## Requisitos
- [**Git**](https://git-scm.com/) para o clone do projeto.
- Ter [**Node.js**](https://nodejs.org/en/) instalado.
- Um aparelho ou emulador iOS ou Android.

## Para usar o aplicativo:
```bash
  # Clonar o projeto:
  $ git clone https://github.com/Marcoszz/DesafioTecnico

  # Entrar no diretório:
  $ cd schapp

  # Instalar as dependências:
  $ yarn ou npm install

  # Habilitar o metro:
  $ npx react-native start
  
  # Carregar para o device:
  $ npx react-native run-android / npx react-native run-ios
  
  (LEMBRETE) É preciso habilitar o metro em um terminal e carregar os dados para o device em outro terminal (rodar o comando de habilitar/carregar em terminais separados)
```

## Para usar a API Rest:
```bash
  # Entrar no diretório:
  $ cd ProfessorAPI

  # Instalar as dependências:
  $ yarn ou npm install

  # Rodar a aplicação:
  $ npm start
```

## Tecnologias utilizadas:
* Front-end
  * React Native
  * TypeScript
  * Styled Components
  * Yup
  * StackNavigation
  * DateTimePicker
  * Unform
  * Date-fns
* Back-end
  * Firebase (Auth, db, Persistance) 
  * Real Time Database
  * MD5
