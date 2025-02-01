import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../auth/config';
import { useNavigation } from '@react-navigation/native';

const ReceiveInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [currInventory, setCurrInventory] = useState([]);
  const [orderedInventory, setOrderedInventory] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('Current');
  const navigation = useNavigation();

  const getInventory = async () => {
    try {
      const currResponse = await axios.get(`${BASE_URL}/materials/getMaterialByType?type=Current`);
      setInventory(currResponse.data.data);
      setCurrInventory(currResponse.data.data)

      const orderedResponse = await axios.get(`${BASE_URL}/materials/getMaterialByType?type=ordered`);
      setOrderedInventory(orderedResponse.data.data)
    } catch (error) {
      console.error(error);
    }
  };

  const filterMaterials = (data, status) => {
    if (status == 'Current') {
      setInventory(currInventory)
    }
    else {
      setInventory(orderedInventory)
    }
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    filterMaterials(inventory, status);
  };

  useEffect(() => {
    getInventory();
  }, []);

  const handleMaterialClick = (item) => {
    // Navigate to MaterialDetail page and pass materialId as a parameter
    // console.log(materialId);
    
    navigation.navigate('InventoryDetail', { materialId:item._id, name:item.Name});
  };

  const renderStatus = (status) => {
    switch (status) {
      case 'InTransit':
        return 'In Transit';
      case 'ForApproval':
        return 'For Approval';
      default:
        return status;
    }
  };

  const renderCell = (content, styles, maxLines = 1) => (
    <View style={[cellStyles.cellContainer, styles]}>
      <Text style={cellStyles.cellText} numberOfLines={maxLines}>
        {content}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {['Current', 'Ordered'].map((status) => (
          <TouchableOpacity
            key={status}
            style={[styles.button, selectedStatus === status && styles.selectedButton]}
            onPress={() => handleStatusChange(status)}
          >
            <Text style={[styles.buttonText, selectedStatus === status && styles.selectedButtonText]}>
              {renderStatus(status)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          {renderCell('', [cellStyles.headerCell, cellStyles.indexColumn])}
          {renderCell('Name', [cellStyles.headerCell, cellStyles.nameColumn])}
          {renderCell('Qnty.', [cellStyles.headerCell, cellStyles.qtyColumn, cellStyles.lastCell])}
        </View>

        <FlatList
          data={inventory}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => handleMaterialClick(item)}>
              <View style={styles.tableRow}>
                {renderCell((index + 1).toString().padStart(2, '0'), cellStyles.indexColumn)}
                {renderCell(item.Name, cellStyles.nameColumn)}
                {renderCell(`${item.Quantity} Nos.`, [cellStyles.qtyColumn, cellStyles.lastCell])}
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No materials found.</Text>
            </View>
          }
        />
      </View>
    </View>
  );
};

const cellStyles = StyleSheet.create({
  cellContainer: {
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  headerCell: {
    backgroundColor: '#F8F9FA',
  },
  cellText: {
    fontSize: 14,
    color: '#333',
  },
  indexColumn: {
    flex: 0.2,
    alignItems: 'center',
  },
  nameColumn: {
    flex: 0.6,
    alignItems: 'flex-start',
  },
  qtyColumn: {
    flex: 0.2,
    alignItems: 'flex-end',
  },
  lastCell: {
    borderRightWidth: 0,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 8,
  },
  button: {
    flex: 1,
    minWidth: Dimensions.get('window').width / 2 - 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  selectedButton: {
    backgroundColor: 'black',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },
  selectedButtonText: {
    color: '#fff',
  },
  tableContainer: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default ReceiveInventory;