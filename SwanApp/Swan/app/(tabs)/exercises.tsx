import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { addExercise, getAllExercises } from '@/lib/dbInteraction';

export default function ExercisesScreen() {
    const [exercises, setExercises] = useState<
        { exercise_id: number; exercise_name: string }[]
    >([]);
    const [showInput, setShowInput  ] = useState(false);
    const [exerciseName, setExerciseName ] = useState('');
    
    const handleAddExercise = async () => {
        try {
            addExercise(exerciseName);
            alert('Added exercise');
            setShowInput(false);
            setExercises(getAllExercises());
        } catch (error){
            console.error('Error: ', error);
            alert('Error');
        }
    };

    useEffect(() => {
        const data = getAllExercises();
        setExercises(data);
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Exercises Tab</Text>
            <TouchableOpacity style={styles.button} onPress={() =>  setShowInput(!showInput)}>
                <Text style={styles.text}>Add exercise</Text>
            </TouchableOpacity>
            {showInput && (
                <View style={styles.inputBlock}>
                    <TextInput
                        style={styles.input}
                        placeholder='Input name'
                        placeholderTextColor='#aaa'
                        value={exerciseName}
                        onChangeText={setExerciseName}
                    />
                    <TouchableOpacity style={styles.confirmButton} onPress={handleAddExercise}>
                        <Text style={styles.text}>Submit</Text>
                    </TouchableOpacity>
                </View>
            )}
            <FlatList
                data={exercises}
                keyExtractor={(item) => item.exercise_id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.textId}>
                            Id: {item.exercise_id}
                        </Text>
                        <Text style={styles.text}>
                            {item.exercise_name}
                        </Text>
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
        //marginTop: 12,
    },
    input: {
        backgroundColor: '#393E46',
        color: 'white',
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
    },
    confirmButton: {
        backgroundColor: '#393e46',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 12,
    },
});
