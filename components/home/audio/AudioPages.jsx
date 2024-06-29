import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { Audio } from 'expo-av';
import { useRouter } from 'expo-router';
import { COLORS , icons , images , SIZES , FONT} from '../../../constants';
import axios from 'axios';

export default function AudioPages() {
    const [response, setResponse] = useState();
    const [recording, setRecording] = useState();
    const [permissionResponse, requestPermission] = Audio.usePermissions();
    const [sound, setSound] = useState(null);
    const [lastSoundUrl, setLastSoundUrl] = useState("");
    const router = useRouter();

    async function sendAudioFile(uri) {
        const formData = new FormData();

        formData.append('file', {
            uri: uri,
            type: 'audio/m4a',
            name: uri.split('/').pop(),
        });

        try {
            const responses = await axios({
                method: 'post',
                url: `https://ekww0wc.akunlain.my.id/predict`,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (responses.status !== 200) {
                throw new Error(`HTTP error! status: ${responses.status}`);
            }

            const data = await responses.data.prediction;
            setResponse(data);
        } catch (error) {
            console.error('There was a problem with the fetch operation: ', error.message);
        }
    }

    async function startRecording() {
        try {
            if (permissionResponse.status !== 'granted') {
                console.log('Requesting permission..');
                await requestPermission();
            }
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            console.log('Starting recording..');
            const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
            setRecording(recording);
            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        console.log('Stopping recording..');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
        });
        const uri = recording.getURI();

        setLastSoundUrl(uri);
        sendAudioFile(uri);
    }

    async function playRecording() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(
            {
                uri: lastSoundUrl
            },
            { shouldPlay: true }
        );
        setSound(sound);

        console.log('Playing Sound');
        await sound.playAsync();
    }

    async function stopPlayback() {
        console.log('Stopping Sound');
        if (sound) {
            await sound.stopAsync();
            await sound.unloadAsync();
            setSound(null);
        }
    }

    useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    return (
        <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Spelling</Text>
        </View>  
        <View style={styles.container}>
            {/* <Button title="Back" onPress={() => router.back()} /> */}
            {response && response.length == 1 ? <Text style={styles.mainText}>{response}</Text> : <Text>Press the button to start recording</Text>}
            <View>
                <Button
                    title={recording ? 'Stop Recording' : 'Start Recording'}
                    onPress={recording ? stopRecording : startRecording}
                />
                <Button
                    title={sound ? 'Stop Playback' : 'Play Recording'}
                    onPress={sound ? stopPlayback : playRecording}
                    disabled={!lastSoundUrl}
                />
            </View>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainText: {
        fontSize: 64,
        color: 'black',
    },
    container: {
        marginTop: SIZES.xLarge,
      },
      header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
      headerTitle: {
        fontSize: SIZES.large,
        fontFamily: FONT.medium,
        color: COLORS.primary,
      },
});
