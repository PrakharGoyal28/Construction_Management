import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '../auth/config';
import { MaterialIcons, Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../auth/Auth';
import { CameraView, useCameraPermissions } from 'expo-camera';

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
const InventoryDetailForReceviable = () => {
    const { params } = useRoute();
    const { materialId } = params;
    const [material, setMaterial] = useState({});
    const [formData, setFormData] = useState({
        Quantity: '',
        Description: ''
    });
    const { user } = useContext(AuthContext);
    const navigation = useNavigation();

    const [permission, requestPermission] = useCameraPermissions();
    const [cameraType, setCameraType] = useState('back');
    const [image, setImage] = useState(null);
    const [camera, setCamera] = useState(null);
    const [loading, setLoading] = useState(false);

    const takePicture = async () => {
        if (!camera) {
            ToastAndroid.show("Camera not ready", ToastAndroid.SHORT);
            return;
        }
        setLoading(true);
        try {
            const photo = await camera.takePictureAsync({
                quality: 0.5,
            });
            setImage(photo.uri);
            ToastAndroid.show("Photo captured", ToastAndroid.SHORT);
        } catch (error) {
            console.error("Failed to take picture:", error);
            ToastAndroid.show("Failed to capture image", ToastAndroid.SHORT);
        } finally {
            setLoading(false);
        }
    };

    const handleSendForApproval = async () => {
        if (!image) {
            ToastAndroid.show("Please take a photo first", ToastAndroid.SHORT);
            return;
        }

        try {
            // Create FormData instance
            const formDataToSend = new FormData();

            // Append the image file
            formDataToSend.append('proofImage', {
                uri: image,
                type: 'image/jpeg',
                name: 'proof.jpg'
            });

            // Append other data
            formDataToSend.append('Quantity', formData.Quantity || material.Quantity);
            formDataToSend.append('Description', formData.Description || material.Description);

            const response = await axios.put(
                `${BASE_URL}/materials/putMaterialForApproval/${materialId}`,
                formDataToSend,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            ToastAndroid.show("Sent for approval", ToastAndroid.SHORT);
            navigation.goBack();
        } catch (error) {
            console.error(error);
            ToastAndroid.show("Error sending for approval", ToastAndroid.SHORT);
        }
    };

    const getMaterialDetail = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/materials/getMaterial/${materialId}`);
            const materialData = response.data.data;
            setMaterial(materialData);
            setFormData({
                Quantity: String(materialData.Quantity || ''),
                Description: materialData.Description || ''
            });
        } catch (error) {
            console.error(error);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    useEffect(() => {
        getMaterialDetail();
    }, []);

    if (!permission?.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>Camera permission is required</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={requestPermission}
                >
                    <Text style={styles.buttonText}>Grant Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

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
                    value={material.unitPrice}
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
                    label="Received Date"
                    value={new Intl.DateTimeFormat('en-GB').format(new Date())}
                />
            </View>

            <View style={styles.cameraContainer}>
                <Text style={styles.title}>Attach photo proof</Text>
                {image ? (
                    <View style={styles.imagePreview}>
                        <Image
                            source={{ uri: image }}
                            style={styles.previewImage}
                        />
                        <TouchableOpacity
                            style={styles.retakeButton}
                            onPress={() => setImage(null)}
                        >
                            <Text style={styles.buttonText}>Retake Photo</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <CameraView
                        style={styles.camera}
                        facing={cameraType}
                        ref={setCamera}
                    >
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.cameraButton}
                                onPress={() => setCameraType(current => (current === 'back' ? 'front' : 'back'))}
                            >
                                <Text style={styles.buttonText}>Flip Camera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.cameraButton, loading && styles.buttonDisabled]}
                                onPress={takePicture}
                                disabled={loading}
                            >
                                <Text style={styles.buttonText}>
                                    {loading ? 'Processing...' : 'Take Photo'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </CameraView>
                )}
            </View>

            <TouchableOpacity
                style={[styles.submitButton]}
                onPress={handleSendForApproval}
            >
                <Text style={styles.buttonText}>
                    Submit for Approval
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};
export default InventoryDetailForReceviable;

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
        flex: 1,
    },
    label: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
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
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        padding: 8,
        flex: 1,
        marginLeft: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        fontFamily: "AlbertSans", // Ensure the font is properly loaded and linked
        fontWeight: "700",
        lineHeight: 38.4,
    },
    cameraContainer: {
        marginTop: 20,
        borderRadius: 12,
        overflow: 'hidden',
    },
    camera: {
        height: 300,
        width: '100%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 20,
        width: '100%',
    },
    cameraButton: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 10,
        borderRadius: 5,
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    imagePreview: {
        height: 300,
        width: '100%',
        position: 'relative',
    },
    previewImage: {
        height: '100%',
        width: '100%',
    },
    retakeButton: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 10,
        borderRadius: 5,
    },
    submitButton: {
        marginTop: 20,
        marginBottom: 30,
        width: '80%',
        alignSelf: 'center',
        paddingVertical: 12,
        backgroundColor: 'black',
        borderRadius: 25,
        elevation: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    }
});