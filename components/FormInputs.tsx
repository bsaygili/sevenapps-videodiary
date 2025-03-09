import { useLocalSearchParams } from 'expo-router'
import { Formik } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import { Text, View, TextInput, CstmPressable } from './Themed'
import { StyleSheet, ScrollView } from 'react-native'

const MetadataSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').max(15, "Name can't be more than 15 characters"),
    description: Yup.string().required('Description is required').max(15, "Description can't be more than 15 characters")
})

interface FormInputsProps {
    handleSubmit: (values: { name: string; description: string }) => void;
    name?: string;
    description?: string;
}

const FormInputs: React.FC<FormInputsProps> = ({ handleSubmit, name, description }) => {
    return (
        <Formik
            className='mt-5 mb-5'
            initialValues={{ name: name || '', description: description || '' }}
            onSubmit={(values) => {
                handleSubmit(values)
            }}
        >
            {
                ({ values, setValues }) => (
                    <View className='flex justify-between items-center align-middle p-[20px] mb-5'>
                        <View style={{ marginVertical: 20, paddingHorizontal: 5 }} className='flex-row justify-center items-center align-middle px-1'>
                            {/* <Text>Name: </Text> */}
                            <TextInput style={styles.input} defaultValue={values.name} onChangeText={val => setValues({ ...values, name: val })} inputMode="text" placeholder="Name" />
                        </View>
                        <View style={{ marginVertical: 10, paddingHorizontal: 5 }} className='flex-row justify-center items-center align-middle px-1'>
                            {/* <Text>Description: </Text> */}
                            <TextInput style={styles.input} defaultValue={values.description} onChangeText={val => setValues({ ...values, description: val })} inputMode="text" placeholder="Description" />
                        </View>
                        <View style={{ margin: 50 }} className="flex items-center justify-center self-center">
                            <CstmPressable className="p-4 rounded-xl" onPress={() => handleSubmit(values)}>
                                <Text>Save Video Info</Text>
                            </CstmPressable>
                        </View>
                    </View>
                )
            }
        </Formik >
    )
}

export default FormInputs

const styles = StyleSheet.create({
    inputContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        verticalAlign: "middle",
        marginHorizontal: 15
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
        fontSize: 16,
    }


})
