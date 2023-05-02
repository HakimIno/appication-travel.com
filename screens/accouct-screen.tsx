import { SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../constants';
import { Octicons } from '@expo/vector-icons';
import { SPACING } from '../constants/theme';
import { auth } from '../config/config';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type CurrentScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Root"
>;
const SettingsScreen = () => {
    const insets = useSafeAreaInsets();

    const navigation = useNavigation<CurrentScreenNavigationProp>();
    const handleLogout = () => {
        auth.signOut().
            then(() => {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                });
            })
            .catch(error => {
                console.log(error);
            });
        
      };
return (
    <View style={[styles.container, { marginTop: insets.top }]}>
        <View style={{ height: 100 }}>
        </View>
        <View>
            <SectionList
                sections={[
                    { title: '', data: ['รายการที่บันทึกไว้'], icon: "heart" },
                    {
                        title: '',
                        data: [
                            'ให้คะแนนแอพ',
                            'ฝ่ายบริการลูกค้า',
                            'เกี่ยวกับ travel.com',
                        ],
                        icons: [
                            "star",
                            "stop",
                            "comment-discussion"
                        ]
                    },
                ]}
                renderItem={({ item, section }: any) => <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, marginLeft: SPACING.s }}>
                    <Octicons name={section.icons ? section.icons.shift() : section.icon} size={20} color="black" />
                    <Text style={styles.item}>{item}</Text>
                </View>}
                renderSectionHeader={({ section }) => (
                    <View style={{ paddingVertical: 8, backgroundColor: 'rgba(247,247,247,1.0)', }}></View>
                )}
                keyExtractor={item => `basicListEntry-${item}`}
            />
        </View>

        <TouchableOpacity onPress={handleLogout}>
            <Text style={[styles.item, { textAlign: 'center', marginVertical: SPACING.l, color: COLORS.primary }]}>ออกจากระบบ</Text>
        </TouchableOpacity>
    </View>

)
}

export default SettingsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    sectionHeader: {
        paddingLeft: 10,
        paddingRight: 10,

        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        marginHorizontal: SPACING.l,
        fontSize: 15,
        fontFamily: "SukhumvitSet-SemiBold",

    },
})