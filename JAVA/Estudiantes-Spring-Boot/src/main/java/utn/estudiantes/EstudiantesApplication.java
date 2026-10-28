/*
 * Grupo Bitwars
 * Cuarto Semestre
 * 26 de Octubre de 2026
 */
package utn.estudiantes;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import utn.estudiantes.modelo.Estudiante;
import utn.estudiantes.servicio.EstudianteServicio;

import java.util.List;
import java.util.Scanner;

@SpringBootApplication
public class EstudiantesApplication implements CommandLineRunner {

    @Autowired
    private EstudianteServicio estudianteServicio;
    private static final Logger logger = LoggerFactory.getLogger(EstudiantesApplication.class);
    String nl = System.lineSeparator();

    public static void main(String[] args) {
        logger.info("Iniciando la aplicación...");
        SpringApplication.run(EstudiantesApplication.class, args);
        logger.info("Aplicación Finalizada!");
    }

    @Override
    public void run(String... args) throws Exception {
        logger.info(nl + "Ejecutando el método run de Spring..." + nl);
        var salir = false;
        var consola = new Scanner(System.in);
        while (!salir) {
            mostrarMenu();
            salir = ejecutarOpciones(consola);
            logger.info(nl);
        }
    }

    private void mostrarMenu() {
        logger.info(nl + """
                ***** Sistema de Estudiantes *****
                1. Listar Estudiantes
                2. Buscar Estudiante
                3. Agregar Estudiante
                4. Modificar Estudiante
                5. Eliminar Estudiante
                6. Salir""");
        System.out.print("Elija una opción: ");
    }

    private boolean ejecutarOpciones(Scanner consola) {
        var opcion = 0;
        var salir = false;

        try {
            opcion = Integer.parseInt(consola.nextLine());
        } catch (NumberFormatException e) {
            logger.info(nl + "¡Error! Por favor, ingrese un número válido." + nl);
            return false;
        }

        switch (opcion) {
            case 1 -> {
                logger.info(nl + "Listado de estudiantes: " + nl);
                List<Estudiante> estudiantes = estudianteServicio.listarEstudiantes();
                if (estudiantes.isEmpty()) {
                    logger.info("No hay estudiantes registrados." + nl);
                } else {
                    imprimirTabla(estudiantes);
                }
            }
            case 2 -> {
                var idEstudiante = leerEntero(consola, "Digite el id estudiante a buscar: ");
                Estudiante estudiante = estudianteServicio.buscarEstudiantePorId(idEstudiante);
                if (estudiante != null)
                    logger.info("Estudiante encontrado: " + estudiante + nl);
                else
                    logger.info("Estudiante NO encontrado con ID: " + idEstudiante + nl);
            }
            case 3 -> {
                logger.info("Agregar estudiante: " + nl);
                System.out.print("Nombre: ");
                var nombre = consola.nextLine();
                System.out.print("Apellido: ");
                var apellido = consola.nextLine();
                System.out.print("Telefono: ");
                var telefono = consola.nextLine();
                System.out.print("Email: ");
                var email = consola.nextLine();

                var estudiante = new Estudiante();
                estudiante.setNombre(nombre);
                estudiante.setApellido(apellido);
                estudiante.setTelefono(telefono);
                estudiante.setEmail(email);

                estudianteServicio.guardarEstudiante(estudiante);
                logger.info("Estudiante agregado: " + estudiante + nl);
            }
            case 4 -> {
                logger.info("Modificar estudiante: " + nl);
                var idEstudiante = leerEntero(consola, "Ingrese el id estudiante: ");
                Estudiante estudiante = estudianteServicio.buscarEstudiantePorId(idEstudiante);
                
                if (estudiante != null) {
                    System.out.print("Nombre (" + estudiante.getNombre() + "): ");
                    var nombre = consola.nextLine();
                    if (!nombre.isBlank()) estudiante.setNombre(nombre);

                    System.out.print("Apellido (" + estudiante.getApellido() + "): ");
                    var apellido = consola.nextLine();
                    if (!apellido.isBlank()) estudiante.setApellido(apellido);

                    System.out.print("Telefono (" + estudiante.getTelefono() + "): ");
                    var telefono = consola.nextLine();
                    if (!telefono.isBlank()) estudiante.setTelefono(telefono);

                    System.out.print("Email (" + estudiante.getEmail() + "): ");
                    var email = consola.nextLine();
                    if (!email.isBlank()) estudiante.setEmail(email);

                    estudianteServicio.guardarEstudiante(estudiante);
                    logger.info("Estudiante modificado: " + estudiante + nl);
                } else {
                    logger.info("Estudiante NO encontrado con el id: " + idEstudiante + nl);
                }
            }
            case 5 -> {
                logger.info("Eliminar estudiante: " + nl);
                var idEstudiante = leerEntero(consola, "Digite el id estudiante: ");
                var estudiante = estudianteServicio.buscarEstudiantePorId(idEstudiante);
                if (estudiante != null) {
                    estudianteServicio.eliminarEstudiante(estudiante);
                    logger.info("Estudiante eliminado con ID: " + idEstudiante + nl);
                } else {
                    logger.info("Estudiante NO encontrado con id: " + idEstudiante + nl);
                }
            }
            case 6 -> {
                logger.info("Hasta pronto!" + nl + nl);
                salir = true;
            }
            default -> logger.info("Opción no reconocida: " + opcion + nl);
        }
        return salir;
    }

    private Integer leerEntero(Scanner consola, String mensaje) {
        while (true) {
            try {
                System.out.print(mensaje);
                return Integer.parseInt(consola.nextLine());
            } catch (NumberFormatException e) {
                logger.info("¡Error! Debe ingresar un número válido.");
            }
        }
    }

    private void imprimirTabla(List<Estudiante> estudiantes) {
        String separador = "+------+-----------------+-----------------+-----------------+-----------------------------+";
        logger.info(separador);
        logger.info(String.format("| %-4s | %-15s | %-15s | %-15s | %-27s |", "ID", "Nombre", "Apellido", "Teléfono", "Email"));
        logger.info(separador);
        
        for (Estudiante e : estudiantes) {
            logger.info(String.format("| %-4d | %-15s | %-15s | %-15s | %-27s |",
                    e.getIdestudiantes2026(),
                    truncar(e.getNombre(), 15),
                    truncar(e.getApellido(), 15),
                    truncar(e.getTelefono(), 15),
                    truncar(e.getEmail(), 27)));
        }
        logger.info(separador);
        logger.info("Total de estudiantes: " + estudiantes.size() + nl);
    }

    private String truncar(String texto, int max) {
        if (texto == null) return "";
        return texto.length() > max ? texto.substring(0, max - 3) + "..." : texto;
    }
}