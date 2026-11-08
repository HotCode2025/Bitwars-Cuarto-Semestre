/*
 * Grupo Bitwars
 * Cuarto Semestre
 * 26 de Octubre de 2026
 */
package utn.estudiantes.servicio;

import utn.estudiantes.modelo.Estudiante;
import java.util.List;

public interface IEstudianteServicio {
    public List<Estudiante> listarEstudiantes();
    public Estudiante buscarEstudiantePorId(Integer idEstudiante);
    public void guardarEstudiante(Estudiante estudiante);
    public void eliminarEstudiante(Estudiante estudiante);
}