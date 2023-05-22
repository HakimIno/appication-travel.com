import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native'
import { HeaderBack } from '../components/shared/headerBack'
import { COLORS } from '../constants'
import { SIZES, SPACING } from '../constants/theme'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../types'
import { auth } from '../config/config'
import { sendPasswordResetEmail } from 'firebase/auth'

type ForgotPasswordScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "ForgotPassword"
>;

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState("");

    const navigation = useNavigation<ForgotPasswordScreenNavigationProp>()

    const handleResetPassword = async () => {
        try {
            await sendPasswordResetEmail(auth, email);

            Alert.alert('Password Reset Email Sent', 'Please check your email to reset your password.');
        } catch (error) {
            Alert.alert(`Error: ${error}`);
        }
    };

    return (
        <View style={styles.container}>
            <HeaderBack onPress={() => navigation.goBack()} />

            <View style={{}}>
                <Text style={[styles.textTitle, { textAlign: "center" }]}>
                    รีเซ็ตรหัสผ่าน
                </Text>

                <View style={[styles.containerInput, { alignItems: "center" }]}>
                    <TextInput
                        style={[styles.EmailInputStyle]}
                        value={email}
                        keyboardType="email-address"
                        placeholder="Email"
                        onChangeText={setEmail}
                    />

                </View>
            </View>

            <TouchableOpacity onPress={handleResetPassword}>
                <View
                    style={[
                        styles.btnContinue,
                        {
                            backgroundColor: "#34d399",
                            marginVertical: SPACING.l + SPACING.l
                        },
                    ]}
                >
                    <Text style={styles.textContinue}>รีเซ็ตรหัสผ่าน</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default ForgotPasswordScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    textTitle: {
        fontSize: 15,
        marginTop: SPACING.l * 2,
        marginVertical: SPACING.l,
        color: COLORS.black,
        fontFamily: "SukhumvitSet-Bold",
    },
    containerInput: {
        flexDirection: "row",
        marginHorizontal: SPACING.l,
        paddingHorizontal: SPACING.m,
        borderRadius: SIZES.radius + 5,
        backgroundColor: COLORS.white,
        alignItems: "center",
        borderWidth: 0.5,
        borderColor: COLORS.slate,
    },
    EmailInputStyle: {
        flex: 1,
        marginLeft: 5,
        height: 45,
        color: COLORS.slate,
        fontFamily: "SukhumvitSet-SemiBold",
    },
    btnContinue: {
        paddingVertical: SPACING.s + 2,
        marginHorizontal: SPACING.l,
        marginVertical: SPACING.s,
        borderRadius: SIZES.radius + 5,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    textContinue: {
        color: "#ffffff",
        textAlign: "center",
        fontWeight: "600",
    },
})