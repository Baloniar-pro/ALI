import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, Text, View } from "react-native";
import type { RootStackParamList } from "../navigation/types";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation, route }: HomeScreenProps) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
      }}
    >
     
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 47,
          marginHorizontal: 16,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Entypo name="wallet" size={35} color="#183b34" />
          <Text style={{ color: "#183b34", fontSize: 15 }}>Hello, Baloniar</Text>
        </View>
        <Image
          source={require("../../assets/images/user.png")}
          style={{ height: 25, width: 30, resizeMode: "contain" }}
        />
      </View>
      <View style={{backgroundColor:"#183b34", borderRadius:15,marginTop:20,height:150,width:"95%",marginLeft:8}}>
        <View style={{flexDirection:"row",marginTop:10,gap:5}}>

        <Text style={{color:"white",marginLeft:10,}}>Total Balance
         </Text>
          <Ionicons name="eye-outline" size={17} color="white" />
        </View>
<Text style={{color:"white",fontSize:28,marginLeft:10,fontWeight:"bold",marginTop:2}}>₦15,500.OO</Text>
<Text style={{color:"white",marginLeft:10}}>≈$11.80 USD</Text>
<View style={{flexDirection:"row",marginTop:15,justifyContent:"space-evenly"}}>

<View style={{backgroundColor:"white",height:35,width:"45%",borderRadius:16,
  justifyContent:"center",flexDirection:"row",gap:7,paddingTop:7,paddingRight:5}}>
  <Entypo name="paper-plane" size={20} color="#183b34" />
  <Text style={{fontWeight:"bold",color:"#183b34"}}>Send</Text></View>
<View style={{backgroundColor:"white",height:35,width:"45%",borderRadius:16,justifyContent:"center",flexDirection:"row",gap:5,paddingTop:7}}>
  <MaterialIcons name="call-received" size={20} color="#183b34" /><Text style={{color:"#183b34",fontWeight:"bold"}}>Receive</Text></View>
</View>


      </View>

    </View>
  );
}