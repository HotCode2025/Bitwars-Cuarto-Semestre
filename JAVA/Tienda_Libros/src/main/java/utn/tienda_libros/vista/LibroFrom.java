// Grupo Bitwars. 27 Octubre de 2026 - Cuarto Semestre
package utn.tienda_libros.vista;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import utn.tienda_libros.modelo.Libro;
import utn.tienda_libros.servicio.LibroServicio;

import javax.swing.*;
import javax.swing.table.DefaultTableCellRenderer;
import javax.swing.table.DefaultTableModel;
import javax.swing.table.JTableHeader;
import java.awt.BasicStroke;
import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Cursor;
import java.awt.Dimension;
import java.awt.FlowLayout;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
import java.awt.RenderingHints;
import java.awt.event.FocusAdapter;
import java.awt.event.FocusEvent;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.text.NumberFormat;
import java.util.Locale;

@Component
public class LibroFrom extends JFrame {

    // ================= PALETA DARK =================
    private static final Color BG          = new Color(0x2B2F36);
    private static final Color CARD        = new Color(0x3A404A);
    private static final Color CARD_BORDER = new Color(0x4B5563);
    private static final Color FIELD_BG    = new Color(0x1F242B);
    private static final Color FIELD_BORD  = new Color(0x4B5563);
    private static final Color FIELD_FOCUS = new Color(0x60A5FA);
    private static final Color TEXT        = new Color(0xF3F4F6);
    private static final Color MUTED       = new Color(0xC7CDD5);
    private static final Color ACCENT      = new Color(0x60A5FA);
    private static final Color TABLE_BG    = new Color(0x1F242B);
    private static final Color TABLE_ALT   = new Color(0x262B33);
    private static final Color TABLE_HEAD  = new Color(0x353B45);
    private static final Color SELECTION   = new Color(0x2563EB);

    LibroServicio libroServicio;
    private JPanel panel;
    private JTable tablaLibros;
    private JTextField idTexto;
    private JTextField libroTexto;
    private JTextField autorTexto;
    private JTextField precioTexto;
    private JTextField existenciasTexto;
    private JButton agregarButton;
    private JButton modificarButton;
    private JButton eliminarButton;
    private JButton salirButton;
    private JLabel tituloLabel;
    private DefaultTableModel tablaModeloLibros;

    @Autowired
    public LibroFrom(LibroServicio libroServicio) {
        this.libroServicio = libroServicio;

        inicializarComponentesUI();
        iniciarForma();

        agregarButton.addActionListener(e -> agregarLibro());
        modificarButton.addActionListener(e -> modificarLibro());
        eliminarButton.addActionListener(e -> eliminarLibro());
        salirButton.addActionListener(e -> salir());

        tablaLibros.addMouseListener(new MouseAdapter() {
            @Override public void mouseClicked(MouseEvent e) {
                cargarLibroSeleccionado();
            }
        });

        listarLibros();
    }

