<?php

class Database {
    private $db_host = 'localhost';
    private $db_name = 'filmdb';
    private $db_user = 'root';
    private $db_password = '';
    private $db;

    public function connect() {
        $this->db = null;

        try {
            $this->db = new PDO('mysql:host=' . $this->db_host . ';dbname='. $this->db_name, $this->db_user, $this->db_password);
            $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (\Throwable $e) {
            echo 'La conexión de la base de datos falló: '. $e->getMessage();
        }

        return $this->db;
    }
}

