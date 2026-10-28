/*
 * Grupo Bitwars
 * Cuarto Semestre
 * 26 de Octubre de 2026
 */
package utn.estudiantes.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import utn.estudiantes.modelo.Estudiante;

public interface EstudianteRepositorio extends JpaRepository<Estudiante, Integer> {
}