    // ================= UI =================
    private void inicializarComponentesUI() {
        panel = new JPanel(new BorderLayout(20, 20));
        panel.setBackground(BG);
        panel.setBorder(BorderFactory.createEmptyBorder(22, 22, 22, 22));

        JPanel leftPanel = new JPanel();
        leftPanel.setLayout(new BoxLayout(leftPanel, BoxLayout.Y_AXIS));
        leftPanel.setOpaque(false);

        tituloLabel = new JLabel("Gestión de Libros");
        tituloLabel.setFont(new Font("SansSerif", Font.BOLD, 26));
        tituloLabel.setForeground(TEXT);
        tituloLabel.setAlignmentX(java.awt.Component.LEFT_ALIGNMENT);   // <-- FQ
        leftPanel.add(tituloLabel);

        leftPanel.add(Box.createRigidArea(new Dimension(0, 18)));

        RoundedPanel formCard = new RoundedPanel(new GridBagLayout());
        formCard.setBorder(BorderFactory.createEmptyBorder(20, 22, 20, 22));
        formCard.setAlignmentX(java.awt.Component.LEFT_ALIGNMENT);      // <-- FQ

        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(9, 8, 9, 8);

        gbc.anchor = GridBagConstraints.EAST;
        gbc.gridx = 0; gbc.weightx = 0.0;
        gbc.gridy = 0; formCard.add(crearLabel("Nombre del Libro:"), gbc);
        gbc.gridy = 1; formCard.add(crearLabel("Autor:"), gbc);
        gbc.gridy = 2; formCard.add(crearLabel("Precio ($):"), gbc);
        gbc.gridy = 3; formCard.add(crearLabel("Existencias:"), gbc);

        gbc.anchor = GridBagConstraints.WEST;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.weightx = 1.0;

        libroTexto       = crearCampo();
        autorTexto       = crearCampo();
        precioTexto      = crearCampo();
        existenciasTexto = crearCampo();
        idTexto          = new JTextField();
        idTexto.setVisible(false);

        gbc.gridx = 1; gbc.gridy = 0; formCard.add(libroTexto, gbc);
        gbc.gridy = 1; formCard.add(autorTexto, gbc);
        gbc.gridy = 2; formCard.add(precioTexto, gbc);
        gbc.gridy = 3; formCard.add(existenciasTexto, gbc);

        leftPanel.add(formCard);
        leftPanel.add(Box.createRigidArea(new Dimension(0, 18)));

        JPanel botonesPanel = new JPanel(new FlowLayout(FlowLayout.LEFT, 8, 0));
        botonesPanel.setOpaque(false);
        botonesPanel.setAlignmentX(java.awt.Component.LEFT_ALIGNMENT);   // <-- FQ

        agregarButton   = new RoundedButton("Agregar");
        modificarButton = new RoundedButton("Modificar/Actualizar");
        eliminarButton  = new RoundedButton("Eliminar");
        salirButton     = new RoundedButton("Salir");

        agregarButton.setPreferredSize(new Dimension(150, 40));
        modificarButton.setPreferredSize(new Dimension(190, 40));
        eliminarButton.setPreferredSize(new Dimension(150, 40));
        salirButton.setPreferredSize(new Dimension(120, 40));

        botonesPanel.add(agregarButton);
        botonesPanel.add(modificarButton);
        botonesPanel.add(eliminarButton);
        botonesPanel.add(salirButton);

        leftPanel.add(botonesPanel);
        leftPanel.add(Box.createVerticalGlue());

        panel.add(leftPanel, BorderLayout.WEST);

        tablaModeloLibros = new DefaultTableModel(0, 5) {
            @Override public boolean isCellEditable(int r, int c) { return false; }
        };
        tablaModeloLibros.setColumnIdentifiers(new String[]{"Id", "Libro", "Autor", "Precio ($)", "Existencias"});

        tablaLibros = new JTable(tablaModeloLibros);
        tablaLibros.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);
        JScrollPane scrollPane = new JScrollPane(tablaLibros);
        scrollPane.setPreferredSize(new Dimension(560, 300));
        scrollPane.getViewport().setBackground(TABLE_BG);

