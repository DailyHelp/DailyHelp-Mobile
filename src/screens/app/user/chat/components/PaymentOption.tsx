import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
  } from 'react-native';
import React from 'react'
import Typography from '../../../../../components/Typography';

  

  const PaymentOption: PaymentOptionProps = ({ 
    id, 
    icon, 
    title, 
    subtitle, 
    selected, 
    onPress 
  }) => {
  return (
    <TouchableOpacity
    style={styles.optionContainer}
    onPress={() => onPress(id)}
    activeOpacity={0.7}
  >
    <View style={styles.radioContainer}>
      <View style={[styles.radioOuter, selected && styles.radioSelected]}>
        {selected && <View style={styles.radioInner} />}
      </View>
    </View>
    
    <View style={styles.iconContainer}>
      <Text style={styles.icon}>{icon}</Text>
    </View>
    
    <View style={styles.textContainer}>
      <Typography color='#3B4152' fontWeight='regular' size='sm'>{title}</Typography>
      {subtitle && <Typography color='#757C91' size='md'>{subtitle}</Typography>}
    </View>
  </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    
    optionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 12,
    },
    radioContainer: {
      marginRight: 12,
    },
    radioOuter: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: '#ddd',
      alignItems: 'center',
      justifyContent: 'center',
    },
    radioSelected: {
      borderColor: '#4CAF50',
    },
    radioInner: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: '#4CAF50',
    },
    iconContainer: {
      marginRight: 12,
    },
    icon: {
      fontSize: 20,
    },
    textContainer: {
      flex: 1,
    },
  
  });
  
  
export default PaymentOption