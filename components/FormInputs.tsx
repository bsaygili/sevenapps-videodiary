import { useLocalSearchParams } from 'expo-router'
import { Formik } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import { Text, View, TextInput, CstmPressable } from './Themed'

const MetadataSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').max(15, "Name can't be more than 15 characters"),
    description: Yup.string().required('Description is required').max(15, "Description can't be more than 15 characters")
})

interface FormInputsProps {
    handleSubmit: (values: { name: string; description: string }) => void;
}

const FormInputs: React.FC<FormInputsProps> = ({ handleSubmit }) => {
    const { name, description } = useLocalSearchParams<{ name: string, description: string, video: string }>();
    return (
        <Formik
            className='flex w-[600px]'
            initialValues={{ name, description }}
            onSubmit={(values) => {
                handleSubmit(values)
            }}
        >
            {
                ({ values, setValues }) => (
                    <View className='flex w-[600px]'>
                        <View className='py-4'>
                            <Text>Name: </Text>
                            <TextInput defaultValue={values.name} onChangeText={val => setValues({ ...values, name: val })} inputMode="text" className="text-black dark:text-white  text-lg rounded-lg" placeholder='Please enter video name' />
                        </View>
                        <View className='py-4'>
                            <Text>Description: </Text>
                            <TextInput defaultValue={values.description} onChangeText={val => setValues({ ...values, description: val })} inputMode="text" className="text-black dark:text-white focus:border-1 text-lg rounded-lg" placeholder='Please enter video name' />
                        </View>
                        <View className="flex-1 items-center justify-center">
                            <CstmPressable className="p-4 rounded-xl" type="submit">
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
