<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../db/Database.php';
include_once '../../models/Films.php';

$database = new Database();
$db = $database->connect();

$films = new Films($db);

$result = $films->read();
$num_of_rows = $result->rowCount();

if ($num_of_rows <= 0) {
    echo json_encode(array('message' => 'No se han encontrado películas'));
}

$films_array = array();
$films_array['films'] = array();

while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    extract($row);

    $film = array(
        'id' => $id,
        'name' => $name,
        'year_of_production' => $year_of_production
    );
    array_push($films_array['films'], $film);
}

echo json_encode($films_array);


