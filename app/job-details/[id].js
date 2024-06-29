import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { WebView } from 'react-native-webview';
import { COLORS } from '../../constants';
import useFetch from '../../hook/useFetch';

const JobDetails = () => {
  const route = useRoute();
  const { id } = route.params;

  const { data: detailData, isLoading, error } = useFetch(`api/proses/${id}`);

  const handleDownload = (idKelas, pdfId, fileName) => {
    const downloadUrl = `https://c32e-182-1-82-205.ngrok-free.app/api/proses/pdf/download/${idKelas}/${pdfId}`;
    Linking.openURL(downloadUrl);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={[styles.container, styles.pageContainer]}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Error: {error.message}</Text>
        ) : (
          detailData && (
            <>
              <Text style={styles.className}>{detailData.namaKelas}</Text>
              <Text style={styles.classDescription}>{detailData.deskripsiKelas}</Text>
              <View>
                {detailData.itemPembelajarans?.length > 0 ? (
                  detailData.itemPembelajarans.map((dataItem, index) => (
                    <View key={`${dataItem.idPertemuan}-${index}`} style={styles.pertemuanContainer}>
                      <Text style={styles.pertemuanText}>Pertemuan minggu ke - {dataItem.idPertemuan}</Text>
                      <View style={styles.downloadContainer}>
                        <Text style={styles.headingPertemuan}>{dataItem.headingPertemuan}</Text>
                        <Text style={styles.bodyPertemuan}>{dataItem.bodyPertemuan}</Text>
                        {dataItem.idPdf && dataItem.fileName && (
                          <TouchableOpacity onPress={() => handleDownload(id, dataItem.idPdf, dataItem.fileName)}>
                            <Text style={styles.itemText}>
                              <Text style={styles.fileNameText}>{dataItem.fileName}</Text>
                            </Text>
                          </TouchableOpacity>
                        )}
                        {dataItem.videoPertemuan && dataItem.videoPertemuan !== 'none' && (
                          <View style={styles.videoContainer}>
                            <WebView
                              style={styles.video}
                              javaScriptEnabled={true}
                              domStorageEnabled={true}
                              source={{ uri: dataItem.videoPertemuan }}
                            />
                          </View>
                        )}
                      </View>
                    </View>
                  ))
                ) : (
                  <Text>No data available</Text>
                )}
              </View>
            </>
          )
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
  className: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  classDescription: {
    fontStyle: 'italic',
    fontSize: 16,
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
  videoContainer: {
    marginTop: 10,
    width: '100%',
    height: 200,
  },
  video: {
    flex: 1,
  },
});

export default function Page() {
  return (
    <>
      <Stack.Screen options={{ title: 'Detail Kelas' }} />
      <JobDetails />
    </>
  );
}