        panel.add(scrollPane, BorderLayout.CENTER);
    }

    private JLabel crearLabel(String texto) {
        JLabel l = new JLabel(texto);
        l.setFont(new Font("SansSerif", Font.BOLD, 14));
        l.setForeground(MUTED);
        return l;
    }

    private JTextField crearCampo() {
        JTextField f = new JTextField();
        f.setFont(new Font("SansSerif", Font.PLAIN, 14));
        f.setPreferredSize(new Dimension(220, 34));
        f.setMinimumSize(new Dimension(220, 34));
        f.setBackground(FIELD_BG);
        f.setForeground(TEXT);
        f.setCaretColor(TEXT);
        f.setSelectionColor(SELECTION);
        f.setSelectedTextColor(Color.WHITE);
        f.setBorder(BorderFactory.createCompoundBorder(
                BorderFactory.createLineBorder(FIELD_BORD, 1),
                BorderFactory.createEmptyBorder(4, 10, 4, 10)));

        f.addFocusListener(new FocusAdapter() {
            @Override public void focusGained(FocusEvent e) {
                f.setBorder(BorderFactory.createCompoundBorder(
                        BorderFactory.createLineBorder(FIELD_FOCUS, 2),
                        BorderFactory.createEmptyBorder(3, 9, 3, 9)));
            }
            @Override public void focusLost(FocusEvent e) {
                f.setBorder(BorderFactory.createCompoundBorder(
                        BorderFactory.createLineBorder(FIELD_BORD, 1),
                        BorderFactory.createEmptyBorder(4, 10, 4, 10)));
            }
        });
        return f;
    }

    private void iniciarForma() {
        setContentPane(panel);
        setTitle("Tienda de Libros");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        estilizarTabla();
        setSize(1440, 720);
        setMinimumSize(new Dimension(1080, 640));
        setLocationRelativeTo(null);
        setVisible(true);
    }

    private void estilizarTabla() {
        Font f = new Font("SansSerif", Font.PLAIN, 14);

        tablaLibros.setFont(f);
        tablaLibros.setBackground(TABLE_BG);
        tablaLibros.setForeground(TEXT);
        tablaLibros.setRowHeight(30);
        tablaLibros.setGridColor(new Color(0x353B45));
        tablaLibros.setSelectionBackground(SELECTION);
        tablaLibros.setSelectionForeground(Color.WHITE);
        tablaLibros.setShowHorizontalLines(true);
        tablaLibros.setShowVerticalLines(false);
        tablaLibros.setIntercellSpacing(new Dimension(0, 1));

        DefaultTableCellRenderer renderer = new DefaultTableCellRenderer() {
            @Override public java.awt.Component getTableCellRendererComponent(   // <-- FQ
                    JTable t, Object v, boolean sel, boolean foc, int row, int col) {
                java.awt.Component c = super.getTableCellRendererComponent(t, v, sel, foc, row, col); // <-- FQ
                if (!sel) {
                    c.setBackground(row % 2 == 0 ? TABLE_BG : TABLE_ALT);
                    c.setForeground(TEXT);
                }
                setBorder(BorderFactory.createEmptyBorder(0, 12, 0, 12));
                if (col == 3 && v instanceof Number n) {
                    NumberFormat nf = NumberFormat.getCurrencyInstance(new Locale("es", "AR"));
                    setText(nf.format(n.doubleValue()));
                }
                return c;
            }
        };
        for (int i = 0; i < tablaLibros.getColumnCount(); i++) {
            tablaLibros.getColumnModel().getColumn(i).setCellRenderer(renderer);
        }

        JTableHeader header = tablaLibros.getTableHeader();
        header.setFont(new Font("SansSerif", Font.BOLD, 14));
        header.setBackground(TABLE_HEAD);
        header.setForeground(TEXT);
        header.setPreferredSize(new Dimension(0, 36));
        header.setReorderingAllowed(false);
        header.setBorder(BorderFactory.createMatteBorder(0, 0, 1, 0, CARD_BORDER));

        ((DefaultTableCellRenderer) header.getDefaultRenderer())
                .setHorizontalAlignment(JLabel.LEFT);
    }

    // ================= CLASES INTERNAS =================
    class RoundedPanel extends JPanel {
        private final int r = 16;
        RoundedPanel(java.awt.LayoutManager layout) {
            super(layout);
            setOpaque(false);
        }
        @Override protected void paintComponent(Graphics g) {
            Graphics2D g2 = (Graphics2D) g.create();
            g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
            g2.setColor(CARD);
            g2.fillRoundRect(0, 0, getWidth(), getHeight(), r, r);
            g2.setColor(CARD_BORDER);
            g2.setStroke(new BasicStroke(1));
            g2.drawRoundRect(0, 0, getWidth() - 1, getHeight() - 1, r, r);
            g2.dispose();
        }
    }

    class RoundedButton extends JButton {
        private final int r = 20;
        public RoundedButton(String text) {
            super(text);
            setOpaque(false);
            setContentAreaFilled(false);
            setFocusPainted(false);
            setBorderPainted(false);
            setForeground(ACCENT);
            setFont(new Font("SansSerif", Font.BOLD, 14));
            setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
        }
        @Override protected void paintComponent(Graphics g) {
            Graphics2D g2 = (Graphics2D) g.create();
            g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

            if (getModel().isRollover() || getModel().isPressed()) {
                g2.setColor(ACCENT);
                g2.fillRoundRect(0, 0, getWidth(), getHeight(), r, r);
                setForeground(Color.WHITE);
            } else {
                g2.setColor(new Color(0x1F242B));
                g2.fillRoundRect(0, 0, getWidth(), getHeight(), r, r);
                setForeground(ACCENT);
            }

            g2.setColor(ACCENT);
            g2.setStroke(new BasicStroke(1.5f));
            g2.drawRoundRect(1, 1, getWidth() - 3, getHeight() - 3, r, r);
            g2.dispose();
            super.paintComponent(g);
        }
    }

    // ================= LÓGICA =================
    private void salir() {
        int r = JOptionPane.showConfirmDialog(this,
                "¿Desea salir de la aplicación?", "Salir",
                JOptionPane.YES_NO_OPTION, JOptionPane.QUESTION_MESSAGE);
        if (r == JOptionPane.YES_OPTION) { dispose(); System.exit(0); }
    }

    private void agregarLibro() {
        if (!idTexto.getText().equals("")) {
            mostrarMensaje("Ya hay un registro seleccionado. Limpia el formulario para agregar uno nuevo.");
            return;
        }
        if (libroTexto.getText().trim().isEmpty()) {
            mostrarMensaje("Ingresa el nombre del libro");
            libroTexto.requestFocusInWindow();
            return;
        }
        String nombre = libroTexto.getText().trim();
        String autor  = autorTexto.getText().trim();
        Double precio = leerPrecio();      if (precio == null) return;
        Integer exist = leerExistencias(); if (exist == null) return;

        libroServicio.guardarLibro(new Libro(null, nombre, autor, precio, exist));
        mostrarMensaje("Se agregó el libro...");
        limpiarFormulario();
        listarLibros();
    }

    private void cargarLibroSeleccionado() {
        int viewRow = tablaLibros.getSelectedRow();
        if (viewRow == -1) return;
        int row = tablaLibros.convertRowIndexToModel(viewRow);

        idTexto.setText(String.valueOf(tablaModeloLibros.getValueAt(row, 0)));
        libroTexto.setText(String.valueOf(tablaModeloLibros.getValueAt(row, 1)));
        autorTexto.setText(String.valueOf(tablaModeloLibros.getValueAt(row, 2)));
        precioTexto.setText(String.valueOf(tablaModeloLibros.getValueAt(row, 3)));
        existenciasTexto.setText(String.valueOf(tablaModeloLibros.getValueAt(row, 4)));
    }

    private void modificarLibro() {
        if (idTexto.getText().isEmpty()) {
            mostrarMensaje("Debes seleccionar un registro en la tabla");
            return;
        }
        if (libroTexto.getText().trim().isEmpty()) {
            mostrarMensaje("Digite el nombre del libro...");
            libroTexto.requestFocusInWindow();
            return;
        }
        int id = Integer.parseInt(idTexto.getText());
        String nombre = libroTexto.getText().trim();
        String autor  = autorTexto.getText().trim();
        Double precio = leerPrecio();      if (precio == null) return;
        Integer exist = leerExistencias(); if (exist == null) return;

        libroServicio.guardarLibro(new Libro(id, nombre, autor, precio, exist));
        mostrarMensaje("Se modificó el libro...");
        limpiarFormulario();
        listarLibros();
    }

    private void eliminarLibro() {
        int viewRow = tablaLibros.getSelectedRow();
        if (viewRow == -1) {
            mostrarMensaje("No se ha seleccionado ningún libro de la tabla a eliminar");
            return;
        }
        int row = tablaLibros.convertRowIndexToModel(viewRow);
        String idStr = tablaModeloLibros.getValueAt(row, 0).toString();
        Libro libro = new Libro();
        libro.setIdLibro(Integer.parseInt(idStr));
        libroServicio.eliminarLibro(libro);
        mostrarMensaje("Libro " + idStr + " ELIMINADO");
        limpiarFormulario();
        listarLibros();
    }

    private Double leerPrecio() {
        try {
            double p = Double.parseDouble(precioTexto.getText().trim().replace(",", "."));
            if (p < 0) {
                mostrarMensaje("El precio no puede ser negativo");
                precioTexto.requestFocusInWindow();
                return null;
            }
            return p;
        } catch (NumberFormatException e) {
            mostrarMensaje("El precio debe ser un número (ejemplo: 150.50)");
            precioTexto.requestFocusInWindow();
            return null;
        }
    }

    private Integer leerExistencias() {
        try {
            int e = Integer.parseInt(existenciasTexto.getText().trim());
            if (e < 0) {
                mostrarMensaje("Las existencias no pueden ser negativas");
                existenciasTexto.requestFocusInWindow();
                return null;
            }
            return e;
        } catch (NumberFormatException e) {
            mostrarMensaje("Las existencias deben ser un número entero (ejemplo: 10)");
            existenciasTexto.requestFocusInWindow();
            return null;
        }
    }

    private void limpiarFormulario() {
        libroTexto.setText("");
        autorTexto.setText("");
        precioTexto.setText("");
        existenciasTexto.setText("");
        idTexto.setText("");
        tablaLibros.clearSelection();
        libroTexto.requestFocusInWindow();
    }

    private void mostrarMensaje(String mensaje) {
        JOptionPane.showMessageDialog(this, mensaje);
    }

    private void listarLibros() {
        tablaModeloLibros.setRowCount(0);
        libroServicio.listarLibros().forEach(libro -> {
            tablaModeloLibros.addRow(new Object[]{
                    libro.getIdLibro(),
                    libro.getNombreLibro(),
                    libro.getAutor(),
                    libro.getPrecio(),
                    libro.getExistencias()
            });
        });
    }
}