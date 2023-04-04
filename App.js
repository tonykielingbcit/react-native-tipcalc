import { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { scale } from "react-native-size-matters";
import { RadioButton } from 'react-native-paper';

const MIN_RANDOM_NUMBER = 10;
const MAX_RANDOM_NUMBER = 300;

const buttons = [
    {
        value: 10
    },
    {
        value: 15
    },
    {
        value: 18
    },
    {
        value: 20
    },
];

export default function App() {
    const [serviceCost, setServiceCost] = useState(0);
    const [billAmount, setBillAmount] = useState("");
    const [total, setTotal] = useState("");
    const [tipPercent, setTipPercent] = useState(10);
    const [tipAmount, setTipAmount] = useState(0);
    const refInput = useRef(null);

    const generateRandomNumber = () => {
        const rn = Math.floor(Math.random() * MAX_RANDOM_NUMBER) + MIN_RANDOM_NUMBER;
        setServiceCost(rn);
    };


    useEffect(() => {
        const tempTipAmount = (Number(serviceCost) * (Number(tipPercent) / 100));
        const tempTotal = (Number(serviceCost) + Number(tempTipAmount));
        setTipAmount(tempTipAmount.toFixed(2));
        setTotal(tempTotal.toFixed(2));
        if (Number(serviceCost) === 0)
            setBillAmount("0.00");
        else
            setBillAmount(Number(serviceCost).toFixed(2))
    }, [serviceCost, tipPercent]);


    const changeServiceCost = incoming => {
        try {
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
        <Button onPress={generateRandomNumber} title="Generate random Tip"></Button>

        <Text style={styles.costLabel}>Cost of Service</Text>
        <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
                    <Text style={styles.inputItem1}>$</Text>
                    <TextInput 
                        keyboardType='number-pad' 
                        onChangeText={n => changeServiceCost(n)} ref = {refInput}
                        style={styles.textInput} 
                    >
                        {serviceCost}
                    </TextInput>
                </View>

            <View style={styles.buttonClearSection}>
                <Button style={styles.clearButton} title='Clear' color={`#b22222`} onPress={clearAction}></Button>
            </View>
        </View>


        <View style={styles.percentageContainer}>
            <View style={styles.rowPercentages}>
                <RadioButton.Item
                    label={`${buttons[0].value}%`}
                    value={buttons[0].value}
                    status={tipPercent === buttons[0].value ? "checked" : "unchecked"}
                    onPress={() => setTipPercent(buttons[0].value)}
                    style={{
                        ...styles.rowPercentagesItems,
                        backgroundColor: tipPercent === buttons[0].value ? "lightblue" : "darkseagreen"}}
                />
                <RadioButton.Item
                    label={`${buttons[1].value}%`}
                    value={buttons[1].value}
                    status={tipPercent === buttons[1].value ? "checked" : "unchecked"}
                    onPress={() => setTipPercent(buttons[1].value)}
                    style={{
                        ...styles.rowPercentagesItems, 
                        backgroundColor: tipPercent === buttons[1].value ? "lightblue" : "darkseagreen"}}
                />
            </View>
            <View style={styles.rowPercentages}>
                <RadioButton.Item
                    label={`${buttons[2].value}%`}
                    value={buttons[2].value}
                    status={tipPercent === buttons[2].value ? "checked" : "unchecked"}
                    onPress={() => setTipPercent(buttons[2].value)}
                    style={{
                        ...styles.rowPercentagesItems, 
                        backgroundColor: tipPercent === buttons[2].value ? "lightblue" : "darkseagreen"}}
                />
                <RadioButton.Item
                    label={`${buttons[3].value}%`}
                    value={buttons[3].value}
                    status={tipPercent === buttons[3].value ? "checked" : "unchecked"}
                    onPress={() => setTipPercent(buttons[3].value)}
                    style={{
                        ...styles.rowPercentagesItems, 
                        backgroundColor: tipPercent === buttons[3].value ? "lightblue" : "darkseagreen"}}
                />
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
        paddingTop: scale(40),
        fontSize: scale(30),
        fontWeight: "bold",
        marginBottom: scale(30)
    },
    costLabel: {
        marginTop: scale(35),
        textAlign:"center",
        fontSize: scale(15),
        fontWeight: "bold"
    },
    inputContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        // marginTop: scale(40),
        height: scale(70)
    },
    inputSubContainer: {
        flexDirection: "row",
        flex: 1,
        marginRight: scale(10),
        backgroundColor: "lightgrey",
        borderRadius: scale(10)
    },
    inputItem1: {
        paddingLeft: scale(20),
        color: "white",
        fontSize: scale(30),
        textAlignVertical: "center",
        color: "black"
    },
    textInput: {
        flex: 1,
        paddingLeft: scale(40),
        color: "white",
        fontSize: scale(30),
        textAlignVertical: "center",
        color: "black",
        fontWeight: "bold"
    },
    buttonClearSection: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "darkseagreen",
    },
    clearButton: {
        backgroundColor: "#b22222",
        textAlignVertical: "center",
    },

    percentageContainer: {
        marginVertical: scale(35),
        marginBottom: scale(40)
    },
    rowPercentages: {
        flexDirection: "row",
    },
    rowPercentagesItems: {
        backgroundColor: "darkseagreen",
        borderRadius: scale(20),
        fontSize: scale(30),
        margin: scale(5)
    },

    totalTexts: {
        marginLeft: "auto",
        fontSize: scale(25),
        fontWeight: "bold",
    },
    divider: {
        width: "100%",
        borderBottomColor: 'lightgray',
        borderBottomWidth: scale(5),
        marginVertical: scale(10)
    }
});
