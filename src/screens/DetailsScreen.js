import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { ImageBackground } from "react-native";
import Carousel from "react-native-snap-carousel";
import { Icon, Rating } from "react-native-elements";
import Modal from "../components/common/Modal";
import Video from "../components/common/Video";
import Location from "../components/common/Location";
export default function DetailsScreen(props) {
  const { navigation } = props;
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setrenderComponent] = useState(null);
  const onClose = () => setShowModal((prevState) => !prevState);

  const carousel = useRef();
  const getPlaces = async () => {
    try {
      const response = await fetch(
        "http://192.168.62.185:3000/travel/api/place",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPlaces();
  }, []);
  const renderItem = ({ index, item } /*props */) => {
    //const {index,item}=props;

    /*const rtComplete=(rating)=>{
        console.log("NV RT:", rating)
      }*/
       const playVideo=(linkVideo)=>{
        setrenderComponent(<Video linkVideo={linkVideo}/>)
        onClose();
       }
       const showLocation=()=>{
        setrenderComponent(<Location/>)
        onClose();
       }
       
    return (
      <View style={styles.card}>
        <Image style={styles.img} source={{ uri: item.image }} />
        <View style={styles.icons}>
          <Icon 
          type="material-community"
          name="youtube"
          color="red"
          size={50}
          onPress={()=>playVideo(item.video)}
          />
          <Icon 
          type="material-community"
          name="google-maps"
          color="#0D5BD7"
          size={50}
          onPress={showLocation}
          />
        </View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Rating
          type="star"
          startingValue={parseFloat(item.rating)}
          fractions={1}
          imageSize={30}
          style={styles.rating}
          readonly={true}
          //onFinishRanting={rtComplete}
        />
        <Text style={styles.points}> Calificcion: {item.rating}/5</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text>Aqui van los lugares </Text>
      <ImageBackground
        resizeMode="cover"
        style={styles.background}
        source={require("../../assets/imagenes/background.jpg")}
      >
        <Carousel
          layout="stack"
          ref={carousel}
          sliderWidth={400}
          itemWidth={400}
          onSnapToItem={(index) => setActiveIndex({ activeIndex: index })}
          data={data}
          renderItem={renderItem}
        />
      </ImageBackground>
      {renderComponent&&(
        <Modal visible={showModal} close={onClose}>
          {renderComponent}
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: "center",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 40,
    height: "auto",
    padding: 40,
    marginTop: 10,
    marginHorizontal: 25,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#0D5BD7",
  },
  img: {
    height: "50%",
    width: "90%",
    borderRadius: 5,
  },
  name: {
    fontSize: 25,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
  },
  rating: {
    paddingVertical: 10,
  },
  points: {
    fontSize: 12,
    fontWeight: "bold",
  },
  icons:{
    flexDirection:"row",
    justifyContent:"space-between",
    width:"45%",
  },  
});
