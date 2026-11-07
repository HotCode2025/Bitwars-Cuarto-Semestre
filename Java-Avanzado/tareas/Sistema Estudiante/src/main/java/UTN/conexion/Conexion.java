/*
 * Grupo Bitwars
 * Cuarto Semestre
 * 26 de Octubre de 2026
 */
package UTN.conexion;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Properties;

public class Conexion {
    public static Connection getConnection(){
        Connection conexion = null;
        Properties props = new Properties();

        try (InputStream input = Conexion.class.getClassLoader().getResourceAsStream("db.properties")) {
            
            if (input == null) {
                System.out.println("Lo siento, no se pudo encontrar el archivo db.properties");
                return null;
            }

            props.load(input);

            var url = props.getProperty("db.url");
            var usuario = props.getProperty("db.usuario");
            var password = props.getProperty("db.password");

            Class.forName("com.mysql.cj.jdbc.Driver");
            conexion = DriverManager.getConnection(url, usuario, password);
            
        } catch (Exception e) {
            System.out.println("Ocurrio un error en la conexion: " + e.getMessage());
        }
        return conexion;
    }
}