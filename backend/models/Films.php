<?php



class Films {
    private $db;
    private $table = 'films';

    public $id;
    public $name;
    public $year_of_production;

    public function __construct($db_connection) {
        $this->db = $db_connection;
    }

    public function read() {
        $query = 'SELECT * FROM '. $this->table;

        $query_statement = $this->db->prepare($query);

        $query_statement->execute();

        return $query_statement;
    }

    public function read_one() {
        $query = 'SELECT * FROM '. $this->table .' WHERE id = :id LIMIT 0,1';

        $query_statement = $this->db->prepare($query);
        $query_statement->bindParam(':id', $this->id);

        $query_statement->execute();

        $row = $query_statement->fetch(PDO::FETCH_ASSOC);

        $this->id = $row['id'];
        $this->name = $row['name'];
        $this->year_of_production = $row['year_of_production'];
    }

    public function create() {
        $query = 'INSERT INTO '. $this->table . ' (name, year_of_production) VALUES (:name, :year_of_production)';

        $query_statement = $this->db->prepare($query);

        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->year_of_production = htmlspecialchars(strip_tags($this->year_of_production));

        $query_statement->bindParam(':name', $this->name);
        $query_statement->bindParam(':year_of_production', $this->year_of_production);

        if ($query_statement->execute()) {
            return true;
        }
        printf('Ha habido un error: %s.\n', $query_statement->error);
        return false;
    }
    
    public function delete() {
        $query = 'DELETE FROM '. $this->table .' WHERE id = :id';

        $query_statement = $this->db->prepare($query);

        $this->id = htmlspecialchars(strip_tags($this->id));
        
        $query_statement->bindParam(':id', $this->id);

        if ($query_statement->execute()) {
            return true;
        }
        printf('Ha habido un error: %s.\n', $query_statement->error);
        return false;

    }
}