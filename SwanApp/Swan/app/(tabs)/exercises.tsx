import React, { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Animated, UIManager, LayoutAnimation,  Platform } from 'react-native';
import { addExercise, getAllExercises, deleteExercise } from '@/lib/dbInteraction';

export default function ExercisesScreen() {
    const [exercises, setExercises] = useState<
        { exercise_id: number; exercise_name: string }[]
    >([]);
    const [showInput, setShowInput  ] = useState(false);
    const [exerciseName, setExerciseName ] = useState('');
    const [selectedItem, setSelectedItem ] = useState(0);

    const inputOpacity = useRef(new Animated.Value(0)).current;
    
    const handleAddExercise = async () => {
        try {
            if (exerciseName == '') return;
            await addExercise(exerciseName);
            alert('Added exercise');
            setShowInput(false);
            setExercises(getAllExercises());
        } catch (error){
            console.error('Error: ', error);
            alert('Error');
        }
    };

    const handleDeleteExercise = async () => {
        try {
            await deleteExercise(selectedItem);
            alert('Deleted exercise');
            setSelectedItem(0);
            setExercises(getAllExercises());
        } catch (error) {
            console.error('Error: ',  error);
            alert('Error');
        }
    }

    useEffect(() => {
        const data = getAllExercises();
        setExercises(data);
    }, []);

    useEffect(() => {
        if (showInput) {
            Animated.parallel([
                Animated.timing(inputOpacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        } else{
            Animated.parallel([
                Animated.timing(inputOpacity, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [showInput]); 

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Exercises Tab</Text>
            <TouchableOpacity style={styles.button} onPress={() => setShowInput(!showInput)}>
                <Text style={styles.text}>Add exercise</Text>
            </TouchableOpacity>
            {showInput && (
                <Animated.View 
                    style={[styles.inputBlock,
                    { opacity: inputOpacity }]}
                >
                    <TextInput
                        style={styles.input}
                        placeholder='Input name'
                        placeholderTextColor='#393E46'
                        value={exerciseName}
                        onChangeText={setExerciseName}
                    />
                    <TouchableOpacity style={styles.confirmButton} onPress={handleAddExercise}>
                        <Text style={styles.text}>Submit</Text>
                    </TouchableOpacity>
                </Animated.View>
            )}
            <FlatList
                data={exercises}
                keyExtractor={(item) => item.exercise_id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        {selectedItem === item.exercise_id ? 
                            (
                                <TouchableOpacity
                                    onPress={() => setSelectedItem(0)}
                                >
                                    <Text style={styles.text}>
                                        {item.exercise_name}
                                    </Text>
                                    <Text style={styles.textId}>
                                        Id: {item.exercise_id}
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.deleteButton}
                                        onPress = {handleDeleteExercise}
                                    >
                                        <Text style={styles.text}>Delete</Text>
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            ) :
                            (
                                <TouchableOpacity
                                    onPress={() => setSelectedItem(item.exercise_id)}
                                >
                                    <Text style={styles.text}>
                                        {item.exercise_name}
                                    </Text>
                                </TouchableOpacity>
                            )
                        }
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222831',
        justifyContent: 'center',
        //alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 60,
    },
    text: {
        color: 'white',
        fontSize: 30,
    },
    button: {
        backgroundColor: '#948979',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 12,
    },
    textId: {
        color: 'white',
        fontSize: 20,
    },
    card: {
        backgroundColor: '#1c1c1e',
        borderRadius: 10,
        padding: 16,
        marginBottom: 12,
        width: '100%',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
    },
    inputBlock: {
        padding: 12,
        backgroundColor: '#393E46',
        marginBottom: 12,
        borderRadius: 10,
    },
    input: {
        backgroundColor: '#948979',
        color: '#222831',
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
    },
    confirmButton: {
        backgroundColor: '#DFD0B8',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 12,
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 12,
    },
});
