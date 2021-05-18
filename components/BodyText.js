import React from 'react';
import {Text,StyleSheet} from 'react-native';

const BodyText = props =>{
    return <Text style={{...props.style,...styles.bodyText}}>{props.children}</Text>
}

const styles = StyleSheet.create({
    bodyText:{
        color:'#888',
        fontSize: 14
    }
});


export default BodyText;