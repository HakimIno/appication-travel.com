import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SectionHeader from '../components/shared/section-header'
import { COLORS, SIZES } from '../constants'
import { SPACING } from '../constants/theme'

const AboutScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ alignItems: 'center', marginTop: SPACING.l }}>
                <View style={{ backgroundColor: COLORS.primary, width: 100, height: 100, borderRadius: SIZES.radius + 15, elevation: 5 }}>
                    <Image source={require('../assets/images/splash/splash.png')} style={{ width: 100, height: 100 }} />
                </View>
                <Text style={[styles.summaryText, { color: COLORS.primary }]}>Aumanan Juket</Text>
                <Text style={[styles.summaryText, { color: COLORS.slate, fontSize: 10 }]}>เวอร์ชั่น 1.0.0</Text>
            </View>
            <View style={{ marginTop: SPACING.xl , alignItems: 'center'}}>
                <Text style={[styles.summaryText, {  fontSize: 15 ,fontFamily: "SukhumvitSet-Bold",  }]}>เกี่ยวกับเรา</Text>
                <View style={{ height: 3, backgroundColor: COLORS.primary, width: 100 }} />
                <View style={styles.summary}>

                    <Text style={[styles.summaryText, { fontSize: 12 }]}>
                        แอพพลิเคชั่นเรามีการบริการจองทัวร์กับการจองโรงแรมในราคาสุดพิเศษ มีการชำระเงินผ่าน PDF เพื่อนำไปสแกนเพื่อชำระเงิน
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default AboutScreen

const styles = StyleSheet.create({
    summary: {
        flexGrow: 1,
        marginHorizontal: SPACING.xl,
        marginVertical: SPACING.l,
    },
    summaryText: {
        fontSize: 12,
        color: COLORS.black,
        fontFamily: "SukhumvitSet-SemiBold",
    },
})