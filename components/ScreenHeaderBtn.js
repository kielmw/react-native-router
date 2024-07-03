import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const ScreenHeaderBtn = ({ iconUrl, dimension }) => (
    <TouchableOpacity style={styles.btnContainer}>
        <Image 
            source={iconUrl} 
            resizeMode="cover" 
            style={{ width: dimension, height: dimension }} 
        />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    btnContainer: {
        padding: 10,
    },
});

export default ScreenHeaderBtn;
