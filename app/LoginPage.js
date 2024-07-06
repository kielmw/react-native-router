// // app/LoginPage.js
// import React, { useState } from 'react';
// import { View, TextInput, Button } from 'react-native';

// const LoginPage = ({ setUsername }) => {
//     const [inputUsername, setInputUsername] = useState('');
//     const [inputPassword, setInputPassword] = useState('');

//     const handleLogin = () => {
//         setUsername(inputUsername);
//     };

//     return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             <TextInput
//                 placeholder="Enter Username"
//                 value={inputUsername}
//                 onChangeText={setInputUsername}
//                 style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, width: '80%', paddingHorizontal: 10 }}
//             />
//             <TextInput
//                 placeholder="Enter Password"
//                 value={inputPassword}
//                 onChangeText={setInputPassword}
//                 secureTextEntry
//                 style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, width: '80%', paddingHorizontal: 10 }}
//             />
//             <Button title="Login" onPress={handleLogin} />
//         </View>
//     );
// };

// export default LoginPage;