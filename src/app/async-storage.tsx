import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface Tarea {
  id: string;
  texto: string;
}

const CLAVE_STORAGE = 'tareas';

export default function AsyncStorageScreen() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [texto, setTexto] = useState('');
  const [tareaEditando, setTareaEditando] = useState<Tarea | null>(null);

  // READ — cargar tareas al abrir la pantalla
  useEffect(() => {
    cargarTareas();
  }, []);

  const cargarTareas = async () => {
    try {
      const datos = await AsyncStorage.getItem(CLAVE_STORAGE);
      if (datos !== null) {
        setTareas(JSON.parse(datos));
      }
    } catch (e) {
      console.log('Error al cargar:', e);
    }
  };

  const guardarEnStorage = async (nuevasTareas: Tarea[]) => {
    try {
      await AsyncStorage.setItem(CLAVE_STORAGE, JSON.stringify(nuevasTareas));
    } catch (e) {
      console.log('Error al guardar:', e);
    }
  };

  // CREATE — agregar tarea nueva
  const agregarTarea = async () => {
    if (texto.trim() === '') return;
    const nueva: Tarea = {
      id: Date.now().toString(),
      texto: texto.trim(),
    };
    const nuevasTareas = [...tareas, nueva];
    setTareas(nuevasTareas);
    await guardarEnStorage(nuevasTareas);
    setTexto('');
  };

  // UPDATE — guardar cambios de la tarea editada
  const actualizarTarea = async () => {
    if (!tareaEditando || texto.trim() === '') return;
    const nuevasTareas = tareas.map((t) =>
      t.id === tareaEditando.id ? { ...t, texto: texto.trim() } : t
    );
    setTareas(nuevasTareas);
    await guardarEnStorage(nuevasTareas);
    setTexto('');
    setTareaEditando(null);
  };

  // DELETE — eliminar una tarea
  const eliminarTarea = async (id: string) => {
    const nuevasTareas = tareas.filter((t) => t.id !== id);
    setTareas(nuevasTareas);
    await guardarEnStorage(nuevasTareas);
  };

  // Preparar edición
  const iniciarEdicion = (tarea: Tarea) => {
    setTareaEditando(tarea);
    setTexto(tarea.texto);
  };

  const cancelarEdicion = () => {
    setTareaEditando(null);
    setTexto('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.titulo}>Lista de Tareas</Text>
      <Text style={styles.subtitulo}>Ejemplo CRUD con AsyncStorage</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={tareaEditando ? 'Editar tarea...' : 'Nueva tarea...'}
          value={texto}
          onChangeText={setTexto}
        />
        <TouchableOpacity
          style={[styles.boton, tareaEditando ? styles.botonEditar : styles.botonAgregar]}
          onPress={tareaEditando ? actualizarTarea : agregarTarea}
        >
          <Text style={styles.botonTexto}>
            {tareaEditando ? 'Actualizar' : 'Agregar'}
          </Text>
        </TouchableOpacity>
        {tareaEditando && (
          <TouchableOpacity style={[styles.boton, styles.botonCancelar]} onPress={cancelarEdicion}>
            <Text style={styles.botonTexto}>Cancelar</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={tareas}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.vacio}>No hay tareas guardadas.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.tarjeta}>
            <Text style={styles.tareaTexto}>{item.texto}</Text>
            <View style={styles.acciones}>
              <TouchableOpacity
                style={[styles.accionBoton, styles.botonEditar]}
                onPress={() => iniciarEdicion(item)}
              >
                <Text style={styles.botonTexto}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.accionBoton, styles.botonEliminar]}
                onPress={() => eliminarTarea(item.id)}
              >
                <Text style={styles.botonTexto}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 24,
  },
  titulo: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    marginBottom: 10,
  },
  boton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 8,
  },
  botonAgregar: {
    backgroundColor: '#3b82f6',
  },
  botonEditar: {
    backgroundColor: '#f59e0b',
  },
  botonCancelar: {
    backgroundColor: '#94a3b8',
  },
  botonEliminar: {
    backgroundColor: '#ef4444',
  },
  botonTexto: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15,
  },
  tarjeta: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tareaTexto: {
    fontSize: 16,
    color: '#1e293b',
    marginBottom: 10,
  },
  acciones: {
    flexDirection: 'row',
    gap: 8,
  },
  accionBoton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  vacio: {
    textAlign: 'center',
    color: '#94a3b8',
    fontSize: 16,
    marginTop: 40,
  },
});