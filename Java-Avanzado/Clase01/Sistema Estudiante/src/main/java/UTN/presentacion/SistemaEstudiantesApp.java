/*
 * Grupo Bitwars
 * Cuarto Semestre
 * 26 de Octubre de 2026
 */
package UTN.presentacion;

import UTN.datos.EstudianteDAO;
import UTN.dominio.Estudiante;
import java.util.Scanner;

public class SistemaEstudiantesApp {
    public static void main(String[] args) {
        var salir = false;
        var consola = new Scanner(System.in);
        var estudianteDao = new EstudianteDAO();
        while (!salir) {
            try {
                mostrarMenu();
                salir = ejecutarOpciones(consola, estudianteDao);
            } catch (Exception e) {
                System.out.println("Ocurrió un error al ejecutar la operación: " + e.getMessage());
            }
        }
    }

    private static void mostrarMenu() {
        System.out.print("""
                ******* Sistema de Estudiantes *******
                1. Listar Estudiantes
                2. Buscar Estudiantes
                3. Agregar estudiante
                4. Modificar Estudiante
                5. Eliminar Estudiante
                6. Salir
                Elige una opción:\s
                """);
    }

    private static boolean ejecutarOpciones(Scanner consola, EstudianteDAO estudianteDAO) {
        var opcion = Integer.parseInt(consola.nextLine());
        var salir = false;
        switch (opcion) {
            case 1 -> {
                System.out.println("\n--- Listado de Estudiantes ---");
                var estudiantes = estudianteDAO.listarEstudiantes();
                EstudianteDAO.imprimirTabla(estudiantes);
            }
            case 2 -> {
                System.out.print("\n--- Introduce el id_estudiante a buscar: ");
                var idEstudiante = Integer.parseInt(consola.nextLine());
                var estudiante = new Estudiante(idEstudiante);
                var encontrado = estudianteDAO.buscarEstudiantePorId(estudiante);
                if (encontrado)
                    System.out.println("\n--- Estudiante encontrado: " + estudiante);
                else
                    System.out.println("\n--- Estudiante NO encontrado con ID: " + idEstudiante);
            }
            case 3 -> {
                System.out.println("\n--- Agregar estudiante: ");
                System.out.print("\n--- Nombre: ");
                var nombre = consola.nextLine();
                System.out.print("\n--- Apellido: ");
                var apellido = consola.nextLine();
                System.out.print("\n--- Telefono: ");
                var telefono = consola.nextLine();
                System.out.print("\n--- Email: ");
                var email = consola.nextLine();
                var estudiante = new Estudiante(nombre, apellido, telefono, email);
                var agregado = estudianteDAO.agregarEstudiante(estudiante);
                if (agregado)
                    System.out.println("\n--- Estudiante agregado: " + estudiante);
                else
                    System.out.println("\n--- Estudiante NO agregado: " + estudiante);
            }
            case 4 -> {
                System.out.println("\n--- Modificar estudiante: ");
                System.out.print("\n--- Id Estudiante: ");
                var idEstudiante = Integer.parseInt(consola.nextLine());
                System.out.print("\n--- Nombre: ");
                var nombre = consola.nextLine();
                System.out.print("\n--- Apellido: ");
                var apellido = consola.nextLine();
                System.out.print("\n--- Telefono: ");
                var telefono = consola.nextLine();
                System.out.print("\n--- Email: ");
                var email = consola.nextLine();
                var estudiante =
                        new Estudiante(idEstudiante, nombre, apellido, telefono, email);
                var modificado = estudianteDAO.modificarEstudiante(estudiante);
                if (modificado)
                    System.out.println("\n--- Estudiante modificado: " + estudiante);
                else
                    System.out.println("\n--- Estudiante NO modificado: " + estudiante);
            }
            case 5 -> {
                System.out.println("\n--- Eliminar estudiante: ");
                System.out.print("\n--- Id estudiante: ");
                var idEstudiante = Integer.parseInt(consola.nextLine());
                var estudiante = new Estudiante(idEstudiante);
                var eliminado = estudianteDAO.eliminarEstudiante(estudiante);
                if (eliminado)
                    System.out.println("\n--- Estudiante eliminado con ID: " + idEstudiante);
                else
                    System.out.println("\n--- Estudiante NO eliminado con ID: " + idEstudiante);
            }
            case 6 -> {
                System.out.println("\n--- Fin!");
                salir = true;
            }
            default -> System.out.println("Opción no reconocida, ingrese otra opcion");
        }
        return salir;
    }
}