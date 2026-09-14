from conexion import Conexion

def test():
    try:
        print("🔌 Conectando a PostgreSQL...")
        conexion = Conexion.obtenerConexion()
        print("✅ Conexión exitosa!")

        cursor = conexion.cursor()
        cursor.execute("SELECT version();")
        print(f"📊 {cursor.fetchone()[0]}")

        cursor.execute("SELECT current_database();")
        print(f"🗄️  Base de datos: {cursor.fetchone()[0]}")

        cursor.execute("SELECT * FROM usuario;")
        print("📋 Registros:")
        for row in cursor.fetchall():
            print(f"   → {row}")

        cursor.close()
        Conexion.liberarConexion(conexion)
        Conexion.cerrarConexiones()
        print("\n🎉 ¡Todo funciona!")

    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == '__main__':
    test()