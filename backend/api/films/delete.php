<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Request-With');

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