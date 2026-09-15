import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Ejemplo AsyncStorage y SQLite</Text>
      <Text style={styles.subtitulo}>Selecciona un ejemplo para verlo</Text>

      <TouchableOpacity
        style={[styles.boton, styles.botonAsync]}
        onPress={() => router.push('/async-storage')}
      >
        <Text style={styles.botonTitulo}>AsyncStorage</Text>
        <Text style={styles.botonDesc}>Contiene CRUD con almacenamiento clave-valor</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.boton, styles.botonSQLite]}
        onPress={() => router.push('/sqlite')}
      >
        <Text style={styles.botonTitulo}>SQLite</Text>
        <Text style={styles.botonDesc}>Contiene CRUD con base de datos relacional</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 24,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 40,
  },
  boton: {
    padding: 24,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  botonAsync: {
    backgroundColor: '#3b82f6',
  },
  botonSQLite: {
    backgroundColor: '#10b981',
  },
  botonTitulo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  botonDesc: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
});