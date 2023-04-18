import { View } from "react-native"

interface Props { 
    height: number,
    width: number
}

export const Separator = (props: Props) => {
    return ( 
        <View  style={{height: props.height , width: props.width}} />
    )
}
