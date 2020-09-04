<?php

include_once '../cors.php';

header('Access-Control-Allow-Methods: DELETE');

include_once '../../db/Database.php';
include_once '../../models/Films.php';

$database = new Database();
$db = $database->connect();

$film = new Films($db);

$data = json_decode(file_get_contents('php://input'));

$film->id = $data->id;

if ($film->delete()) {
    echo json_encode(
        array('message' => 'Película eliminada con éxito.')
    );
} else {
    echo json_encode(
        array('message' => 'Ha habido un error eliminando la película.')
    );
}