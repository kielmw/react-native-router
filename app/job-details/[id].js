import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Alert, Share, ScrollView, Linking } from 'react-native';
import { Stack } from 'expo-router';
import { COLORS } from '../../constants';
import useFetch from '../../hook/useFetch';
import { useRoute } from '@react-navigation/native';

const JobDetails = () => {
  const route = useRoute();
  const { id, namaKelas } = route.params;

  const { data: detailData, isLoading, error } = useFetch(`api/proses/${id}`);

  const handleDownload = (idKelas, pdfId, fileName) => {
    const downloadUrl = `https://8074-182-253-50-137.ngrok-free.app/api/proses/pdf/download/${idKelas}/${pdfId}`;
    Linking.openURL(downloadUrl);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={[styles.container, styles.pageContainer]}>
        <Text style={styles.title}>{namaKelas}</Text>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Error: {error.message}</Text>
        ) : (
          <View>
            {detailData?.itemPembelajarans?.length > 0 ? (
              detailData.itemPembelajarans.map((dataItem, index) => (
                <View key={index} style={styles.pertemuanContainer}>
                  <Text style={styles.pertemuanText}>Pertemuan minggu ke - {dataItem.idPertemuan}</Text>
                  <View style={styles.downloadContainer}>
                    <Text style={styles.headingPertemuan}>{dataItem.headingPertemuan}</Text>
                    <Text style={styles.bodyPertemuan}>{dataItem.bodyPertemuan}</Text>
                    <TouchableOpacity onPress={() => handleDownload(id, dataItem.idPdf, dataItem.fileName)}>
                      <Text style={styles.itemText}>
                        <Text style={styles.fileNameText}>{dataItem.fileName}</Text>
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <Text>No data available</Text>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  pageContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  pertemuanContainer: {
    backgroundColor: '#eee',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  pertemuanText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  downloadContainer: {
    paddingTop: 10,
  },
  headingPertemuan: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  bodyPertemuan: {
    fontSize: 16,
  },
  itemText: {
    fontSize: 14,
    color: '#007bff',
  },
  fileNameText: {
    color: 'grey',
  },
});

export default JobDetails;
