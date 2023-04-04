import { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { scale } from "react-native-size-matters";

const MIN_RANDOM_NUMBER = 10;
const MAX_RANDOM_NUMBER = 300;

export default function App() {
    const [serviceCost, setServiceCost] = useState(0);
    const [billAmount, setBillAmount] = useState("");
    const [total, setTotal] = useState("");
    const [tipPercent, setTipPercentage] = useState(10);
    const [tipAmount, setTipAmount] = useState(0);
    const refInput = useRef(null);

    const generateRandomNumber = () => {
        const rn = Math.floor(Math.random() * MAX_RANDOM_NUMBER) + MIN_RANDOM_NUMBER;
        setServiceCost(rn);
    };


    useEffect(() => {
        // console.log("useEffect is running")
        const tempTipAmount = (Number(serviceCost) * (Number(tipPercent) / 100));
        const tempTotal = (Number(serviceCost) + Number(tempTipAmount));
        setTipAmount(tempTipAmount.toFixed(2));
        setTotal(tempTotal.toFixed(2));
        if (Number(serviceCost) === 0)
            setBillAmount("");
        else
            setBillAmount(Number(serviceCost).toFixed(2))
    }, [serviceCost, tipPercent]);


    const changeServiceCost = incoming => {
        try {
            // console.log("incoming: ", incoming, billAmount) //, Number(incoming))
            // // const temp = Number(incoming);
            // console.log("temp= ", incoming.length)
            if (incoming === 0 || (!Number(incoming)))
                setServiceCost(0);
            if (incoming !== "0.00")
                setServiceCost(incoming);
        } catch(err) {
            console.log("error: ", err.message || err);
        }
    }

    
    const clearAction = () => {
        setServiceCost("");
        refInput.current.focus();
    }


    return (
    <View style={styles.container}>
        <Text style={styles.title}>Calculate Tip</Text>
        <Button style={styles.randomButton} onPress={() => generateRandomNumber()} title="Generate random Tip"></Button>
        <View style={styles.inputContainer}>
            <Text style={styles.inputItem1}>$</Text>
            {/* <Text>@</Text> */}
            <TextInput style={styles.textInput} keyboardType='number-pad' 
                    onChangeText={n => changeServiceCost(n)} ref = {refInput}
            >{serviceCost}</TextInput>
            <View style={styles.buttonClearSection}>
                <Button style={styles.clearButton} title='Clear' color={`#b22222`} onPress={clearAction}></Button>
            </View>
        </View>


        <View>
            <View>
                <Button title='B1'></Button>
                <Button title='B2'></Button>
            </View>
            <View>
                <Button title='B3'></Button>
                <Button title='B4'></Button>
            </View>
        </View>

        <Text style={styles.totalTexts}>Bill Amount: ${billAmount}</Text>
        <Text style={styles.totalTexts}>Tip Amount: ${tipAmount}</Text>
        <View style={styles.divider} />
        <Text style={styles.totalTexts}>Total: ${total}</Text>

    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        padding: scale(30),
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        backgroundColor: "darkseagreen"
        // justifyContent: 'center',
    },
    title: {
        paddingTop: scale(50),
        fontSize: scale(25),
        fontWeight: "bold",
        marginBottom: scale(30)
    },
    randomButton: {
        // marginTop: scale(50),
        backgroundColor: "red"
    },
    inputContainer: {
        // flex: 1,
        flexDirection: "row",
        width: "100%",
        marginTop: scale(50),
        backgroundColor: "red",
        height: scale(70)
    },
    inputItem1: {
        paddingLeft: scale(20),
        color: "white",
        fontSize: scale(30),
        textAlignVertical: "center"
    },
    textInput: {
        flex: 1,
        paddingLeft: scale(40),
        color: "white",
        fontSize: scale(30),
        textAlignVertical: "center",
    },
    buttonClearSection: {
        // flexDirection: "column",
        // flex: 1,
        padding: 0,
        // backgroundColor: "gray",
        // padding: 0,
        // flex: 1,
        // height: scale(70),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#b22222"
    },
    clearButton: {
        backgroundColor: "#b22222",
        // display: "flex",
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // margin: 0,
        // padding: scale(50),

        // flex: 1,
        // height: scale(70)
        textAlignVertical: "center"
        // height: "100%",
        // width: "15%",
        // flexDirection: "column",
        // // color: '#000000',
        // textAlign: 'center',
        // // alignSelf: 'center',
        // justifyContent: 'center',
        // alignItems: 'center',
        // textAlignVertical: 'center',
        // alignContent: 'center'

        // verticalAlign: "middle",
        // alignSelf: "center"
        // alignContent: "center"
        // alignItems: "center"
        // textAlignVertical: "center"
    },


    totalTexts: {
        // display: "flex",
        justifyContent: "flex-end",
        fontSize: scale(25),
        fontWeight: "bold",

    },
    divider: {
        width: "100%",
        borderBottomColor: 'lightgray',
        borderBottomWidth: scale(5)
    }
});
