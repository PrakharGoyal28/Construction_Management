import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '../auth/config';
import { MaterialIcons, Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

const DetailRow = ({ icon, label, value }) => (
    <View style={styles.detailRow}>
        <View style={styles.labelContainer}>
            {icon}
            <Text style={styles.label}>{label}</Text>
        </View>
        <Text style={styles.value}>{value || 'Empty'}</Text>
    </View>
);

const InventoryDetail = () => {
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

            <View style={styles.card}>
                <DetailRow
                    icon={<MaterialIcons name="format-list-numbered" size={24} color="#666" />}
                    label="Quantity"
                    value={material.Quantity ? `${material.Quantity} Nos` : null}
                />
                <View style={styles.divider} />

                <DetailRow
                    icon={<Ionicons name="location-outline" size={24} color="#666" />}
                    label="Location"
                    value={material.location}
                />
                <View style={styles.divider} />

                <DetailRow
                    icon={<FontAwesome5 name="money-bill-wave" size={20} color="#666" />}
                    label="Price"
                    value={material.unitPrice}
                />
                <View style={styles.divider} />

                <DetailRow
                    icon={<MaterialIcons name="description" size={24} color="#666" />}
                    label="Specifications"
                    value={material.Description}
                />
                <View style={styles.divider} />

                <DetailRow
                    icon={<MaterialIcons name="event" size={24} color="#666" />}
                    label="Last Received"
                    value={formatDate(material.lastRecieved)}
                />
                <View style={styles.divider} />

                <DetailRow
                    icon={<MaterialIcons name="update" size={24} color="#666" />}
                    label="Last Updated"
                    value={formatDate(material.lastRecieved)}
                />
            </View>
            <View style={styles.locationSection}>
                <View style={styles.locationHeader}>
                    <Ionicons name="location-outline" size={24} color="#666" />
                    <Text style={styles.locationTitle}>Location Images</Text>
                </View>
                <View style={styles.imageCard}>
                    <Image
                        source={{
                            uri: material.proofImage ||
                                "https://th.bing.com/th/id/OIP.F7AAZ51YNslUUrejRKkDeQHaE1?rs=1&pid=ImgDetMain",
                        }}
                        style={styles.locationImage}
                        resizeMode="cover"
                    />
                </View>
            </View>
            <TouchableOpacity
                style={[styles.button]}
            >
                <Text style={[styles.buttonText]}>
                    Order more
                </Text>
            </TouchableOpacity>
        </ScrollView >
    );
};

export default InventoryDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    label: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    value: {
        fontSize: 16,
        color: '#666',
    },
    divider: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginLeft: 36, // Aligns with the text after icon
    },
    locationContainer: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 8,
    },
    locationSection: {
        marginTop: 16,
    },
    locationHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 12,
    },
    locationTitle: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    imageCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    locationImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
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
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
        color: 'white',
    },
});