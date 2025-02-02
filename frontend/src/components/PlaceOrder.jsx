import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '../auth/config';
import { MaterialIcons, Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const DetailRow = ({ icon, label, value }) => (
    <View style={styles.detailRow}>
        <View style={styles.labelContainer}>
            {icon}
            <Text style={styles.label}>{label}</Text>
        </View>
        <Text style={styles.value}>{value || 'Empty'}</Text>
    </View>
);

const PlaceOrder = () => {
    const { params } = useRoute();
    const { materialId } = params;
    const [material, setMaterial] = useState({});

    const getMaterialDetail = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/materials/getMaterial/${materialId}`);
            setMaterial(response.data.data);
            // console.log(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(); // Formats the date in a readable format (e.g., "1/31/2025")
    };

    useEffect(() => {
        getMaterialDetail();
    }, []);

    return (
            
        <ScrollView style={styles.container}>
             <View >
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
                    value={material.Quantity ? `${material.Quantity} Nos` : null}
                />

                

                <DetailRow
                    icon={<FontAwesome5 name="money-bill-wave" size={20} color="#666" />}
                    label="Unit Price"
                    value={material.unitPrice}
                />

                <DetailRow
                    icon={<MaterialIcons name="description" size={24} color="#666" />}
                    label="Specifications"
                    value={material.Description}
                    />

                <DetailRow
                    icon={<MaterialIcons name="event" size={24} color="#666" />}
                    label="Last Received"
                    value={formatDate(material.lastRecieved)}
                    />
            </View>

            <TouchableOpacity
                            style={[styles.button]}            
                            >
                            <Text style={[styles.buttonText]} >
                                Place Order
                            </Text>
                        </TouchableOpacity>
            
        </ScrollView >
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
    vendor:{
        flexDirection:'row',
        gap:73,
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    label: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
        marginBottom:23,
    },
    value: {
        fontSize: 16,
        color: '#666',
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
});