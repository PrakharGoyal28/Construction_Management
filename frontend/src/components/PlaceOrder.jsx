import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '../auth/config';
import { MaterialIcons, Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../auth/Auth';

const DetailRow = ({ icon, label, value, onChangeText, editable = false }) => (
    <View style={styles.detailRow}>
        <View style={styles.labelContainer}>
            {icon}
            <Text style={styles.label}>{label}</Text>
        </View>
        {editable ? (
            <TextInput
                style={[styles.value, styles.input]}
                value={String(value)}
                onChangeText={onChangeText}
            />
        ) : (
            <Text style={styles.value}>{value || 'Empty'}</Text>
        )}
    </View>
);

const PlaceOrder = () => {
    const { params } = useRoute();
    const { materialId } = params;
    const [material, setMaterial] = useState({});
    const [formData, setFormData] = useState({
        Quantity: '',
        unitPrice: '',
        Description: ''
    });
    const { user } = useContext(AuthContext);
    const navigation = useNavigation();

    const getMaterialDetail = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/materials/getMaterial/${materialId}`);
            const materialData = response.data.data;
            setMaterial(materialData);
            // Initialize form data with material values
            setFormData({
                Quantity: String(materialData.Quantity || ''),
                unitPrice: String(materialData.unitPrice || ''),
                Description: materialData.Description || ''
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handlePlaceOrder = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/materials/addMaterial`, {
                Name: material.Name,
                userId: user._id,
                UserId: user._id,
                VendorID: material.VendorID.UserID._id,
                Quantity: Number(formData.Quantity),
                Description: formData.Description,
                unit: material.unit,
                unitPrice: Number(formData.unitPrice),
                location: material.location,
                lastRecieved: material.lastRecieved,
                type: "Recieve",
                Recieve: "ForApproval"
            });
            ToastAndroid.show("Order Placed", ToastAndroid.SHORT);
            navigation.goBack();
        } catch (error) {
            ToastAndroid.show("Error Placing Order", ToastAndroid.SHORT);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    useEffect(() => {
        getMaterialDetail();
    }, []);

    return (
        <ScrollView style={styles.container}>
            <View>
                <View style={styles.vendor}>
                    <Text style={styles.label}>Vendor Name:</Text>
                    <Text style={styles.value}>{material.VendorID?.UserID?.name || "N/A"}</Text>
                </View>
                <View style={styles.vendor}>
                    <Text style={styles.label}>Contact Number:</Text>
                    <Text style={styles.value}>{material.VendorID?.UserID?.contact || "12345"}</Text>
                </View>
            </View>

            <View style={styles.card}>
                <DetailRow
                    icon={<MaterialIcons name="format-list-numbered" size={24} color="#666" />}
                    label="Quantity"
                    value={formData.Quantity}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, Quantity: text }))}
                    editable={true}
                />

                <DetailRow
                    icon={<FontAwesome5 name="money-bill-wave" size={20} color="#666" />}
                    label="Unit Price"
                    value={formData.unitPrice}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, unitPrice: text }))}
                    editable={true}
                />

                <DetailRow
                    icon={<MaterialIcons name="description" size={24} color="#666" />}
                    label="Specifications"
                    value={formData.Description}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, Description: text }))}
                    editable={true}
                />

                <DetailRow
                    icon={<MaterialIcons name="event" size={24} color="#666" />}
                    label="Last Received"
                    value={formatDate(material.lastRecieved)}
                />
            </View>

            <TouchableOpacity
                style={[styles.button]}
                onPress={handlePlaceOrder}
            >
                <Text style={[styles.buttonText]}>
                    Place Order
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};
export default PlaceOrder;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    card: {
        backgroundColor: '#f7f7f7',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: '#F2F2F2',
        paddingHorizontal: 12,
        marginVertical: 6,
    },
    vendor: {
        flexDirection: 'row',
        gap: 73,
        marginBottom: 20,
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        flex: 1,  // Added flex to ensure proper spacing
    },
    label: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
    },
    value: {
        fontSize: 16,
        color: '#666',
        flex: 1,  // Added flex to ensure proper spacing
    },
    divider: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginVertical: 8,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#666',
        marginTop: 10,
    },
    vendorValue: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
        marginBottom: 10,
    },
    orderDetailsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    button: {
        marginTop: 20,
        width: 200,
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: 'black',
        borderRadius: 25,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        padding: 8,
        flex: 1,
        marginLeft: 8,
    }
});